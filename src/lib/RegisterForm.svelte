<script>
  import CustomButton from "./CustomButton.svelte";
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";

  const { errors, handleChange, handleSubmit, isValid } = createForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      username: yup.string().min(3).required(),
      email: yup.string().email().required(),
      password: yup.string().min(8).required(),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });
</script>

<form on:submit={handleSubmit}>
  <div class="input-container">
    <label for="username"> Username :</label>
    <input type="text" id="username" name="username" on:keyup={handleChange} />
  </div>
  {#if $errors.username}
    <small>{$errors.username}</small>
  {/if}

  <div class="input-container">
    <label for="email"> Email :</label>
    <input type="email" id="email" name="email" on:keyup={handleChange} />
  </div>
  {#if $errors.email}
    <small>{$errors.email}</small>
  {/if}

  <div class="input-container">
    <label for="password"> Password :</label>
    <input
      type="password"
      id="password"
      name="password"
      on:keyup={handleChange}
    />
  </div>
  {#if $errors.password}
    <small>{$errors.password}</small>
  {/if}

  <CustomButton btnType="submit" text="Submit" btnIsDisabled={!$isValid} />
</form>
