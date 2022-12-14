<!-- App.svelte -->
<script>
  import { Route, Router } from "svelte-navigator";
  import Header from "./lib/Layout/Header.svelte";
  import MusicPlayer from "./lib/MusicPlayer/MusicPlayer.svelte";
  import Artist from "./pages/Artist.svelte";
  import Auth from "./pages/Auth.svelte";
  import Home from "./pages/Home.svelte";
  import Music from "./pages/Music.svelte";
  import Profile from "./pages/Profile.svelte";
  import Redirect from "./pages/Redirect.svelte";
  import Upload from "./pages/Upload.svelte";
  import PrivateRoute from "./routes/PrivateRoute.svelte";
  import { currentArtist } from "./store/auth";

  export let url = "";
</script>

<Router {url}>
  {#if $currentArtist}
    <div class="page">
      <Header />
      <main>
        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
        <PrivateRoute path="/profile">
          <Profile />
        </PrivateRoute>
        <PrivateRoute path="/upload">
          <Upload />
        </PrivateRoute>
        <PrivateRoute path="/musics/:id">
          <Music />
        </PrivateRoute>
        <PrivateRoute path="/musics/unpublished/:id">
          <Music published={false} />
        </PrivateRoute>
        <PrivateRoute path="/artists/:id">
          <Artist />
        </PrivateRoute>
      </main>
      <MusicPlayer />
    </div>
  {:else}
    <Route path="/">
      <Auth />
    </Route>
    <Route path="/*">
      <Redirect />
    </Route>
  {/if}
</Router>

<style>
  div.page {
    height: 100vh;
  }

  main {
    padding: 6.5rem 10% 7rem 10%;
    display: grid;
    grid-gap: 2rem;
  }
</style>
