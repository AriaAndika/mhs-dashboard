<script lang=ts>
  import { client } from "$lib/state";
  import Camera from "../Camera.svelte";
  
  function refreshCoor() {
    navigator.geolocation.getCurrentPosition((e)=>{
      coor = e.coords.latitude + `  ||  ` + e.coords.longitude
    })
  }
  async function postCoor() {
    const { error } = await client.from('test').insert([
      { label: coordLabel, coord: coor }
    ])
    
    if (error){
      console.error(error)
    }
  }

  
  let show = false
  
  let coor = ``
  let coordLabel = ''
  
  refreshCoor()
</script>
{#if show}
	<Camera close={()=>show=false} />
{/if}

<div>
  <h1>Test</h1>
  <button on:click={()=>show=true}>Coba Kamera</button>
  <hr>
  <button on:click={postCoor}>Post Koordinat</button>
  <input type="text" bind:value={coordLabel}>
  <hr>
  <button on:click={refreshCoor}>Refresh</button>
  <h2>Langitude, Longitude: {coor}</h2>
  <hr>
  <div></div>
</div>