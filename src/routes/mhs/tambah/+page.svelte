

<script lang=ts>
  import { client } from "$lib/state";
  import Photo from "../../Photo.svelte";
	import { IMAGES } from "../+layout.svelte";
	
	async function onSuccess(nama: string,images: Blob[]) {
		show = false
		
		// Promise.all(
		// 	images.map(e=>{
		// 		return client.storage.from('bucket').upload(nama.replaceAll(' ','_') + '.jpg', e)
		// 	}))
		
		IMAGES.set(images)
		
	}
	
	let show = false
	
</script>


{#if show}
	<Photo close={()=>show=false} onSuccessCallback={onSuccess}/>
{/if}

<main>
	<h1>PRESENSI Mahasiswa</h1>
	<div class="recent">
			<h2>Tambahkan Data</h2>
			<button on:click={()=>show=true}>Tambah</button>
	</div>
</main>


