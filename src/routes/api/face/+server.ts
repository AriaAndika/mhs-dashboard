
import type { RequestHandler } from "./$types";
import { writeFile } from "fs/promises";
import * as faceapi from "face-api.js";

export const POST = ( async ({ request }) => {
	
	const { type, data } = await request.json()
	
	if (type == 'register'){
		console.log(data)
		writeFile('./face.json',JSON.stringify(data))
		
		return new Response('regitered');
	}else if (type == 'match'){
		
		const matcher = new faceapi.FaceMatcher(data)

		const bestMatch = matcher.findBestMatch(await import('../../../../face.json') as unknown as Float32Array)
		
		return new Response(bestMatch.toString());
	}
	
	return new Response('unknown');
	
}) satisfies RequestHandler



