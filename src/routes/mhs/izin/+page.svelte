<script lang=ts>
  import { getDate } from "$lib/lib";
  import { jadwal } from "$lib/state";
	
	let filteredJadwal = $jadwal.filter(e=>{
		const [hari] = e.jadwal1.split(',')
		return getDate().hari == hari
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
						{#each filteredJadwal as { matkul, jadwal1}}
						{@const [hari,jam] = jadwal1.split(',')}
						<tr>
								<td>{matkul.nama}</td>
								<td>{hari}</td>
								<td class="success">{jam}</td>
								<td><button>SAKIT</button><button>IZIN</button></td>
						</tr>
						{:else}
							<td colspan="6" style="text-align:center">Hari ini tidak ada absen</td>
						{/each}
					</tbody>
			</table>
	</div>
</main>