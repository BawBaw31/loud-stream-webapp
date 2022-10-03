<script>
  import CustomButton from "../lib/CustomButton.svelte";
  let login = true;
  let username = "";
  let email = "";
  let password = "";

  const toggleLogin = () => {
    login = !login;
  };
</script>

<main>
  <h1>Welcome to your net worth calculator</h1>

  <div class="card">
    <h2>{login ? "Login" : "Register"}</h2>

    <form>
      {#if !login}
        <div class="input-container">
          <label for="username"> Username :</label>
          <input
            type="text"
            id="username"
            name="username"
            bind:value={username}
          />
        </div>
      {/if}

      <div class="input-container">
        <label for="email"> Email :</label>
        <input type="email" id="email" name="email" bind:value={email} />
      </div>

      <div class="input-container">
        <label for="password"> Password :</label>
        <input
          type="password"
          id="password"
          name="password"
          bind:value={password}
        />
      </div>
    </form>

    <div class="action-container">
      <CustomButton btnType="submit" text="Submit" />
      <CustomButton
        on:click={toggleLogin}
        btnStyle="secondary"
        btnType="submit"
        text={login ? "Register" : "Login"}
      />
    </div>
  </div>
</main>

<style>
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
  }

  .input-container {
    width: 20rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  input[type="text"],
  input[type="password"],
  input[type="email"] {
    font-size: 1rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>
