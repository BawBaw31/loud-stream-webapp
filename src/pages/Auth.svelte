<script>
  import LoginForm from "../lib/Forms/LoginForm.svelte";
  import RegisterForm from "../lib/Forms/RegisterForm.svelte";
  import CustomButton from "../lib/CustomButton.svelte";

  let login = true;

  const toggleLogin = () => {
    login = !login;
  };
</script>

<div class="pageContainer">
  <div class="leftContainer">
    <img
      id="logo"
      src="/logo_loud_stream_transparent.png"
      alt="Loud Stream logo"
    />
  </div>
  <div class="rightContainer">
    <h1>Welcome to Loud-Stream webapp</h1>

    <div class="card">
      <div class="card-header-container">
        <h2>{login ? "Login" : "Register"}</h2>
        <CustomButton
          on:click={toggleLogin}
          btnStyle="secondary"
          btnType="submit"
          btnSize="small">{login ? "Register" : "Login"}</CustomButton
        >
      </div>
      {#if login}
        <LoginForm />
      {:else}
        <RegisterForm />
      {/if}
    </div>
  </div>
</div>

<style>
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
    min-height: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .leftContainer img#logo {
    width: 20rem;
    height: 20rem;
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

  @media (max-width: 768px) {
    .leftContainer {
      display: none;
    }
    .rightContainer {
      align-items: center;
      max-width: 30rem;
    }

    .pageContainer {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
