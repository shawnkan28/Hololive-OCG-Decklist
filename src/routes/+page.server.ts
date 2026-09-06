import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    // 307 is a Temporary Redirect. Use 308 for a Permanent Redirect.
    redirect(307, '/home');
}