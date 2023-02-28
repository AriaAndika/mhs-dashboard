import { getSupabase } from "@supabase/auth-helpers-sveltekit";

import type { LayoutLoad } from "./mhs/$types";


export const load: LayoutLoad = async (e) => {
	
	const { session, supabaseClient } = await getSupabase(e)
	
	return {
		session, 
		supabaseClient,
		oss: 'okkkkkkkkkk'
	}
}



