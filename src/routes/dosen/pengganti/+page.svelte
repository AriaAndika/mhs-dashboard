

<script>
	let popup
	
	function win(event) {
		if (event.target == popup) {
			popup.style.display = "none";
		}
	}
</script>

<svelte:window on:click={win} />

<main>
	<h1>Dashboard Dosen</h1>


	<div class="recent">
			<h2>Tambahkan Kelas Pengganti</h2>
			<table>
					<thead>
							<tr>
									<th>NO.</th>
									<th>Mata Kuliah</th>
									<th>Kelompok</th>
									<th>AKSI</th>
							</tr>
					</thead>
					<tbody>
							<tr>
									<td>1.</td>
									<td>Dasar Pemrograman</td>
									<td>A11-4113</td>
									<td><button id="popup-button" on:click={()=>popup.style.display = "block"} class="btn-download"><span class="material-symbols-outlined">add</span></button></td>
							</tr>
							<tr>
									<td>2.</td>
									<td>Dasar Pemrograman</td>
									<td>A11-4112</td>
									<td><button id="popup-button" on:click={()=>popup.style.display = "block"} class="btn-download"><span class="material-symbols-outlined">add</span></button></td>
							</tr>
							<tr>
									<td>3.</td>
									<td>Dasar Pemrograman</td>
									<td>A11-4111</td>
									<td><button id="popup-button" on:click={()=>popup.style.display = "block"} class="btn-download"><span class="material-symbols-outlined">add</span></button></td>
							</tr>
					</tbody>
			</table>
	</div>
</main>


<div id="popup" class="popup" bind:this={popup}>
	<div class="popup-content">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<span id="close" class="close" on:click={()=>popup.style.display = "none"}>&times;</span>
		<h2>Tambahkan Hari dan Jam</h2>
		<form>
			<label for="day">Hari:</label>
			<input type="date" id="day" name="day" required>
			<label for="time">Waktu:</label>
			<input type="time" id="time" name="time" required>
			<button type="submit">Tambahkan</button>
		</form>
	</div>
</div>
<!-- Akhiran Main -->