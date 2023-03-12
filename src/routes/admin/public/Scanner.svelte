<script lang=ts>
	import * as faceapi from "@vladmandic/face-api";
  import { onDestroy, onMount } from "svelte";
	
	async function main() {
    const detections = video ? await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ inputSize: size, scoreThreshold }))
			.withFaceLandmarks(true)
			.withFaceDescriptor() : undefined;
			
		if (stop) { return }
		if (detections){
			ctx.clearRect(0,0,size,size);
			const result = faceMatcher.findBestMatch(detections.descriptor)
			msg = "Sukses, Halo " + result.label
			
			if (detections) {
				faceapi.draw.drawDetections(canvas,detections)
			}
			
    } else {
      msg = 'Mendeteksi...'
    }
		
		if (!stop){
			setTimeout(main,delay);
		}
		
  }
	
	export let close
	export let images: { [key:string]: Float32Array }
	// export let onSuccess = null
	
  const models = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights'
	const size = 416 // 128, 416, 512, 608
	// minimum confidence threshold, // default: 0.5
	const scoreThreshold = .5
	const delay = 100
	
	let video
	let canvas: HTMLCanvasElement
	let stream: MediaStream
	let ctx: CanvasRenderingContext2D
	let faceMatcher: faceapi.FaceMatcher
	
	let stop = false
	let msg = 'Memulai face-api...'
	
	onMount(async ()=>{
		await Promise.all([
			faceapi.nets.tinyFaceDetector.loadFromUri(models),
			faceapi.nets.faceLandmark68TinyNet.loadFromUri(models),
			faceapi.nets.faceRecognitionNet.loadFromUri(models),
		])
		
		if (stop) { return }
		
		ctx = canvas?.getContext('2d')
		
		msg = 'meminta akses kamera...'
    stream = await navigator.mediaDevices.getUserMedia({ video: {width: size, height: size} })
		if (stop) { return }
    video.srcObject = stream
		
		// LOAD DATA
		const labels = Object.entries(images).map(([nama,descriptor])=>{
			return new faceapi.LabeledFaceDescriptors(nama, [descriptor] )
		})
		faceMatcher = new faceapi.FaceMatcher(labels,.6)
		
		msg = 'memulai face-detector...'
    video.addEventListener('play',main)
	})
	
	onDestroy(()=>{
		stream?.getTracks?.()[0].stop()
		stop=true
		console.log('STOP')
	})
	
	
</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="wrapp" on:click={close}>
	<div on:click|stopPropagation={()=>{}}>
		
		<div class="min">
			<video width="{size}" height="{size}" autoplay muted bind:this={video}></video>
			<canvas width="{size}" height="{size}" bind:this={canvas}></canvas>
		</div>
		
		<div>
			<h2 class="text-2xl font-bold"> {@html msg} </h2>
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
		/* aspect-ratio: 1/1; */
		/* min-width: 44rem; */
		min-width: 539px;
		min-height: 90vh;
	}
	.min{ position: relative; }
	.min > video { position: absolute;top: 0;left: 0;width: 100%;height: 100%; }
	.min > canvas { position: relative;top: 0;left: 0;width: 100%; }
	/* .za-form{
		background-color: var(--color-background);
		width: min-content;
		height: min-content;
		padding: .7rem 1.2rem;
  	border-radius: 6px;
		outline: 2px solid var(--color-primary);
	} */
</style>