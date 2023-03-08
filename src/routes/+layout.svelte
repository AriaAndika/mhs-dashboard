<script lang=ts>
	import { client, validateSession } from "$lib/state";
	import { beforeNavigate,afterNavigate, goto } from "$app/navigation";
	
	
	let show = false
	beforeNavigate((e)=>{
		show = true
	})
	afterNavigate(()=>{
		show = false
	})
	
	async function auth() {
		const { valid, type, useAuth } = await validateSession()
		
		if (location.pathname == '/test') { return }
		
		if (!useAuth) { return }
		
		if (valid && useAuth){
			if (location.pathname == '/'){
				return goto(`/${type}`)
			}
			return
		}
		
		return goto('/')
	}
	
</script>

<div class="loading-wrap">
	<div style="display:{show ? 'block' : 'none'}">Loading...</div>
</div>

{#await auth()}
	<h1>Authenticating...</h1>
{:then _}
<slot/>
{/await}

<style>
	.loading-wrap{
		width: 100vw;
		position: fixed;
		bottom: 4rem;
		display: grid;
		place-items: center;
	}
	.loading-wrap > div{
		text-align: center;
		background-color: white;
		color: black;
		width: min-content;
		padding: .7rem 1rem;
		border-radius: 30px;
		font-weight: 700;
	}
</style>