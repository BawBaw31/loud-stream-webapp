<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import { useNavigate } from "svelte-navigator";
  import { writable, type Writable } from "svelte/store";
  import * as yup from "yup";
  import CustomButton from "../lib/CustomButton.svelte";
  import { currentArtist } from "../store/auth";
  import { Genre } from "../store/music";

  const navigate = useNavigate();
  const apiError: Writable<string | null> = writable(null);

  const uploadMusicRequest = async (
    audioFile: File,
    coverFile: File,
    musicTitle: string,
    musicGenre: string
  ): Promise<Response> => {
    const formData = new FormData();
    formData.append("audio_file", audioFile);
    formData.append("cover_file", coverFile);
    formData.append("music_title", musicTitle);
    formData.append("music_genre", musicGenre);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/musics`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${$currentArtist.token}`,
        },
        body: formData,
      });
      return response;
    } catch (error) {
      apiError.set("Upload failed.");
    }
  };

  const {
    form,
    errors,
    touched,
    isValid,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = createForm({
    initialValues: {
      title: "",
      genre: "",
      audioFile: FileList,
      coverFile: FileList,
    },
    validationSchema: yup.object().shape({
      title: yup.string().required(),
      genre: yup.string().required(),
      audioFile: yup
        .mixed()
        .test("fileRequired", "audio file is required", (value) => {
          return value && value.length;
        })
        .test("fileSize", "audio file too large (2Gb max)", (value) => {
          if (!value.length) return false;
          return value && value[0].size <= 2000000000;
        })
        .test(
          "fileType",
          "Unsupported Format (audio file must be mp3 or wav)",
          (value) => {
            if (!value.length) return false;
            return value && ["audio/mpeg", "audio/wav"].includes(value[0].type);
          }
        ),
      coverFile: yup
        .mixed()
        .test("fileRequired", "cover file is required", (value) => {
          return value && value.length;
        })
        .test("fileSize", "cover file too large (2Gb max)", (value) => {
          if (!value.length) return false;
          return value && value[0].size <= 2000000000;
        })
        .test(
          "fileType",
          "Unsupported Format (cover file must be png or jpeg)",
          (value) => {
            if (!value.length) return false;
            return value && ["image/png", "image/jpeg"].includes(value[0].type);
          }
        ),
    }),
    onSubmit: async (values) => {
      const response = await uploadMusicRequest(
        values.audioFile[0],
        values.coverFile[0],
        values.title,
        values.genre
      );
      if (response.status !== 201) {
        apiError.set("Upload failed.")
      } else {
        const data = await response.json();
        navigate(`/musics/unpublished/${data.id}`);
      }
    },
  });
</script>

<h1>Upload your music</h1>

<form class:valid={$isValid} on:submit={handleSubmit}>
  {#if $apiError}
    <div>
      <small>{$apiError}</small>
    </div>
  {/if}

  <div class="input-container">
    <label for="title">Title :</label>
    <input type="text" name="title" on:keyup={handleChange} />
  </div>
  {#if $errors.title && $touched.title}
    <small>{$errors.title}</small>
  {/if}

  <div class="input-container">
    <label for="genre">Genre :</label>
    <select name="genre" on:click={handleChange}>
      <option value="" disabled selected>Choose a genre</option>
      {#each Object.keys(Genre) as genreKey}
        <option value={Genre[genreKey]}>{Genre[genreKey]}</option>
      {/each}
    </select>
  </div>
  {#if $errors.genre && $touched.genre}
    <small>{$errors.genre}</small>
  {/if}

  <div class="input-container">
    <label for="audioFile">Upload audio file (mp3 or wav) :</label>
    <input
      bind:value={$form.audioFile}
      accept="audio/mp3, audio/wav"
      name="audioFile"
      type="file"
      on:change={handleChange}
      on:click={handleChange}
    />
  </div>
  {#if $errors.audioFile && $touched.audioFile}
    <small>{$errors.audioFile}</small>
  {/if}

  <div class="input-container">
    <label for="coverFile">Upload cover file (png or jpeg) :</label>
    <input
      bind:value={$form.coverFile}
      accept="image/png, image/jpeg"
      name="coverFile"
      type="file"
      on:change={handleChange}
      on:click={handleChange}
    />
  </div>
  {#if $errors.coverFile && $touched.coverFile}
    <small>{$errors.coverFile}</small>
  {/if}

  <CustomButton btnType="submit" btnIsDisabled={!$isValid}
    >{$isSubmitting ? "Loading..." : "Submit"}</CustomButton
  >
</form>

<style>
  small {
    align-self: flex-end;
  }

  form {
    max-width: 100%;
  }
  form input,
  form select {
    width: 50%;
    box-sizing: border-box;
    margin-left: 0.5rem;
  }
</style>
