<script>
  export let text;
  export let btnType = "";
  export let btnStyle = "primary";
</script>

<button class={btnStyle} type={btnType} on:click>
  {text}
</button>

<style>
  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: border-color 0.25s;
  }

  button:hover {
    border-color: #0924ef;
  }

  button.primary {
    background-color: #5e0f4b;
  }

  button.secondary {
    background-color: #1a1a1a;
  }

  @media (prefers-color-scheme: light) {
    button.primary {
      background-color: #f17dd4;
    }

    button.secondary {
      background-color: #f9f9f9;
    }
  }
</style>
