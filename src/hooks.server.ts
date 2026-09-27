import type { ServerInit } from "@sveltejs/kit";
import { importIfEmpty } from "$lib/server/import";
import db from '$lib/server/db';

export const init: ServerInit = () => {
    importIfEmpty(db);
    console.log("LOADED");
}