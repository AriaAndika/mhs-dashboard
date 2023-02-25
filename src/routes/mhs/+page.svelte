<script lang=ts>
  import { onMount } from "svelte";
	
	const startingMinutes = 30;
	let time = startingMinutes * 60;
	let counter = ''
	$: {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60 < 10 ? '0' + `${time % 60}` : `${time % 60}`;
		counter = `${minutes}:${seconds}`;
	}
	
	onMount(()=>{setInterval(()=>{time--;}, 1000);})

	const date = new Date();
	let tahun = date.getFullYear();
	let bulan: number | string = date.getMonth();
	let tanggal = date.getDate();
	let hari: number | string = date.getDay();
	let hariMap = ["Minggu","Senin","Selasa","Rabu","Kamis","Jum'at","Sabtu"]
	let bulanMap = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]
	hari = hariMap[hari]
	bulan = bulanMap[bulan]
	let tampilWaktu = "" + hari + ", " + tanggal + " " + bulan + " " + tahun + "";
</script>

<!-- AKHIRAN ASIDE -->
<main>
		<h1>Absensi Mahasiswa</h1>
		<div class="date"><input type="date"></div>
		<h1 class="pt">Absensi Yang akan ditutup</h1>
		<h1 id="dates">{tampilWaktu}</h1>
		<div class="insights">
				<div class="dosen">
						<span class="material-symbols-outlined">menu_book</span>
						<div class="middle">
								<div class="left">
										<h3>Kalkulus 1</h3>
										<h1>Wise Herowati, M.Kom</h1>
								</div>
								<div class="progress">
										<h1 id="countdown" class="countdown">{counter}</h1>
										<button class="btn-absen">Absen</button>
								</div>
						</div>
						<small class="text-muted">RUANG H.4.7</small>
						<small class="text-muted">Pertemuan 1</small>
				</div>
				<!-- AKHIRAN DOSEN -->
				<div class="dosen">
						<span class="material-symbols-outlined">menu_book</span>
						<div class="middle">
								<div class="left">
										<h3>Matematika Diskrit</h3>
										<h1>Edy Mulyadi, S.Si, M.Kom</h1>
								</div>
								<div class="progress">
										<h1 id="countdown2" class="countdown">30:00</h1>
										<button class="btn-absen">Absen</button>
								</div>
						</div>
						<small class="text-muted">RUANG H.4.2</small>
						<small class="text-muted">Pertemuan 1</small>
				</div>
				<!-- AKHIRAN MAHASISWA -->
				<div class="dosen">
						<span class="material-symbols-outlined">menu_book</span>
						<div class="middle">
								<div class="left">
										<h3>Pemrograman Berbasis Web</h3>
										<h1>Ajib Susanto, M.Kom</h1>
								</div>
								<div class="progress">
										<h1 id="countdown2" class="countdown">30:00</h1>
										<button class="btn-absen">Absen</button>
								</div>
						</div>
						<small class="text-muted">RUANG D.3.12</small>
						<small class="text-muted">Pertemuan 1</small>
				</div>
				<!-- AKHIRAN FAKULTAS -->
		</div>
		<!-- AKHIRAN INSIGHTS -->

		<div class="recent">
				<h2>Jadwal yang akan datang</h2>
				<table>
						<thead>
								<tr>
										<th>NO.</th>
										<th>Mata Kuliah</th>
										<th>RUANGAN</th>
										<th>Kelompok</th>
										<th>HARI</th>
										<th>JAM</th>
								</tr>
						</thead>
						<tbody>
								<tr>
										<td>1.</td>
										<td>Dasar Pemrograman</td>
										<td>H.47</td>
										<td>A11-4113</td>
										<td>SELASA</td>
										<td class="success">15.15-17.15</td>
								</tr>
								<tr>
										<td>2.</td>
										<td>Dasar Pemrograman</td>
										<td>H.47</td>
										<td>A11-4113</td>
										<td>SELASA</td>
										<td class="success">15.15-17.15</td>
								</tr>
								<tr>
										<td>3.</td>
										<td>Dasar Pemrograman</td>
										<td>H.47</td>
										<td>A11-4113</td>
										<td>SELASA</td>
										<td class="success">15.15-17.15</td>
								</tr>
								<tr>
										<td>4.</td>
										<td>Dasar Pemrograman</td>
										<td>H.47</td>
										<td>A11-4113</td>
										<td>SELASA</td>
										<td class="success">15.15-17.15</td>
								</tr>
								<tr>
										<td>5.</td>
										<td>Dasar Pemrograman</td>
										<td>H.47</td>
										<td>A11-4113</td>
										<td>SELASA</td>
										<td class="success">15.15-17.15</td>
								</tr>
								<tr>
										<td>6.</td>
										<td>Dasar Pemrograman</td>
										<td>H.47</td>
										<td>A11-4113</td>
										<td>SELASA</td>
										<td class="success">15.15-17.15</td>
								</tr>
						</tbody>
				</table>
				<a href="/mhs/jadwal">Lihat Semua</a>
		</div>
</main>
<!-- Akhiran Main -->
