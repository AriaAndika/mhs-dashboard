<script lang=ts>
	let active = "/mhs";
	let sidebars = [{
			href: "/mhs",
			mat: "grid_view",
			msg: "Absensi",
		},{
			href: "/mhs/izin",
			mat: "edit_square",
			msg: "Input izin",
		},{
			href: "/mhs/jadwal",
			mat: "schedule",
			msg: "Jadwal",
		},{
			href: "/mhs/tugas",
			mat: "collections_bookmark",
			msg: "Tugas",
		},{
			href: "/mhs/matkul",
			mat: "school",
			msg: "Mata Kuliah",
		},{
			href: "/mhs/pesan",
			mat: "mail",
			msg: 'Pesan <span class="message-count">26</span>',
		},{
			href: "#a",
			mat: "logout",
			msg: "Log Out",
		},
	];
	
	//================================================================
	let dark = localStorage.getItem('theme') == 'dark'
	dark ? document.body.classList.toggle('dark-theme-variables') : ''
	
	let sideMenu: HTMLElement
	
	const date = new Date();
	let tahun = date.getFullYear();
	let bulan: number | string = date.getMonth();
	let tanggal = date.getDate();
	let hari: number | string = date.getDay();
	let hariMap = ["Minggu","Senin","Selasa","Rabu","Kamis","Jum'at","Sabtu"]
	let bulanMap = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]
	let tampilTanggal = "© " + hari + ", " + tanggal + " " + bulan + " " + tahun + " | ABSENSI UDINUS | All Right Reserved";
	hari = hariMap[hari]
	bulan = bulanMap[bulan]

</script>

<svelte:head>
	<link	rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0">
	<link rel="stylesheet" href="/mhs/style.css">
	<!-- <script src="/mhs/index.js" defer></script> -->
</svelte:head>

<div class="container">
	<aside bind:this={sideMenu}>
		<div class="top">
			<div class="logo">
				<img src="/img/logo.png" alt="udinus logo">
				<h2>ABSENSI <span class="primary">UDINUS</span></h2>
			</div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="close" id="close-btn" on:click={()=>sideMenu.style.display = 'none'}>
				<span class="material-symbols-outlined">close</span>
			</div>
		</div>
		<div class="sidebar">
			{#each sidebars as s}
				<a href={s.href} class:active={active == s.href} on:click={() => (active = s.href)}>
					<span class="material-symbols-outlined">{s.mat}</span>
					<h3>{@html s.msg}</h3>
				</a>
			{/each}
		</div>
	</aside>
	
	<slot />

	<div class="right">
		<div class="top">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<button id="menu-btn" on:click={()=>sideMenu.style.display = 'block'}>
				<span class="material-symbols-outlined">menu</span>
			</button>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="theme-toggler" on:click={()=>{
				document.body.classList.toggle('dark-theme-variables');
				dark = !dark;
				localStorage.setItem('theme',dark ? 'dark' : 'light')
			}}>
				<span class="material-symbols-outlined" class:active={!dark}>light_mode</span>
				<span class="material-symbols-outlined" class:active={dark}>dark_mode</span>
			</div>
			<div class="profile">
				<div class="info">
					<p>Halo, <b>Ricky Primayuda Putra</b></p>
					<small class="text-muted">Mahasiswa 2022/2023</small>
				</div>
				<div class="profile-photo">
					<img src="/img/admin.png" alt="" />
				</div>
			</div>
		</div>
		<!-- AKHIRAN TOP -->
		
		
		<div class="recent-updates">
			<h2>Update Terbaru</h2>
			{#each ['Daspro','PTI','Orakom'] as e}
			<div class="updates">
				<div class="update">
					<div class="profile-photo">
						<span class="material-symbols-outlined">checklist</span>
					</div>
					<div class="message">
						<p><b>Anda</b> Telah berhasil melakukan abseni</p>
						<small class="text-muted success">Mata Kuliah {e}</small>
					</div>
				</div>
			</div>
			{/each}
		</div>
		<!-- AKHIRAN UPDATE TERBARU -->
		
		
		<div class="absensi-analytics">
			<h2>TUGAS</h2>
			{#each ['Pemrograman Berbasis Web','Matematika Diskrit','Kalkulus'] as e}				
			<div class="item online">
				<div class="right">
					<span class="material-symbols-outlined icon">collections_bookmark</span>
					<h3>{e}</h3>
					<div class="info">
						<h5 class="success">0 Tugas</h5>
						<a href="#a"><small class="text-muted warning">Detail</small></a>
					</div>
				</div>
			</div>
			{/each}			
			<div class="item see-all">
				<div>
					<span class="material-symbols-outlined">visibility</span>
					<a href="/mhs/tugas">
						<h3>Lihat Semua</h3>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>

<footer>
	<p id="date">{tampilTanggal}</p>
</footer>
