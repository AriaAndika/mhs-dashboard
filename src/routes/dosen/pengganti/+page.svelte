

<script>
  import { flatten, hariMap } from "$lib/lib";
  import Popup from "$lib/Popup.svelte";
  import { client, dosenInfo, fetchDosenJadwal, fetchJadwal, jadwal, state } from "$lib/state";
  
	const matkul = $state.user.keterangan
	
	async function submitAction() {
		console.log(matkul)
		load = true
		const { data:crMatkul, error: id_error } = await client.from('matkul').select('id').eq('nama',matkul).single()
		console.log(crMatkul.id,id_error)
		const { data: supaData, error } = await client.from('jadwal')
			.insert([
				{ kelompok: data.kelompok, jadwal1: `${hariMap[(new Date()).getDay()]},${data.waktu1}-${data.waktu2}`, matkul1: crMatkul.id,
				dosen: $state.user.nama, ruang: data.ruang, status: true, stamp: Date.now(), dadakan: true
			}])
			
		console.log(supaData,error)
		
		// MAIN
		if (error){
			msg = error.message;
			load = false
			return
		} else { jadwal.set(await fetchDosenJadwal($state.user.nama)) }
		load = false
		hidePopup(true)
	}

	console.log($jadwal[0].matkul)
	let showPopup;
	let hidePopup
	
	let data = {kelompok:'',waktu1:'',waktu2:'',ruang:''}
	let kelompokFilter = flatten($dosenInfo.mhs,e=>e.kelompok)
	let load = false
	let msg = ''
	
</script>

<!-- <svelte:window on:click={win} /> -->

<main>
	<h1>Dashboard Dosen</h1>


	<div class="recent">
			<h2>Tambahkan Kelas Pengganti</h2>
			<table>
					<thead>
							<tr>
									<th>NO.</th>
									<th>Mata Kuliah</th>
									<th>AKSI</th>
							</tr>
					</thead>
					<tbody>
							<tr>
									<td>1.</td>
									<td>{matkul}</td>
									<td><button id="popup-button" on:click={showPopup} class="btn-download"><span class="material-symbols-outlined">add</span></button></td>
							</tr>
					</tbody>
			</table>
	</div>
</main>


<Popup bind:show={showPopup} bind:hide={hidePopup} bind:prevent={load} submit={submitAction}>
	<div class="form-down">
		
		<!-- <input disabled={load||actionType=='edit'} type="text" class="za-form" placeholder="NIM" bind:value={data.nim}>
		<input disabled={load} type="text" class="za-form" placeholder="Nama" bind:value={data.nama}> -->
		<input type="text" disabled value={matkul} class="za-form">
		<select disabled={load} class="za-form" required bind:value={data.kelompok}>
			<option value="">Pilih Kelompok</option>
			{#each kelompokFilter as f}
			<option>{f}</option>
			{/each}
		</select>
		<input type="time" bind:value={data.waktu1} class="za-form">
		<input type="time" bind:value={data.waktu2} class="za-form">
		<input type="text" bind:value={data.ruang} placeholder="ruang" class="za-form">
		<div>
			<input disabled={load} type="submit" id="" class="za-form" value="Tambahkan">
			<span style:color={"red"}>{msg}</span>
		</div>
		
	</div>
</Popup>
<!-- Akhiran Main -->