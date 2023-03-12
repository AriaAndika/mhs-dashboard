<script lang=ts>
  // import * as faceapi from "@vladmandic/face-api"
  import { onDestroy, onMount } from "svelte";
	
  // const models = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights'
	const size = 416 // 128
	const delay = 100
  let nama = ''
	
  // export let useGeo = true
	export let close
  export let onSuccessCallback: (nama:string,images:any[]) => void = ()=>{}
	
  let canvas: HTMLCanvasElement
  let video: HTMLVideoElement
  let msg = 'sabar...'
  // let faceMatcher: faceapi.FaceMatcher
  let ctx: CanvasRenderingContext2D
  
	let imageCapture: ImageCapture
  let stop = false
  
  // CLEANING UP
  let stream: MediaStream
  
  onMount
	(async ()=>{
    stop = false
    ctx = canvas.getContext('2d')
    
    // IMAGES
    
    msg = 'meminta akses kamera...'
    stream = await navigator.mediaDevices.getUserMedia({ video: {width: size, height: size} })
    video.srcObject = stream
    
		imageCapture = new ImageCapture(stream.getVideoTracks()[0]);
    msg = 'Silahkan ambil foto'
  })
  
  onDestroy(()=>{
    stream?.getTracks?.()[0].stop()
    stop = true
    console.log('STOP')
  })
	
	let images: Blob[] = []
	
	function takePhoto() {
		imageCapture
			.takePhoto()
			.then(async (blob) => {
				// Use the JS library to download a file.
				
				// const { data, error } = await client.storage
				// 	.from('bucket')
				// 	.upload(Math.random().toString(4) + '.jpg', blob)
				// console.log(data,error)
				images.push(blob)
				images=images
			})
			.catch((error) => console.error(error));
	}
	// client.storage.getBucket('bucket').then(console.log)
	// client.storage.from('bucket').download('Ivan_Putra_Pratama').then(console.log)//.then(console.log)
	
  
  // async function main() {
  //   if (stop) { return }
    
  //   const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ inputSize: size }))
  //     .withFaceLandmarks(true).withFaceDescriptor()
  //   ctx.clearRect(0,0,size,size);
    
  //   if (stop) { return }
  //   if (detections){
	// 		faceapi.draw.drawDetections(canvas,detections)
  //   } else { msg = 'Mendeteksi...' }
    
  //   setTimeout(main,delay);
  // }
  
  // GEO
  
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<div class="wrapp" on:click={close}>
	<div class="max-w-6xl" on:click|stopPropagation={()=>{}}>
		<div class="min">
			<video width="{size}" height="{size}" autoplay muted bind:this={video}></video>
			<canvas width="{size}" height="{size}" bind:this={canvas}></canvas>
		</div>
		<div>
			<input type="text" bind:value={nama} class="za-form" placeholder="Silahkan masukan nama">
			{#if images.length < 3}
			<button on:click|stopPropagation={takePhoto} style="border-radius: 6px;">Foto</button>
			{:else}
			<span>Maks 3</span>
			{/if}
			{#if nama != ''}
			<button on:click|stopPropagation={()=>onSuccessCallback(nama,images)} style="border-radius: 6px;">Selesai</button>
			{/if}
			<h2 class="text-2xl font-bold">{@html msg}</h2>
			<div>{images.length} foto terambil</div>
		</div>	
	</div>
</div>


<style>
	.wrapp{
		position: fixed;
		display: grid;
		place-items: center;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgb(0, 0, 0, .4);
	}
	.wrapp > div {
		background-color: white;
		border-radius: 10px;
		padding: 2rem;
		display: grid;
		grid-template-columns: 1fr;
		justify-content: center;
		min-width: 24rem;
	}
	.min{
		position: relative;
		
	}
	.min > video {
		position: absolute;top: 0;left: 0;width: 100%;height: 100%;
	}
	.min > canvas {
		position: relative;top: 0;left: 0;width: 100%;
	}
	.za-form{
		background-color: var(--color-background);
		width: min-content;
		height: min-content;
		padding: .7rem 1.2rem;
  	border-radius: 6px;
		outline: 2px solid var(--color-primary);
	}
</style>