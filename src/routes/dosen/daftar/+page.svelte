
<script lang=ts>
	import { getTime } from "$lib/lib";
</script>

<main>
	<h1>Dashboard Dosen</h1>

	<h1 class="pt">Daftar Presensi</h1>
	<h1 id="dates">{getTime()}</h1>

	
	<div class="recent">
			<h2>Siswa Izin Hari Ini</h2>
			<div class="selected">
					<select name="class" id="class">
						<option>Pilih Kelas</option>
						<option value="4113">A11-4113</option>
						<option value="4112">A11-4112</option>
						<option value="4111">A11-4111</option>
					</select>
			</div>
			<br>
			<table>
					<thead>
							<tr>
									<th>NO.</th>
									<th>Nama</th>
									<th>Kelompok</th>
									<th>Keterangan</th>
							</tr>
					</thead>
					<tbody>
							<tr>
									<td>1.</td>
									<td>Ricky Primayuda Putra</td>
									<td>A11-4113</td>
									<td class="primary">SAKIT</td>
							</tr>
							<tr>
									<td>2.</td>
									<td>Aria Putra Andika</td>
									<td>A11-4113</td>
									<td class="primary">IZIN</td>
							</tr>
							<tr>
									<td>3.</td>
									<td>Ivan Putra Pratama</td>
									<td>A11-4113</td>
									<td class="primary">SAKIT</td>
							</tr>
					</tbody>
			</table>
	</div>
	<div class="recent">
			<h2>Siswa Terlambat Presensi Hari Ini</h2>
			<div class="selected">
					<select name="class" id="class">
						<option>Pilih Kelas</option>
						<option value="4113">A11-4113</option>
						<option value="4112">A11-4112</option>
						<option value="4111">A11-4111</option>
					</select>
			</div>
			<br>
			<table>
					<thead>
							<tr>
									<th>NO.</th>
									<th>Nama</th>
									<th>Kelompok</th>
									<th>Terlambat</th>
									<th>AKSI</th>
							</tr>
					</thead>
					<tbody>
							<tr>
									<td>1.</td>
									<td>Ricky Primayuda Putra</td>
									<td>A11-4113</td>
									<td>2 Menit</td>
									<td><button class="btn-Presensi">Terima</button><button class="btn-Presensi">TIDAK</button></td>
							</tr>
							<tr>
									<td>2.</td>
									<td>Aria Putra Andika</td>
									<td>A11-4113</td>
									<td>10 Menit</td>
									<td><button class="btn-Presensi">Terima</button><button class="btn-Presensi">TIDAK</button></td>
							</tr>
							<tr>
									<td>3.</td>
									<td>Ivan Putra Pratama</td>
									<td>A11-4113</td>
									<td>40 Menit</td>
									<td><button class="btn-Presensi">Terima</button><button class="btn-Presensi">TIDAK</button></td>
							</tr>
					</tbody>
			</table>
	</div>
	<div class="recent">
			<h2>Siswa Tidak Presensi Hari Ini</h2>
			<div class="selected">
					<select name="class" id="class">
						<option>Pilih Kelas</option>
						<option value="4113">A11-4113</option>
						<option value="4112">A11-4112</option>
						<option value="4111">A11-4111</option>
					</select>
			</div>
			<br>
			<table>
					<thead>
							<tr>
									<th>NO.</th>
									<th>Nama</th>
									<th>Kelompok</th>
							</tr>
					</thead>
					<tbody>
							<tr>
									<td>1.</td>
									<td>Ricky Primayuda Putra</td>
									<td>A11-4113</td>
							</tr>
							<tr>
									<td>2.</td>
									<td>Aria Putra Andika</td>
									<td>A11-4113</td>
							</tr>
							<tr>
									<td>3.</td>
									<td>Ivan Putra Pratama</td>
									<td>A11-4113</td>
							</tr>
					</tbody>
			</table>
	</div>
	<div class="recent">
			<h2>Cek Presensi</h2>
			<table>
					<thead>
							<tr>
									<th>NO.</th>
									<th>Mata Kuliah</th>
									<th>Kelompok</th>
									<th></th>
							</tr>
					</thead>
					<tbody>
							<tr>
									<td>1.</td>
									<td>Dasar Pemrograman</td>
									<td>A11-4113</td>
									<td><a href="/dosen/laporan">Details</a></td>
							</tr>
							<tr>
									<td>2.</td>
									<td>Dasar Pemrograman</td>
									<td>A11-4112</td>
									<td><a href="/dosen/laporan">Details</a></td>
							</tr>
							<tr>
									<td>3.</td>
									<td>Dasar Pemrograman</td>
									<td>A11-4111</td>
									<td><a href="/dosen/laporan">Details</a></td>
							</tr>
					</tbody>
			</table>
	</div>

</main>
<!-- Akhiran Main -->