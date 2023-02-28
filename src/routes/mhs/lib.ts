

export function getDate() {
	
	const date = new Date();
	let tahun = date.getFullYear();
	let bulan: number | string = date.getMonth();
	let tanggal = date.getDate();
	let hari: number | string = date.getDay();
	let hariMap = ["Minggu","Senin","Selasa","Rabu","Kamis","Jum'at","Sabtu"]
	let bulanMap = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]
	hari = hariMap[hari]
	bulan = bulanMap[bulan]

	return "© " + hari + ", " + tanggal + " " + bulan + " " + tahun + " | ABSENSI UDINUS | All Right Reserved";
}