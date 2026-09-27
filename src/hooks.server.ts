import type { ServerInit } from "@sveltejs/kit";

export const init: ServerInit = () => {
    console.log("LOADED");
}