<script context=module lang=ts>
	
	export let active = writable<string>(location.pathname)
	
</script>

<script lang=ts>
  import { footerGetDate, darkMode } from "$lib/lib"
	import { sidebars } from "./data"
	import { logout, state } from "$lib/state"
  import { writable } from "svelte/store";
	
	let dark = darkMode(false,true)
	let sideMenu: HTMLElement
	
	// USER DATA
	let nama = $state.user.nama || '<default>'
	
	
	// function subs() {
	// 	let os = client.channel('custom-update-channel')
	// 		.on('postgres_changes',
	// 			{ event: 'UPDATE', schema: 'public', table: 'jadwal' },
	// 			(payload) => {
	// 				console.log('Change received!', payload)
	// 				const data = payload.new
	// 				jadwal.update(e=>{
	// 					e[e.findIndex(f=>f.id==data.id)].status = data.status
	// 					return e
	// 				})
	// 			}
	// 		)
	// 		.subscribe();
		
	// 	return async () => await os.unsubscribe()
	// }
	
	// onMount(subs)
	
</script>

<div class="container">
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
				<a href={s.href} class:active={$active == s.href} on:click={() => ($active = s.href)}>
					<span class="material-symbols-outlined">{s.mat}</span>
					<h3>{@html s.msg}</h3>
				</a>
			{/each}
				<a href="#a" on:click={logout}>
					<span class="material-symbols-outlined">logout</span>
					<h3>Log Out</h3>
				</a>
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
			<div class="theme-toggler" on:click={()=>{dark = darkMode(dark)}}>
				<span class="material-symbols-outlined" class:active={!dark}>light_mode</span>
				<span class="material-symbols-outlined" class:active={dark}>dark_mode</span>
			</div>
			<div class="profile">
				<div class="info">
					<p>Halo, <b>{nama}</b></p>
					<small class="text-muted">Mahasiswa {$state.user.keterangan}</small>
				</div>
				<div class="profile-photo">
					<img src={$state.user.photo} alt="admin-img" />
				</div>
			</div>
		</div>
		
		<div class="recent-updates">
			<h2>Update Terbaru</h2>
			<!-- DATA -->
			{#each [] as e}
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
	<p id="date">{footerGetDate()}</p>
</footer>
