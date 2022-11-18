import { writable, type Writable } from "svelte/store";

export interface Artist {
  stage_name: string;
  email: string;
  token: string;
}

let _user = localStorage.getItem("artist");

export const currentArtist: Writable<Artist> = writable(
  _user ? JSON.parse(_user) : null
);

currentArtist.subscribe((value) => {
  if (value) localStorage.setItem("artist", JSON.stringify(value));  
  else localStorage.removeItem("artist"); // for logout
});
