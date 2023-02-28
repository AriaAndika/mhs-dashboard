
<script lang=ts>
  import type { LayoutData, PageData } from "./$types";
	//================================================
	export let data: PageData
	export let lay: LayoutData
	
	// let { data: mhs, error } = await supabase
  // .from('mhs')
  // .select("*")

  // // Filters
  // .eq('column', 'Equal to')
	
	
	
	function loading() {
		
	}
	
</script>

{#if data.session}
	<div>Welcome {data.session.user.email}</div>
	<!-- <form action="/logout" method="POST">
		<input type="submit" value="Logout">
	</form> -->
{:else}
 <div>Login</div>
{/if}


<svelte:head>
	<link rel="stylesheet" href="/login.css">
</svelte:head>

<div class="top-container">
	<div class="box">
		<form action="?/login" method="POST">
			
			<h2>LOGIN PRESENSI UDINUS</h2>
			<div class="inputBox">
				<input type="text" id="nim" name="email" required/>
				<span>NIM</span>
				<i></i>
			</div>
			
			<div class="inputBox">
				<input type="password" id="password" name="password" required/>
				<span>Password</span>
				<i></i>
			</div>
			
			<div class="links">
				<a href="#nim">Lupa Password?</a>
			</div>
			
			<input type="submit" value="LOGIN" />
			
		</form>
	</div>
</div>
