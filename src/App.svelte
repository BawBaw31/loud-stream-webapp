<!-- App.svelte -->
<script>
  import { Route, Router } from "svelte-navigator";
  import Header from "./lib/Header.svelte";
  import MusicPlayer from "./lib/MusicPlayer/MusicPlayer.svelte";
  import Auth from "./pages/Auth.svelte";
  import Home from "./pages/Home.svelte";
  import Profile from "./pages/Profile.svelte";
  import PrivateRoute from "./routes/PrivateRoute.svelte";

  export let url = "";
</script>

<div class="page">
  <Router {url}>
    <Header />
    <PrivateRoute path="/">
      <Home />
    </PrivateRoute>
    <PrivateRoute path="/profile">
      <Profile />
    </PrivateRoute>
    <Route path="/login">
      <Auth />
    </Route>
  </Router>

  <MusicPlayer />
</div>

<style>
  div.page {
    height: 100vh;
  }
</style>
