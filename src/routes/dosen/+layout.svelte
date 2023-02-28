
<script lang=ts>
	let sideMenu // = document.querySelector("aside");
	let menuBtn // = document.querySelector("#menu-btn");
	let closeBtn // = document.querySelector("#close-btn");
	let themeToggler // = document.querySelector(".theme-toggler");

	//munculkan sidebar
	// menuBtn.addEventListener('click', () => {
	// 		sideMenu.style.display = 'block';
	// })

	//menutup sidebar
	// closeBtn.addEventListener('click', () => {
	// 		sideMenu.style.display = 'none';
	// })

	//mengubah tema
	// themeToggler.addEventListener('click', () => {
	// 		document.body.classList.toggle('dark-theme-variables');

	// 		themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
	// 		themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
	// })



	let date = new Date();
	let tahun = date.getFullYear();
	let bulan: number | string = date.getMonth();
	let tanggal = date.getDate();
	let hari: number | string = date.getDay();
	// let jam = date.getHours();
	// let menit = date.getMinutes();
	// let detik = date.getSeconds();
	switch(hari) {
		case 0: hari = "Minggu"; break;
		case 1: hari = "Senin"; break;
		case 2: hari = "Selasa"; break;
		case 3: hari = "Rabu"; break;
		case 4: hari = "Kamis"; break;
		case 5: hari = "Jum'at"; break;
		case 6: hari = "Sabtu"; break;
	}
	switch(bulan) {
		case 0: bulan = "Januari"; break;
		case 1: bulan = "Februari"; break;
		case 2: bulan = "Maret"; break;
		case 3: bulan = "April"; break;
		case 4: bulan = "Mei"; break;
		case 5: bulan = "Juni"; break;
		case 6: bulan = "Juli"; break;
		case 7: bulan = "Agustus"; break;
		case 8: bulan = "September"; break;
		case 9: bulan = "Oktober"; break;
		case 10: bulan = "November"; break;
		case 11: bulan = "Desember"; break;
	}
	var tampilTanggal = "© " + hari + ", " + tanggal + " " + bulan + " " + tahun + " | ABSENSI UDINUS | All Right Reserved";
	// var tampilWaktu = "" + hari + ", " + tanggal + " " + bulan + " " + tahun + "";

	// document.getElementById("date").innerHTML = tampilTanggal;
	
	let active = '/dosen'
	const sidebar = [{
			href: '/dosen',
			mat: 'grid_view',
			text: 'Dashboard'
		},{
			href: '/dosen/jadwal',
			mat: 'schedule',
			text: 'Jadwal'
		},{
			href: '/dosen/daftar',
			mat: 'edit_square',
			text: 'Daftar Presensi'
		},{
			href: '/dosen/laporan',
			mat: 'visibility',
			text: 'Laporan Presensi'
		},{
			href: '/dosen/rekap',
			mat: 'dataset',
			text: 'Rekap Presensi'
		},{
			href: '/dosen/pengganti',
			mat: 'add_business',
			text: 'Tambah Kelas Pengganti'
		},
	]
</script>

<svelte:head>
	<link	rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0">
	<link rel="stylesheet" href="/dosen/css/style.css">
	<link rel="stylesheet" href="/dosen/css/daftar.css">
</svelte:head>

<div class="container">
	<aside bind:this={sideMenu}>
			<div class="top">
					<div class="logo">
							<img src="/dosen/img/logo.png" alt="logo">
							<h2>PRESENSI <span class="primary">UDINUS</span></h2>
					</div>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div class="close" id="close-btn" on:click={() =>sideMenu.style.display = 'none'}>
							<span class="material-symbols-outlined">close</span>
					</div>
			</div>

			<div class="sidebar">
				{#each sidebar as { href, mat, text } (href)}
				<a href={href} class:active={active==href} on:click={()=>active=href}> 
						<span class="material-symbols-outlined">{mat}</span>
						<h3>{@html text}</h3>
				</a>
				{/each}
				<a href="#a">
						<span class="material-symbols-outlined">logout</span>
						<h3>Log Out</h3>
				</a>
			</div>
	</aside>
	<!-- AKHIRAN ASIDE -->
	<slot/>

	<div class="right">
			<div class="top">
					<button id="menu-btn" on:click={() =>sideMenu.style.display = 'block'}>
							 <span class="material-symbols-outlined">menu</span>
					</button>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div class="theme-toggler" bind:this={themeToggler} on:click={() => {
						document.body.classList.toggle('dark-theme-variables');
						themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
						themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
					}}>
							<span class="material-symbols-outlined active">light_mode</span>
							<span class="material-symbols-outlined">dark_mode</span>
					</div>
					<div class="profile">
							<div class="info">
									<p>Halo, <b>Suprayogi, M. Kom</b></p>
									<small class="text-muted">DOSEN</small>
							</div>
							<div class="profile-photo">
									<img src="/dosen/img/admin.png" alt="">
							</div>
					</div>
			</div>
			<!-- AKHIRAN TOP -->
			<div class="recent-updates">
					<h2>Update Terbaru</h2>
					<div class="updates">
							<div class="update">
									<div class="profile-photo">
											<span class="material-symbols-outlined">checklist</span>
									</div>
									<div class="message">
											<p><b>Ricky Primayuda Putra</b> Telah berhasil melakukan Presensii</p>
											<small class="text-muted success">Kelompok A11-4113</small>
									</div>
							</div>
					</div>
					<div class="updates">
							<div class="update">
									<div class="profile-photo">
											<span class="material-symbols-outlined">collections_bookmark</span>
									</div>
									<div class="message">
											<p><b>Ricky Primayuda Putra</b> Telah mengumpulkan Tugas Program Array</p>
											<small class="text-muted success">Kelompok A11-4113</small>
									</div>
							</div>
					</div>
					<div class="updates">
							<div class="update">
									<div class="profile-photo">
											<span class="material-symbols-outlined">checklist</span>
									</div>
									<div class="message">
											<p><b>Aria Putra Andika</b> Telah berhasil melakukan Presensii</p>
											<small class="text-muted success">Kelompok A11-4113</small>
									</div>
							</div>
					</div>
					<div class="updates">
							<div class="update">
									<div class="profile-photo">
											<span class="material-symbols-outlined">collections_bookmark</span>
									</div>
									<div class="message">
											<p><b>Aria Putra Andika</b> Telah mengumpulkan Tugas Program Array</p>
											<small class="text-muted success">Kelompok A11-4113</small>
									</div>
							</div>
					</div>
					<div class="updates">
							<div class="update">
									<div class="profile-photo">
											<span class="material-symbols-outlined">checklist</span>
									</div>
									<div class="message">
											<p><b>Ivan Putra Pratama</b> Telah berhasil melakukan Presensii</p>
											<small class="text-muted success">Kelompok A11-4113</small>
									</div>
							</div>
					</div>
					<div class="updates">
							<div class="update">
									<div class="profile-photo">
											<span class="material-symbols-outlined">collections_bookmark</span>
									</div>
									<div class="message">
											<p><b>Ivan Putra Pratama</b> Telah mengumpulkan Tugas Program Array</p>
											<small class="text-muted success">Kelompok A11-4113</small>
									</div>
							</div>
					</div>
			</div>
			<!-- AKHIRAN UPDATE TERBARU -->
	</div>
</div>

<footer>
	<p id="date">{tampilTanggal}</p>
</footer>
