<script lang=ts>
  import { detectLocation, hariMap } from "$lib/lib";
  import { client, state } from "$lib/state";
  import Camera from "../Camera.svelte";
  import Photo from "../../Photo.svelte"
  import { onMount } from "svelte";
  
  // function TEST() {
  //   client.auth.signUp({
  //     email:'presensionlinemhs1@gmail.com',
  //     password:"user02"
  //   }).then(console.log)
  // }
  // TEST()
  
  // primaricky13@gmail.com : user01
  // presensionlinemhs1@gmail.com : user02
  
  $: {
    isJarakAsli
    jarakCustom
    refreshCoor()
  }
  function refreshCoor() {
    getCoor((e)=>{
      coor = e.coords.latitude + `  ||  ` + e.coords.longitude
      
      let res: boolean
      if (isJarakAsli){
        res = detectLocation(e.coords.latitude,e.coords.longitude)
      } else {
        res = detectLocation(e.coords.latitude,e.coords.longitude,jarakCustom)
      }
      
      if (res){
        statusInRange = '<div style="color:green">Dalam Jangkauan Udinus</div>'
      } else {
        statusInRange = '<div style="color:red">Diluar Jangkauan Udinus</div>'
      }
    })
  }
  function getCoor(cb: PositionCallback) {
    navigator.geolocation.getCurrentPosition(cb)
  }
  async function postCoor() {
    const { error } = await client.from('test').insert([
      { label: coordLabel, coord: coor }
    ])
    
    if (error){
      console.error(error)
    }
  }
  async function onSuccessCallback() {
		let waktu = `${hariMap[(new Date()).getDay()]},${(new Date()).getHours()}.${(new Date()).getMinutes()}`
		
		await client.from('presensi')
		.insert([
			{ mhs: $state.user.nama, jadwal_id: 4, waktu, status: 1 }
		])
  }

  let isJarakAsli = true
  let jarakCustom = 0
  
  let show = false
  let useGeo = true
  let photo = false
  
  let coor = ``
  let coordLabel = ''
  let statusInRange = ''
  
  // onMount(()=>{
  //   client.storage.getBucket('bucket').then(e=>console.log('1',e))
  //   client.storage.from('bucket').download('Ivan_Putra_Pratama.jpg').then(e=>console.log('2',e))//.then(console.log)
  // })
  let os
  $: console.log(os)
  
  refreshCoor()
</script>
{#if show}
	<Camera onSuccessCallback={onSuccessCallback} close={()=>show=false} {useGeo} />
{/if}
{#if photo}
  <Photo close={()=>photo = false} />
{/if}

<div style="margin-top: 10rem;">
  <h1>Test</h1>
  <button on:click={()=>show=true}>Coba Kamera</button>
  <button on:click={()=>photo=true}>Photo</button>
  <hr>
  <button on:click={postCoor}>Post Koordinat</button>
  <input type="text" bind:value={coordLabel}>
  <input type="time" bind:value={os}>
  <hr>
  <button on:click={refreshCoor}>Refresh</button>
  {#if isJarakAsli}
  <button on:click={()=>isJarakAsli=false}>Jarak Custom</button>
  {:else}
  <button on:click={()=>isJarakAsli=true}>Jarak Asli</button>
  <input type="range" min={0} max={70} step={0.4} bind:value={jarakCustom}> {jarakCustom}
  {/if}
  <h2>Langitude, Longitude: {coor}</h2>
  {@html statusInRange}
  <hr>
</div>