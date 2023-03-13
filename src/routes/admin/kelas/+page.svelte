<script lang=ts>
	import * as faceapi from '@vladmandic/face-api'
  import { onDestroy, onMount } from 'svelte';
	
	
  const models = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights'
	const size = 128 // 128, 416, 512, 608
	const delay = 100
	const kelompok  = ['A11-4113','A11-4112','A11-4111']
	const ruang = ['H.4.4','H.4.5','H.4.6']
	const IMAGES = ['k']
	
	let selectedKelompok = ''
	let selectedRuang = ruang[0]
	let stop = false
	let msg = ''
	
	let canvas
	let video
	let ctx
	let stream
	let faceMatcher: any
	
	async function main() {
		const detections = video ? await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ inputSize: size }))
			// .withFaceLandmarks(true)
			// .withFaceDescriptor()
			: undefined;
			
		if (stop) { return }
		if (detections){
			ctx.clearRect(0,0,size,size);
			msg = '<span style="color:green">Berhasil mendeteksi</span>'
			faceapi.draw.drawDetections(canvas,detections)
    } else {
			msg = 'Mendeteksi...'
    }
		
		if (!stop){
			setTimeout(main,delay);
		}
	}
	
	async function init() {
		await Promise.all([
			faceapi.nets.tinyFaceDetector.loadFromUri(models),
			faceapi.nets.faceLandmark68TinyNet.loadFromUri(models),
			faceapi.nets.faceRecognitionNet.loadFromUri(models),
		])
		
		// descriptor = null
		stop = false
		// stream = null
		
		if (stop) { return }
		
		ctx = canvas?.getContext('2d')
		
		// LOAD DATA
		// const labels = Object.entries(IMAGES).map(([nama,descriptor]: [any,any])=>{
		// 	return new faceapi.LabeledFaceDescriptors(nama, [descriptor] )
		// })
		// faceMatcher = new faceapi.FaceMatcher(labels,.6)
		
		msg = 'meminta akses kamera...'
    stream = await navigator.mediaDevices.getUserMedia({ video: {width: size, height: size} })
		if (stop) { stream?.getTracks?.()[0].stop();return; }
    video.srcObject = stream
		
		msg = 'memulai face-detector...'
    video.addEventListener('play',main)
	}
	
	onMount(init)
	
	onDestroy(()=>{
		stream?.getTracks?.()[0].stop()
		stop=true
		console.log('STOP')
	})
</script>


<main>
	<h1>Daftar Kelompok</h1>
	<div class="recent">
		<h2>Kelompok</h2><br>
		<div class="selected">
			<select name="class" id="class" bind:value={selectedRuang}>
				{#each ruang as r}
				<option>{r}</option>
				{/each}
			</select>
		</div><br>
		<div class="selected">
			<select name="class" id="class" bind:value={selectedKelompok}>
				<option value="">Pilih Kelompok</option>
				{#each kelompok as k}
				<option>{k}</option>
				{/each}
			</select>
		</div><br><br>
		
		<div style="position: relative;">
			<!-- svelte-ignore a11y-media-has-caption -->
			<video  style="width: 100%;height: 100%;" width="{size}" height="{size}" autoplay bind:this={video}></video>
			<canvas style="width: 100%;" width="{size}" height="{size}" bind:this={canvas}></canvas>
		</div>
				

		<table>
			<thead>
				<tr>
						<th>NO.</th>
						<th>Nama</th>
						<th>Status</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					{#if selectedKelompok == 'A11-4113'}
					{#each IMAGES as k,i}
						<td>{i+1}.</td>
						<td>{k}</td>
						<td>
							<button><span class="material-symbols-outlined">edit</span></button>
							<button><span class="material-symbols-outlined">delete</span></button>
						</td>
					{/each}
					{:else}
						<td></td>
						<td>Tidak Ada Jadwal</td>
					{/if}
				</tr>
			</tbody>
		</table>
	</div>
</main>