import { writeFile, readFile } from "fs/promises";
import type { RequestHandler } from "./$types";



export const GET: RequestHandler = async ({ }) => {
	
	return new Response(await readFile('face.json'));
};


export const POST: RequestHandler = async ({ request }) => {
	
	const body = await request.json()
	
	let str = '['
	
	Object.values(body).forEach((e,i,r)=>{
		str += `${e}`
		
		if (i != r.length - 1){
			str += ','
		}
	})
	
	writeFile('face.json',str + ']')
	
	return new Response('');
};

