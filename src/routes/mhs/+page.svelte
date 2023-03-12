<script lang=ts>
  import { onMount } from "svelte";
	import { getDate, getTime, hariMap } from "$lib/lib";
  import { client, userPresensi, jadwal, state, validateData } from "$lib/state";
	import { active } from "./+layout.svelte";
  import Camera from "./Camera.svelte";
  import type { Jadwal } from "$lib/types";
	
	async function onSuccessCallback() {
		const dt = new Date()
		const hour: string = dt.getHours() < 10 ? '0' + dt.getHours() : `${dt.getHours()}`;
		const minute: string = dt.getMinutes() < 10 ? '0' + dt.getMinutes() : `${dt.getMinutes()}`;
		
		let waktu = `${hariMap[dt.getDay()]},${hour}.${minute}`
		
		await client.from('presensi')
		.insert([
			{ mhs: $state.user.nama, jadwal_id: current_jadwal_id, waktu, status: 1 }
		])
		
		await validateData($state.user)
		sign()
	}
	
	
	
	
	const def = { min: 0, sec: '0', time: 0, counter: '', isHide: false }
	let data = [Object.create(def),Object.create(def),def]
	let current_jadwal_id = 0
	
	let filteredJadwal: Jadwal[]
	
	function sign() {
		filteredJadwal = $jadwal.filter((e,i)=>{
			const [hari] = e.jadwal1.split(',')
			return getDate().hari == hari
		}).sort((e)=>e.dadakan ? -1 : 1)
			.filter( (_,i) =>i<= 2 )
	}
	sign()
	// COUNTER
	console.log(data)
	filteredJadwal.forEach((e,i)=>{

		if (!e.status) { return }
		
		const openTimeHour = new Date(e.stamp).getHours()
		const openTime = new Date(e.stamp).getMinutes()
		const openTimeSec = new Date(e.stamp).getSeconds()
		
		const cr = new Date()
		const currentHour = cr.getHours()
		const currentTime = cr.getMinutes()
		const currentTimeSec = cr.getSeconds()
		const endTime = openTime + (e.len ?? 3)
		console.log('WOOO',openTime,e.len ?? 'wkwk',endTime,currentTime)
		
		const counter = endTime - currentTime
		
		data[i].time = (counter * 60) + (openTimeSec - currentTimeSec) + ((openTimeHour * 3600) - (currentHour * 3600))
	})
	
	// const startingMinutes = 0
	
	$: {
		filteredJadwal.forEach((_,i)=>{
			const min = Math.floor(data[i].time / 60);
			const sec = data[i].time % 60 < 10 ? '0' + `${data[i].time % 60}` : `${data[i].time % 60}`;
			
			data[i].counter = `${min}:${sec}`;
		})
	}
	
	
	onMount(()=>{setInterval(()=>{
		data.forEach((_,i) => {
			data[i].time -= 1
		})}, 1000)
	})
	
	// Face app
	let show = false
	const absenCallback = (jadwal: number) => () => {
		current_jadwal_id = jadwal
		show = true
	}
	
</script>

{#if show}
	<!-- <div></div> -->
	<Camera {onSuccessCallback} close={()=>show=false} />
{/if}

<main>
	<h1>Presensi Mahasiswa</h1>
	<h1 class="pt">Presensi Yang akan ditutup</h1>
	<h1 id="dates">{getTime()}</h1>
		
		
	<div class="insights">
		{#each filteredJadwal as { dosen, matkul, ruang, status, jadwal1, id }, i (i)}
		<div class="dosen">
			<span class="material-symbols-outlined">menu_book</span>
			<div class="middle">
				<div class="left">
					<h3>{matkul.nama}</h3>
					<h1>{dosen.nama}</h1>
				</div>
				<div class="progress">
					
					{#if status && data[i].time > 0}
					<h1 id="countdown" class="countdown">{data[i].counter}</h1>
					<button class="btn-absen" on:click={absenCallback(id)}>Presensi</button>
					{:else if $userPresensi.find(e=>e.jadwal.id == id)}
						<h2>Anda Telah Presensi</h2>
					{/if}
					
				</div>
			</div>
			<small><div class="text-muted">Ruang {ruang}, {jadwal1.split(',')[1]}</div></small>
			<small class="text-muted">Pertemuan 1</small>
		</div>
		{/each}
	</div>
	<!-- AKHIRAN INSIGHTS -->

		<div class="recent">
				<h2>Jadwal yang akan datang</h2>
				<table>
						<thead>
								<tr>
									<th>No.</th>
									<th>Mata Kuliah</th>
									<th>RUANGAN</th>
									<th>Kelompok</th>
									<th>HARI</th>
									<th>JAM</th>
								</tr>
						</thead>
						<tbody>
							{#each filteredJadwal as { matkul, jadwal1, ruang }, i}
							{@const [hari, jam] = jadwal1.split(',')}
							<tr>
									<td>{i+1}.</td>
									<td>{matkul.nama}</td>
									<td>{ruang}</td>
									<td>{$state.user.kelompok}</td>
									<td>{hari}</td>
									<td class="success">{jam}</td>
							</tr>
							{:else}
								<td colspan="6" style="text-align:center">Hari ini tidak ada absen</td>
							{/each}
						</tbody>
				</table>
				<a style="margin-top: 6rem" href="/mhs/jadwal" on:click={()=>$active="/mhs/jadwal"}>Lihat Semua</a>
				<!-- <h2>Hari ini tidak ada absen</h2> -->
		</div>
</main>
<!-- Akhiran Main -->
