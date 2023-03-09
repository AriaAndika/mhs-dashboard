<script lang=ts>
  import { getDate, hariMap } from "$lib/lib";
  import { client, jadwal, state, userPresensi, validateData } from "$lib/state";
  import type { Jadwal } from "$lib/types";
  import { onMount } from "svelte";
	
	let filteredJadwal: Jadwal[]
	function sign(){
		filteredJadwal = $jadwal.filter(e=>{
			const [hari] = e.jadwal1.split(',')
			return getDate().hari == hari
		})
	}
	
	
	sign()
	$: {
		$jadwal
		data
		sign()
	}
	
	function presensi(current_jadwal_id: number, status: number) {
		return async () => {
			const dt = new Date()
			const hour: string = dt.getHours() < 10 ? '0' + dt.getHours() : `${dt.getHours()}`;
			const minute: string = dt.getMinutes() < 10 ? '0' + dt.getMinutes() : `${dt.getMinutes()}`;
			Boolean($userPresensi)
			let waktu = `${hariMap[dt.getDay()]},${hour}.${minute}`
			
			await client.from('presensi')
			.insert([
				{ mhs: $state.user.nama, jadwal_id: current_jadwal_id, waktu, status }
			])
			await validateData($state.user)
		}
	}
	
	//data============================================================================
	const def = { min: 0, sec: '0', time: 0, counter: '', isHide: false }
	let data = [Object.create(def),Object.create(def),def]
	
	// COUNTER
	filteredJadwal.forEach((e,i)=>{

		if (!e.status) { return }

		const openTimeHour = new Date(e.stamp).getHours()
		const openTime = new Date(e.stamp).getMinutes()
		const openTimeSec = new Date(e.stamp).getSeconds()

		const cr = new Date()
		const currentHour = cr.getHours()
		const currentTime = cr.getMinutes()
		const currentTimeSec = cr.getSeconds()
		const endTime = openTime + 3


		const counter = endTime - currentTime

		data[i].time = (counter * 60) + (openTimeSec - currentTimeSec) + ((openTimeHour * 3600) - (currentHour * 3600))
	})

	// const startingMinutes = 0

	$: {
	filteredJadwal.forEach((_,i)=>{
		const min = Math.floor(data[i].time / 60)
		const sec = data[i].time % 60 < 10 ? '0' + `${data[i].time % 60}` : `${data[i].time % 60}`
		
		data[i].counter = `${min}:${sec}`
	})
	}


	onMount(()=>{setInterval(()=>{
		data.forEach((_,i) => {
			data[i].time -= 1
		})}, 1000)
	})
	
</script>
<main>
	<h1>PRESENSI Mahasiswa</h1>


	<div class="recent">
			<h2>INPUT IZIN</h2>
			<table>
					<thead>
							<tr>
									<th>Mata Kuliah</th>
									<th>HARI</th>
									<th>JAM</th>
									<th>IZIN</th>
							</tr>
					</thead>
					<tbody>
						{#each filteredJadwal as { id, matkul, jadwal1, status},i}
						{@const [hari,jam] = jadwal1.split(',')}
						<tr>
								<td>{matkul.nama}</td>
								<td>{hari}</td>
								<td class="success">{jam}</td>
								{#if status && data[i].time > 0}
								<td><button on:click={presensi(id,3)}>SAKIT</button><button on:click={presensi(id,2)}>IZIN</button></td>
								{:else if $userPresensi.find(e=>e.jadwal.id == id)}
								<td>
									<div>Anda Telah Presensi</div>
								</td>
								{:else}
								<td> </td>
								{/if}
									
						</tr>
						{:else}
							<td colspan="6" style="text-align:center">Hari ini tidak ada absen</td>
						{/each}
					</tbody>
			</table>
	</div>
</main>