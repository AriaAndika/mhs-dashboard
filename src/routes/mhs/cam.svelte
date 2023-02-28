
<script lang=ts>
  // import { onMount } from "svelte";
	import * as faceapi from 'face-api.js'
	
	export let os = true
	export let loaded: boolean
	export const showDevice = async (isShowed: boolean) => {
		console.log("0: Set camera:",isShowed)
		camShowed = isShowed
		
		console.log('1: getting media')
		try {
			await getMedia()
			
		} catch (error) {
			console.log('# failed getting camera, terminating...')
			return
		}
		
		if (isShowed){
			
			if (loaded) {
				console.log('2: model loaded, start detecting')
				detect()
			}
			else {
				console.log('2: model NOT loaded, waiting...')
				loadedCallback = detect
			}
			
		} else {
			closeMedia()
		}
		
	}
	
	let elem: HTMLDivElement
	let vid: HTMLVideoElement
	let streamObj: MediaStream
	let camShowed: boolean = false
	
	let tinyFace = new faceapi.TinyFaceDetectorOptions
	let loadedCallback: () => void
	
	if (os){
		throw 'err'
	}
	
	Promise.all([
		faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
		faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
		faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
		// faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models'),
		faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
	]).then(()=>{
		// on model loaded
		console.log(':> model loaded')
		loaded = true;
		
		if (loadedCallback) {
			console.log('Launching callback..')
			loadedCallback()
			loadedCallback = null
		}
		
		
	})
	
	
	// onMount(async ()=>{
	// 	if (!loaded){
	// 		console.log('Loading Model')
	// 		await Promise.all([
	// 			faceapi.nets.tinyFaceDetector.loadFromUri('../models'),
	// 			faceapi.nets.faceRecognitionNet.loadFromUri('../models'),
	// 			faceapi.nets.faceLandmark68TinyNet.loadFromUri('../models'),
	// 			faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
	// 		])
	// 		if (!tinyFace){
	// 			tinyFace = new faceapi.TinyFaceDetectorOptions
	// 		}
			
	// 		console.log('Model loaded')
			
	// 		vid.addEventListener('play',detect)
			
	// 		loaded = true
	// 	}
		
	// 	getMedia()
	// })
	
	
	
	async function detect() {
		console.log('Detecting Face')
		const e = await faceapi.detectSingleFace(vid, new faceapi.TinyFaceDetectorOptions)
			.withFaceLandmarks()
			.withFaceDescriptor()
		
		// .then(e=>{
			console.log('Done Detecting Face')
			
			if (!e){
				detect()
				return
			}
			
			console.log('Fething')
			
			fetch('/api/face',{
				method: 'POST',
				body: JSON.stringify({
					type: 'register',
					data: e
					// type: 'match',
					// data: detection
				})
			}).then(e=>e.text()).then(e=>{
				console.log(e)
				closeMedia()
			})
		// })
		
		// closeMedia()
		// console.log('Outer done')
	}
	
	
	
	function closeMedia() {
		try {
			vid.removeEventListener('play',detect)
			
		} catch (er) {
			console.log(er)
		}
		streamObj?.getTracks()[0].stop()
		showDevice(false)
	}
	
	function getMedia() { 
		return new Promise<void>((resolve,reject)=>{
		
			navigator.mediaDevices.getUserMedia({video: {
				width: 720,
				height: 480,
			}})
			.then((stream) => {
				streamObj = stream
				vid.srcObject = stream
				resolve()
				console.log('allowed')
			})
			.catch((err) => {
				console.log('denied:',err)
				reject('Camera denied')
				// todo
			});
			
		})
	}
	
</script>
{#if camShowed}
	
<div class="wrap" bind:this={elem}>
	<div class="contain">
		<div>
			<video width="720" height="480" autoplay muted bind:this={vid}></video>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="close close-btn" id="close-btn" on:click={closeMedia}>
				<span class="material-symbols-outlined">close</span>
			</div>
			<!-- <button on:click={closeMedia} class="close-btn">X</button> -->
		</div>
	</div>
</div>

{/if}

<style>
	.wrap {
		display: grid;
		place-items: center;
		position: fixed;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgb(0 0 0 / .3);
		z-index: 100;
	}
	.contain{
		display: grid;
		place-items: middle;
		position: relative;
		padding: 1rem;
		width: 80%;
		height: 80%;
		background-color: white;
		border-radius: 10px;
		color: black;
	}
	.close-btn{
		position: absolute;
		padding: 1rem;
		cursor: pointer;
		right: 0;
		top: 0;
		border-radius: 0 10px 0 0;
	}
</style>