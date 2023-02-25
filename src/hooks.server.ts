import type { Handle } from '@sveltejs/kit';
 
let counter = 0

export const handle = (async ({ event, resolve }) => {
  if (event.url.pathname.startsWith('/custom')) {
    return new Response('custom response');
  }
  
	const response = await resolve(event);
	
	
	console.log(counter++,event.isDataRequest)
	
	
  return response;
}) satisfies Handle;