import type { User, Jadwal } from "./types"


export const useAuth = true
export const log = true

export const defaultUser: User = {
	nama: "<nama>",
	nim: "A11.1111.11111",
	type: "mhs",
	kelompok: "A11-4111",
	keterangan: "2022/2023",
	email: "www@golge.moc",
	photo: "/img/admin.png"
}
export const defaultJadwal: Jadwal = {
	dosen: {
		keterangan: "<keterangan>",
		nama: "<senopati>",
		nim: "<12345678>",
		type: "dosen"
	},
	matkul: {
		id: 0,
		nama: "<kalkulus>",
		sks: 99
	},
	id: 0,
	jadwal1: "Sabtu,01.00-01.00",
	kelompok: "<A11-4111>",
	ruang: "H.9.9",
	status: false,
	stamp: Date.now(),
	dadakan: false
}