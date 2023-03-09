import { goto } from "$app/navigation";
import { createClient } from "@supabase/supabase-js";
import { writable } from "svelte/store";
import { defaultJadwal, defaultUser, useAuth, log } from "./config";
import type { AdminInfo, DosenInfo, Jadwal, Presensi, State, User } from "./types";

export const client = createClient("https://nfqvhulsxmlzekgpayuk.supabase.co",'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mcXZodWxzeG1semVrZ3BheXVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU5MDI2MzAsImV4cCI6MTk5MTQ3ODYzMH0.TcYsuIfSXZ31mSVkvJCdbUXOVtzngLVnD6Wo-sHwpws')	
console.log('state init')
export const state = writable<State>({
	session: null,
	user: defaultUser
})
export let jadwal = writable([defaultJadwal])//: Jadwal[] = [defaultJadwal]
export let adminInfo = writable<AdminInfo>()
export let dosenInfo = writable<DosenInfo>()
export let userPresensi = writable<Presensi[]>()

function presensi() {
	
}
export function getImgLink(nama) {
	return `https://nfqvhulsxmlzekgpayuk.supabase.co/storage/v1/object/public/bucket/${nama.trim().replaceAll(' ','_')}.jpg`
}
export async function login({nim, password}: { nim: string; password: string; }) {
	if (!useAuth) {
		return { valid: true, useAuth, error: null, type: '' }
	}
	
	const { data: userData, error: userErr } = await fetchUserData({ nim })
	if (userErr) {
		console.error('NIM Error:',userErr)
		return { valid: false, useAuth, error: 'NIM atau password salah' }
	}
	
	const { error: err } = await client.auth.signInWithPassword({
		email: (userData as User).email, password
	})
	if (err) {
		console.error('Credential error:',err)
		return { valid: false, useAuth, error: 'NIM atau password salah' }
	}
	
	await validateSession((userData as User))
	return { valid: true, useAuth, error: null, type: (userData as User).type }
}
export async function logout() {
	
	const { error: supaError } = await client.auth.signOut()
	if (supaError) { console.error('err logout:',supaError) }
	goto('/')
}
export async function validateData(user: User) {
	console.log('Validating data {',user.type,'}')
	switch (user.type) {
		case 'mhs':{
			jadwal.set(await fetchJadwal(user.kelompok))
			userPresensi.set(await fetchUserPresensi(user))
			return
		}
		case 'dosen':{
			jadwal.set(await fetchDosenJadwal(user.nama))
			dosenInfo.set(await fetchDosenInfo())
			if ( log ) console.log(dosenInfo)
			return
		}
		case 'admin':{
			adminInfo.set(await fetchAdminInfo())
			console.log('Admin info:',adminInfo)
			return
		}
	}
}
export async function validateSession(current_user?: User) {
	if (!useAuth){
		return { valid: true, type: 'mhs', useAuth }
	}
	
	const { data: { session }, error: supaErr } = await client.auth.getSession()
	if (supaErr){
		console.error('err validating session',supaErr)
		return { valid: false, type: null, useAuth }
	}
	
	let user: User = current_user
	
	if (session && !user){
		const { data: userData, error: userErr } = await fetchUserData({ email: session.user.email })
		if (userErr){
			console.error('err validating session',userErr)
			return { valid: false, type: null, useAuth }
		}
		user = userData as User
		// pfp
		user.photo = `https://nfqvhulsxmlzekgpayuk.supabase.co/storage/v1/object/public/bucket/${user.nama.replaceAll(' ','_')}.jpg`
	}
	
	
	state.update(e=>{
		e.session = session
		e.user = user ?? defaultUser
		return e
	})
	
	if (user){
		await validateData(user)
	}
	if ( log ) { console.log('validating session') }
	return { valid: Boolean(session), type: user?.type, useAuth }
}
export async function fetchUserData({nim, email}:{ nim?: string, email?: string }){
	console.log('@debug:',nim,email)
	if ( log ) { console.log('fetch user data') }
	return client
	.from('mhs')
	.select('*')
	.eq(nim ? 'nim' : 'email',nim ?? email)
	.single()
}
export async function fetchJadwal (kelompok: string): Promise<Jadwal[]> {
	if ( log ) { console.log('fetch jadwal') }
	return (await client
		.from('jadwal')
		.select('*, matkul(*), dosen(*)')
		.eq('kelompok',kelompok.toUpperCase())).data as any
}
export async function fetchDosenJadwal (dosen: string): Promise<Jadwal[]> {
	if ( log ) { console.log('fetch jadwal dosen') }
	return (await client
		.from('jadwal')
		.select('*, matkul(*), dosen(*)')
		.eq('dosen',dosen)).data as any
}
export async function fetchAdminInfo (): Promise<AdminInfo> {
	const res = await Promise.all([
		client.from('mhs').select('*'),
		client.from('prodi').select('*'),
		client.from('jadwal').select('*, matkul(id,nama)'),
	])
	
	return Object.fromEntries(res.map(({data, error: cr},i)=>{
		if (cr) { console.error(cr) }
		return [i == 0 ? 'mhs' : i == 1 ? 'prodi' : 'jadwal',data]
	})) as any
}
export async function fetchDosenInfo(): Promise<DosenInfo> {
	const res = await Promise.all([
		client.from('presensi').select('*, jadwal(*), mhs(*)'),
		client.from('mhs').select('*').eq('type','mhs'),
	])
	
	if ( log ) console.log(res[0])
	return Object.fromEntries(res.map(({data, error: cr},i)=>{
		if (cr) { console.error(cr) }
		return [i == 0 ? 'presensi' : 'mhs',data]
	})) as any
}
export async function fetchUserPresensi(user: User): Promise<Presensi[]> {
	return (await client.from('presensi').select('*, jadwal(*)').eq('mhs',user.nama)).data as any
}

export async function bukaPresensi(jadwal: Jadwal) {
	return await client.from('jadwal')
		.update([ { status: true, stamp: Date.now() } ])
		.eq('id',jadwal.id)
}