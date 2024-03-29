import { derived, get, writable } from "svelte/store";
import type { Form, Response, Team, Match } from "$lib/types";
import { persisted } from "../../node_modules/svelte-persisted-store/dist/index";

//for autofilling form creation data
export const scout = persisted<string>("scout", "");
export const manualSubmission = persisted<boolean>("manualSubmission", false);
export const teams = persisted<Record<number, Team>>("teams", {});
export const matches = persisted<Record<number, Match>>("matches", {});

//The id of the currently active response (the one the user sees on the form page)
export const response = persisted<number | null>("response", null);

//ID of the response we are displaying the QR code of
export const code = persisted<number | null>("code", null);

//list of responses which are "active" eg. can be edited (not yet submitted)
//Structured as a map of ids to responses
export const activeResponses = persisted<Record<number, Response>>(
  "activeResponses",
  {}
);

//This is used for formatting responses before they are sent to the server (not quite sure how though)
export const keys = persisted<string[]>("keys", []);

//list of QRs that have already been scanned so they don't get scanned twice
export const scans = persisted<number[]>("scans", []);

//list of submitted responses waiting to go to server
export const responseQueue = persisted<Response[]>("responseQueue", []);

//the time that the get function was last called? not sure what get does yet
export const lastGet = persisted("lastGet", 0);

//check is device connected to internet (writable only works online)
export const online = writable(true);

export const theme = persisted("theme", "arctos");

//A list of IDs and boolean values for whether or not those forms have errors?
export const errors = persisted<Record<number, boolean>>("errors", {});

export const formType = derived(response, ($response) => $response ? (get(activeResponses)[$response].type.type) : undefined)
