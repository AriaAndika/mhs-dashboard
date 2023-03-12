
<script lang=ts>
	import './style.css'
  import { goto } from '$app/navigation'
  import { login } from '$lib/state'
	
	
	let msg = ''
	let [nim,password] = ['','']
	let loading = false
	
	async function submit() {
		loading = true
		const { useAuth, valid, error, type } = await login({ nim, password })
		
		if (valid){
			msg = useAuth ? "" : 'No Auth'
			goto(`/${useAuth ? type : 'mhs'}`)
		} else {
			msg = error
			loading = false
		}
	}
	
</script>
<svelte:head>
	<title>Presensi</title>
</svelte:head>

<div class="top-container">
	<div class="box">
		<form on:submit|preventDefault={submit}>
			<h2>LOGIN PRESENSI UDINUS</h2>
			<div class="inputBox">
				<input type="text" id="nim" name="nim" required bind:value={nim} disabled={loading}/>
				<span>NIM</span>
				<i></i>
			</div>
			
			<div class="inputBox">
				<input type="password" id="password" name="password" required bind:value={password} disabled={loading}/>
				<span>Password</span>
				<i></i>
			</div>
			
			<div class="links">
				<div style="color: brown;">{msg}</div>
			</div>
			
			<input type="submit" value="LOGIN" disabled={loading}/>
		</form>
	</div>
</div>
