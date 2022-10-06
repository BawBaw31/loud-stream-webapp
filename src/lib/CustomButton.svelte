<script>
  export let text;
  export let btnType = "";
  export let btnStyle = "primary";
  export let btnSize = "";
  export let btnIsDisabled = false;
</script>

{#if btnIsDisabled}
  <button class="{btnStyle} {btnSize}" type={btnType} disabled on:click>
    {text}
  </button>
{:else}
  <button class="{btnStyle} {btnSize}" type={btnType} on:click>
    {text}
  </button>
{/if}

<style>
  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: border-color 0.25s;
  }

  button:hover {
    border-color: #0924ef;
  }

  button.primary {
    background-color: var(--primary);
  }

  button.secondary {
    background-color: var(--secondary-dark);
  }

  button.small {
    font-size: 0.7rem;
  }

  button:disabled {
    background-color: gray;
    cursor: not-allowed;
  }

  @media (prefers-color-scheme: light) {
    button.secondary {
      background-color: var(--secondary-light);
    }
  }
</style>
