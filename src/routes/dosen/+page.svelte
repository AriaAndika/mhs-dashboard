<script lang=ts>
	import type { Jadwal } from "$lib/types";
  import { getTime, getDate } from "$lib/lib"
  import { bukaPresensi, fetchDosenJadwal, jadwal, state } from "$lib/state";
	
	
	$: filteredJadwal = $jadwal.filter(e=>{
		const [hari] = e.jadwal1.split(',')
		return getDate().hari == hari
	})
	
	function _bukaPresensi(inputJadwal: Jadwal) {
		return async () => {
			const { error } = await bukaPresensi(inputJadwal)
			if (error) { return console.error("Error Buka Presensi:",error) }
			jadwal.set(await fetchDosenJadwal($state.user.nama))
		}
	}
</script>

<main>
	<h1>Dashboard Dosen</h1>

	<h1 class="pt">Jadwal Mengajar Hari Ini</h1>
	<!-- svelte-ignore a11y-missing-content -->
	<h1 id="dates">{getTime()}</h1>

	<div class="insights">
		{#each filteredJadwal as os}
		<div class="dosen">
				<span class="material-symbols-outlined">menu_book</span>
				<div class="middle">
						<div class="left">
								<h3>{os.kelompok}</h3>
								<h1>{os.matkul.nama}</h1>
						</div>
						<div class="progress">
								<h1 class="countdown">{os.jadwal1.split(',')[1]}</h1>
								
								{#if !os.status}
								<button on:click={_bukaPresensi(os)} class="btn-Presensi">Buka Presensii</button>
								{:else}
								<h3>Presensi Telah Dibuka</h3>
								{/if}
								
						</div>
				</div>
				<small class="text-muted">RUANG {os.ruang}</small>
				<small class="text-muted">Pertemuan 1</small>
		</div>
		{:else}
		<div style="text-align:center">Hari ini tidak ada jadwal mengajar</div>
		{/each}
			
	</div>
	<!-- AKHIRAN INSIGHTS -->   
</main>
<!-- Akhiran Main -->