import { writable, type Writable } from "svelte/store";

export interface Music {
  id: number;
  title: string;
  streams: number;
  releaseDate: Date;
  totalTrackTime: number;
  owner: Owner;
  audioFileName: string;
  coverFileName: string;
  genre: string;
  published: boolean;
  publishedDate: Date;
}

export enum Genre {
  rock = "Rock",
  pop = "Pop",
  rap = "Rap",
  jazz = "Jazz",
  blues = "Blues",
  country = "Country",
  classical = "Classical",
  electronic = "Electronic",
  folk = "Folk",
  reggae = "Reggae",
  soul = "Soul",
  metal = "Metal",
  punk = "Punk",
  hip_hop = "Hip Hop",
  indie = "Indie",
  alternative = "Alternative",
  latin = "Latin",
  world = "World",
  dance = "Dance",
  rnb = "R&B",
  gospel = "Gospel",
  soundtrack = "Soundtrack",
  childrens = "Children's",
  comedy = "Comedy",
  spoken = "Spoken",
  holiday = "Holiday",
  new_age = "New Age",
  opera = "Opera",
  reggaeton = "Reggaeton",
  ska = "Ska",
}

export interface Owner {
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
    totalTrackTime: music.total_track_time,
    owner: {
      id: music.owner.id,
      stage_name: music.owner.stage_name,
      email: music.owner.email,
    },
    audioFileName: music.audio_file_name,
    coverFileName: music.cover_file_name,
    genre: music.genre,
    published: music.published,
    publishedDate: new Date(music.published_date),
  };
};

export const playingMusic: Writable<Music> = writable(null);
export const playingMusicAudioElement: Writable<HTMLAudioElement> =
  writable(null);
export const isPlaying: Writable<boolean> = writable(false);
