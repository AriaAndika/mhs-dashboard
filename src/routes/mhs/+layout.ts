import { getSupabase } from "@supabase/auth-helpers-sveltekit"
import type { LayoutLoad } from "./$types"

export const ssr = false

export const load: LayoutLoad = async (e) => {
	
	const { session, supabaseClient } = await getSupabase(e)
	
	return {
		session, 
		supabaseClient
	}
}