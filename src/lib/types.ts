import type { Session } from "@supabase/supabase-js"

export interface User {
	nama: string
	nim: string
	type: 'mhs' | 'dosen' | 'admin'
	kelompok: string
	keterangan: string
	email: string
	photo: string
}
export interface Jadwal {
	dosen: {
		keterangan: string,
		nama: string,
		nim: string,
		type: 'dosen'
	}
	matkul: {
		id: number
		nama: string
		sks: number
	}
	id: number
	jadwal1:string
	kelompok: string
	ruang: string
	status: boolean
	stamp: number
}
export interface AdminInfo {
	jadwal: Jadwal[]
	mhs: User[]
	prodi: {
		id: number
		kelompok: string
		mhs: string
		prodi: string
	}[]
}
export interface State {
	session: Session | null
	user: User
}