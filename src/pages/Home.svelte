<script>
  import LoginForm from "../lib/LoginForm.svelte";
  import RegisterForm from "../lib/RegisterForm.svelte";
  import CustomButton from "../lib/CustomButton.svelte";

  let login = true;

  const toggleLogin = () => {
    login = !login;
  };
</script>

<main>
  <h1>Welcome to your net worth calculator</h1>

  <div class="card">
    <div class="card-header-container">
      <h2>{login ? "Login" : "Register"}</h2>
      <CustomButton
        on:click={toggleLogin}
        btnStyle="secondary"
        btnType="submit"
        btnSize="small"
        text={login ? "Register" : "Login"}
      />
    </div>

    {#if login}
      <LoginForm />
    {:else}
      <RegisterForm />
    {/if}

  </div>
</main>

<style>
  .card-header-container {
    display: flex;
    align-items: center;
  }

  h2 {
    margin-right: 1rem;
  }
</style>