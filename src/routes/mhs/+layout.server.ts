
import type { LayoutServerLoad } from "./$types";

export const ssr = false

export const load = (() => {
  console.log('server req')
	return {}
}) satisfies LayoutServerLoad;