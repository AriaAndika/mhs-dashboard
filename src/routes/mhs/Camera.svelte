<script lang=ts>
  import { detectLocation } from "$lib/lib";
  import { state } from "$lib/state";
  import * as faceapi from "@vladmandic/face-api"
  import { onDestroy, onMount } from "svelte";
	
  const models = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights'
	const size = 128
	const delay = 100
  const nama = $state.user.nama
	
  export let useGeo = true
	export let close
  export let onSuccessCallback
	
  let canvas: HTMLCanvasElement
  let video: HTMLVideoElement
  let msg = 'sabar...'
  let faceMatcher: faceapi.FaceMatcher
  let ctx: CanvasRenderingContext2D
  
  let stop = false
  
  // CLEANING UP
  let stream: MediaStream
  
  onMount
	(async ()=>{
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(models),
      faceapi.nets.faceLandmark68TinyNet.loadFromUri(models),
      faceapi.nets.faceRecognitionNet.loadFromUri(models),
    ])
    stop = false
    
    msg = 'memuat data...';
    ctx = canvas.getContext('2d')
    
    // IMAGES
    let err = null
    const img = await fetch(`/${nama.trim().replaceAll(' ','_')}.json`, { cache: "force-cache" }).then(e=>e.json()).catch(e=>err = e)
    console.log('scanning',nama)
    
    if (err){
      msg = `<div style="color:red">Data "${nama}" tidak ditemukan</div>`
      stop = true
      return
    }
    
    let labels = new faceapi.LabeledFaceDescriptors("Ricky",[ new Float32Array(Object.values(img)) ])
    
    // FACE MATCHER
    // SEMAKIN RENDAH, SEMAKIN KETAT
    faceMatcher = new faceapi.FaceMatcher(labels,.1)
    
    msg = 'meminta akses kamera...'
    stream = await navigator.mediaDevices.getUserMedia({ video: {width: size, height: size} })
    video.srcObject = stream
    
    if (useGeo){
      refreshCoor().then(e=>{
        if (!e){
          msg = '<div style="color:red">Anda Harus berada di Udinus</div>'
          stop = true
        }
      })
    }
    
    msg = 'memulai face-detector...'
    video.addEventListener('play',main)
  })
  
  onDestroy(()=>{
    stream?.getTracks?.()[0].stop()
    stop = true
    console.log('STOP')
  })
  
  async function main() {
    if (stop) { return }
    
    const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ inputSize: size }))
      .withFaceLandmarks(true).withFaceDescriptor()
    ctx.clearRect(0,0,size,size);
    
    if (stop) { return }
    if (detections){
      try {
        const res = faceMatcher.findBestMatch(detections.descriptor)
        // msg = res.toString(true)
        if (res.distance < .46){
          if (stop) { return }
          msg = nama.trim() + ', Memproses...'
          await onSuccessCallback()
          close()
          return
        } else {
          msg = 'Wajah tidak dikenali'          
        }
        
        if (stop) { return }
        
        faceapi.draw.drawDetections(canvas,detections)
      } catch (error) {
        console.error(error)
      }
    } else {
      msg = 'Mendeteksi...'
    }
    
    setTimeout(main,delay);
  }
  
  // GEO
  
  let isJarakAsli = false
	async function refreshCoor(): Promise<boolean> {
    return new Promise((res,rej)=>{
      navigator.geolocation.getCurrentPosition((e)=>{        
        let result: boolean
        if (isJarakAsli){
          result = detectLocation(e.coords.latitude,e.coords.longitude)
        } else {
          result = detectLocation(e.coords.latitude,e.coords.longitude)
        }
        res(result)
      },err=>rej(err))
    })
  }
  
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<div class="wrapp" on:click={close}>
	<div class="max-w-6xl">
		<div class="min">
			<video width="{size}" height="{size}" autoplay muted bind:this={video}></video>
			<canvas width="{size}" height="{size}" bind:this={canvas}></canvas>
		</div>
		<div>
			<h2 class="text-2xl font-bold">{@html msg}</h2>
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
</style>