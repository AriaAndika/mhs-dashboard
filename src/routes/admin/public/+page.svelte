<script lang=ts>
	import Adder from "./Adder.svelte";
  import Scanner from "./Scanner.svelte";
	import { news } from "../+layout.svelte";
	
	function onSuccess(nama: string, descriptor: Float32Array) {
		datas[nama] = descriptor
		news.update(e=>{
			if (e.length == 3){
				e.pop()
			}
			const d = new Date()
			const h = d.getHours()
			const m = d.getMinutes()
			e.unshift({ nama, time: `${h<10?'0':''}${h}.${m<10?'0':''}${m}` })
			
			return e
		})
	}
	
	let showAdder = false
	let showScanner = false
	let datas = {}
	
</script>

{#if showAdder}
	<Adder close={()=>showAdder=false} {onSuccess} />
{/if}
{#if showScanner}
	<Scanner images={datas} close={()=>showScanner=false} />
{/if}

<main>
	<h1>Public Recognition</h1>
	<div class="recent">
		<button on:click={()=>showAdder=true}>Daftar</button>
		<button on:click={()=>showScanner=true}>Scan</button>
		<br><br><br>
		<table>
			<thead>
					<tr>
							<th>NO.</th>
							<th>Nama</th>
							<th></th><th></th><th></th><th></th>
							<th></th><th></th><th></th><th></th>
							<th>Aksi</th>
					</tr>
			</thead>
			<tbody>
				{#each Object.keys(datas).reverse() as nama, i}
				<tr>
					<td>{i+1}</td>
					<td colspan="9">{nama}</td>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<td><span class="material-symbols-outlined" style="cursor: pointer;" on:click={()=>{delete datas[nama];datas=datas}}>delete</span></td>
				</tr>
				{/each}
			</tbody>
	</table>
	</div>
</main>


