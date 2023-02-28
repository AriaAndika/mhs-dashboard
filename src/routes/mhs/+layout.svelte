<script lang=ts>
  // import { redirect } from "$lib/lib";
  // import pocketbaseEs from "pocketbase";
  // import type { LayoutData } from "./$types";
  import { getDate } from "./lib";

	// //------------------------AUTH-----------------------------
	// const pb = new pocketbaseEs('http://127.0.0.1:8090')
	// const isValid = pb.authStore.isValid
	// if (!isValid){
	// 	redirect('/')
	// }
	
	// const user = pb.authStore.model
	
	// export let data: LayoutData
	
	
	
	//------------------------AUTH-----------------------------
	let active = "/mhs";
	let sidebars = [{
			href: "/mhs",
			mat: "grid_view",
			msg: "Presensi",
		},{
			href: "/mhs/izin",
			mat: "edit_square",
			msg: "Input izin",
		},{
			href: "/mhs/jadwal",
			mat: "schedule",
			msg: "Jadwal",
		},{
			href: "/mhs/matkul",
			mat: "school",
			msg: "Mata Kuliah",
		},{
			href: "/mhs/pesan",
			mat: "mail",
			msg: 'Pesan <span class="message-count">26</span>',
		}
	];
	
	let dark = localStorage.getItem('theme') == 'dark'
	let sideMenu: HTMLElement
	
	let tampilTanggal = getDate()
	
	
</script>


<svelte:head>
	<link	rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0">
	<link rel="stylesheet" href="/mhs/style.css">
</svelte:head>

<!-- {#if isValid} -->
<!-- <div>Authenticating</div> -->
{#if true}
<div class="container" class:dark-theme-variables={dark}>
	<aside bind:this={sideMenu}>
		<div class="top">
			<div class="logo">
				<img src="/img/logo.png" alt="udinus logo">
				<h2>PRESENSI <span class="primary">UDINUS</span></h2>
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
				<!-- <a href="#a" on:click={() =>{
					pb.authStore.clear()
					redirect('/')
				}}>
					<span class="material-symbols-outlined">logout</span>
					<h3>Log Out</h3>
				</a> -->
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
					<!-- <p>Halo, <b>{user.name}</b></p> -->
					<small class="text-muted">Mahasiswa 2022/2023</small>
				</div>
				<div class="profile-photo">
					<img src="/img/admin.png" alt="" />
				</div>
			</div>
		</div>
		
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
		
	</div>
</div>
<footer>
	<p id="date">{tampilTanggal}</p>
</footer>
{/if}