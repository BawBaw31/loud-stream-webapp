<!-- App.svelte -->
<script>
  import { Route, Router } from "svelte-navigator";
  import Auth from "./pages/Auth.svelte";
  import Home from "./pages/Home.svelte";
  import Profile from "./pages/Profile.svelte";
  import PrivateRoute from "./routes/PrivateRoute.svelte";

  export let url = "";
</script>

<Router {url}>
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
