<script lang=ts>
  import * as faceapi from "@vladmandic/face-api"
  import { onMount } from "svelte";
	
	const size = 128
	const delay = 100
	
  let canvas: HTMLCanvasElement
  let video: HTMLVideoElement
  let msg = 'sabar...'
  let faceMatcher
  let ctx: CanvasRenderingContext2D
  
  onMount(async ()=>{
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    ])
    
    
    msg = 'memuat data...';
    ctx = canvas.getContext('2d')
    
    // IMAGES
    const img = await fetch('/s.json').then(e=>e.json())
    const labels = Object.entries(img).map(([k,v])=>{
      return new faceapi.LabeledFaceDescriptors(k,[ new Float32Array(Object.values(v)) ])
    })
    
    // FACE MATCHER
    faceMatcher = new faceapi.FaceMatcher(labels,.8)
    
    msg = 'meminta akses kamera...'
    const stream = await navigator.mediaDevices.getUserMedia({ video: {width: size, height: size} })
    video.srcObject = stream
    
    
    msg = 'memulai face-detector...'
    video.addEventListener('play',main)
  })
  
  async function main() {
    const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ inputSize: size }))
      .withFaceLandmarks(true).withFaceDescriptor()
    ctx.clearRect(0,0,size,size);
    
    if (detections){
      const res = faceMatcher.findBestMatch(detections.descriptor)
      msg = res.toString(true)
      
      faceapi.draw.drawDetections(canvas,detections)
    } else {
      msg = 'Wajah tidak terdeteksi'
    }
    
    setTimeout(main,delay);
  }
</script>

<svelte:head>
  <link rel="stylesheet" href="/face.css">
</svelte:head>

<!-- svelte-ignore a11y-media-has-caption -->
<div class="grid place-items-center">
	
	<div class="grid grid-cols-1 justify-center max-w-6xl">
		<div class="relative">
			<video class="absolute top-0 left-0 w-96" width="{size}" height="{size}" autoplay muted bind:this={video}></video>
			<canvas class="relative top-0 left-0 w-96" width="{size}" height="{size}" bind:this={canvas}></canvas>
		</div>
		<div>
			<h2 class="text-2xl font-bold">{msg}</h2>
		</div>	
	</div>
</div>


