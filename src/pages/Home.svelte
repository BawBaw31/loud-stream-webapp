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
  <div class="pageContainer">
    <div class="leftContainer" />
    <div class="rightContainer">
      <h1>Welcome to Loud-Stream webapp</h1>

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
    </div>
  </div>
</main>

<style>
  main {
    height: 100%;
  }

  .pageContainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }

  .rightContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;
  }

  .leftContainer {
    background-color: var(--primary);
    height: 100vh;
  }

  .card-header-container {
    display: flex;
    align-items: center;
  }

  h1 {
    text-align: left;
  }

  h2 {
    margin-right: 1rem;
  }
</style>
