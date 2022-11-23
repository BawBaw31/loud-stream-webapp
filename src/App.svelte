<!-- App.svelte -->
<script>
  import { Route, Router } from "svelte-navigator";
  import Auth from "./pages/Auth.svelte";
  import Home from "./pages/Home.svelte";
  import PrivateRoute from "./routes/PrivateRoute.svelte";

  export let url = "";
</script>

<Router {url}>
  <PrivateRoute path="/">
    <Home />
  </PrivateRoute>
  <Route path="/login">
    <Auth />
  </Route>
</Router>
