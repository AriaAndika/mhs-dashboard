

<script>
	let popup // = document.getElementById("popup");
	let popupButton,popupButton1,popupButton2 // = document.getElementById("popup-button");
	// let close = document.getElementsByClassName("close")[0];

	// popupButton.onclick = function() {
	// 	popup.style.display = "block";
	// }

	// close.onclick = function() {
	// 	popup.style.display = "none";
	// }

	
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
									<td><button id="popup-button" on:click={()=>popup.style.display = "block"} bind:this={popupButton} class="btn-download"><span class="material-symbols-outlined">add</span></button></td>
							</tr>
							<tr>
									<td>2.</td>
									<td>Dasar Pemrograman</td>
									<td>A11-4112</td>
									<td><button id="popup-button" on:click={()=>popup.style.display = "block"} bind:this={popupButton1} class="btn-download"><span class="material-symbols-outlined">add</span></button></td>
							</tr>
							<tr>
									<td>3.</td>
									<td>Dasar Pemrograman</td>
									<td>A11-4111</td>
									<td><button id="popup-button" on:click={()=>popup.style.display = "block"} bind:this={popupButton2} class="btn-download"><span class="material-symbols-outlined">add</span></button></td>
							</tr>
					</tbody>
			</table>
	</div>
</main>
<div id="popup" class="popup" bind:this={popup}>
<div class="popup-content">
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