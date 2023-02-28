
import pocketbaseEs from "pocketbase";
import type { RequestHandler } from "./$types";



export const POST = ( async ({ request }) => {
	const pb = new pocketbaseEs('http://127.0.0.1:8090')
	
	const { nim, password }: {nim:string, password:string} = await request.json()
	
	try {
		let login = await pb.collection('users').authWithPassword(nim, password);
		
		return new Response(JSON.stringify({
			isValid: true
		}));
	} catch (error) {
		
		return new Response(JSON.stringify({
			isValid: false
		}));
	}
	
	
	
}) satisfies RequestHandler