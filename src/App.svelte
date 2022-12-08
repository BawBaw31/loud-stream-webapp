<!-- App.svelte -->
<script>
  import { Route, Router } from "svelte-navigator";
  import Header from "./lib/Header.svelte";
  import MusicPlayer from "./lib/MusicPlayer/MusicPlayer.svelte";
  import Auth from "./pages/Auth.svelte";
  import Home from "./pages/Home.svelte";
  import Profile from "./pages/Profile.svelte";
  import PrivateRoute from "./routes/PrivateRoute.svelte";
  import { currentArtist } from "./store/auth";

  export let url = "";
</script>

<Router {url}>
  {#if $currentArtist}
    <div class="page">
      <Header />
      <Router url="/test">
        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
        <PrivateRoute path="/profile">
          <Profile />
        </PrivateRoute>
      </Router>
      <MusicPlayer />
    </div>
  {:else}
    <Route path="/">
      <Auth />
    </Route>
  {/if}
</Router>

<style>
  div.page {
    height: 100vh;
  }
</style>
