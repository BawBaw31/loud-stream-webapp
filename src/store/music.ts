import { writable, type Writable } from "svelte/store";

export interface Music {
  id: number;
  title: string;
  streams: number;
  releaseDate: Date;
  owner: Owner;
  audioFileName: string;
  coverFileName: string;
  genre: string;
  published: boolean;
  published_date: Date;
}

interface Owner {
  id: number;
  stage_name: string;
  email: string;
}

export const mapMusic = (music: any): Music => {
  return {
    id: music.id,
    title: music.title,
    streams: music.streams,
    releaseDate: new Date(music.created_date),
    owner: {
      id: music.owner.id,
      stage_name: music.owner.stage_name,
      email: music.owner.email,
    },
    audioFileName: music.audio_file_name,
    coverFileName: music.cover_file_name,
    genre: music.genre,
    published: music.published,
    published_date: new Date(music.published_date),
  };
};

export const latestReleases: Writable<Music[]> = writable([]);
export const playingMusic: Writable<Music> = writable(null);
export const playingMusicAudioElement: Writable<HTMLAudioElement> =
  writable(null);
