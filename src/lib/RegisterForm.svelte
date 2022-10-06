<script>
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";
  import CustomButton from "./CustomButton.svelte";

  const { errors, handleChange, handleSubmit, isValid, isSubmitting, touched } =
    createForm({
      initialValues: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: yup.object().shape({
        username: yup.string().min(3).required(),
        email: yup.string().email().required(),
        password: yup.string().min(8).required(),
        confirmPassword: yup
          .string()
          .required()
          .oneOf([yup.ref("password")], "Passwords must match"),
      }),
      onSubmit: (values) => {
        alert(JSON.stringify(values));
      },
    });
</script>

<form class:valid={$isValid} on:submit={handleSubmit}>
  <div class="input-container">
    <label for="username"> Username :</label>
    <input type="text" name="username" on:keyup={handleChange} />
  </div>
  {#if $errors.username && $touched.username}
    <small>{$errors.username}</small>
  {/if}

  <div class="input-container">
    <label for="email"> Email :</label>
    <input type="email" name="email" on:keyup={handleChange} />
  </div>
  {#if $errors.email && $touched.email}
    <small>{$errors.email}</small>
  {/if}

  <div class="input-container">
    <label for="password"> Password :</label>
    <input type="password" name="password" on:keyup={handleChange} />
  </div>
  {#if $errors.password && $touched.password}
    <small>{$errors.password}</small>
  {/if}

  <div class="input-container">
    <label for="confirmPassword"> Confirm password :</label>
    <input type="password" name="confirmPassword" on:keyup={handleChange} />
  </div>
  {#if $errors.confirmPassword && $touched.confirmPassword}
    <small>{$errors.confirmPassword}</small>
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
