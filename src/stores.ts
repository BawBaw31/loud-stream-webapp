import { writable, type Writable } from "svelte/store";

interface Artist {
  stage_name: string;
  email: string;
  token: string;
}

export const currentArtist: Writable<Artist> = writable();
