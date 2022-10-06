<script>
  import CustomButton from "./CustomButton.svelte";
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";

  // mock async request
  const makeRequest = () => new Promise((resolve) => setTimeout(resolve, 1000));

  const { errors, touched, isValid, isSubmitting, handleChange, handleSubmit } =
    createForm({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).required(),
      }),
      onSubmit: async (values) => {
        await makeRequest();
        alert(JSON.stringify(values, null, 2));
      },
    });
</script>

<form class:valid={$isValid} on:submit={handleSubmit}>
  <div class="input-container">
    <label for="email">Email :</label>
    <input type="email" name="email" on:keyup={handleChange} />
  </div>
  {#if $errors.email && $touched.email}
    <small>{$errors.email}</small>
  {/if}

  <div class="input-container">
    <label for="password">Password :</label>
    <input type="password" name="password" on:keyup={handleChange} />
  </div>
  {#if $errors.password && $touched.password}
    <small>{$errors.password}</small>
  {/if}

  <CustomButton
    btnType="submit"
    text={$isSubmitting ? "Loading..." : "Submit"}
    btnIsDisabled={!$isValid}
  />
</form>

<style>
  small {
    align-self: flex-end;
  }
</style>
