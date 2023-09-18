<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import { writable, type Writable } from "svelte/store";
  import * as yup from "yup";
  import CustomButton from "../CustomButton.svelte";

  const apiError: Writable<string | null> = writable(null);
  const apiSuccess: Writable<string | null> = writable(null);

  const registerRequest = async (
    email: string,
    stage_name: string,
    password: string
  ): Promise<Response> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          stage_name: stage_name,
          password: password,
        }),
      });
      return response;
    } catch (error) {
      apiError.set("Register failed.");
      apiSuccess.set(null);
    }
  };

  const { errors, handleChange, handleSubmit, isValid, isSubmitting, touched } =
    createForm({
      initialValues: {
        stageName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: yup.object().shape({
        stageName: yup.string().label("stage name").min(3).required(),
        email: yup.string().email().required(),
        password: yup.string().min(8).required(),
        confirmPassword: yup
          .string()
          .label("password confirmation")
          .required()
          .oneOf([yup.ref("password")], "passwords must match"),
      }),
      onSubmit: async (values) => {
        const response = await registerRequest(
          values.email,
          values.stageName,
          values.password
        );
        if (response.status !== 200) {
          apiError.set("Register failed.");
          apiSuccess.set(null);
        } else {
          apiError.set(null);
          apiSuccess.set("Congratulations!");
        }
      },
    });
</script>

<form class:valid={$isValid} on:submit={handleSubmit}>
  {#if $apiError}
    <div>
      <small>{$apiError}</small>
    </div>
  {/if}
  {#if $apiSuccess}
    <div class="success">
      <small>{$apiSuccess}</small>
    </div>
  {/if}

  <div class="input-container">
    <label for="stageName"> Stage name :</label>
    <input type="text" name="stageName" on:keyup={handleChange} />
  </div>
  {#if $errors.stageName && $touched.stageName}
    <small>{$errors.stageName}</small>
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

  <CustomButton btnType="submit" btnIsDisabled={!$isValid}
    >{$isSubmitting ? "Loading..." : "Submit"}</CustomButton
  >
</form>

<style>
  small {
    align-self: flex-end;
  }

  .success small{
    color: green;
  }
</style>
