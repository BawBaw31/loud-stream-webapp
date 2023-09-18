<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import { useNavigate } from "svelte-navigator";
  import { writable, type Writable } from "svelte/store";
  import * as yup from "yup";
  import { currentArtist } from "../../store/auth";
  import CustomButton from "../CustomButton.svelte";

  const navigate = useNavigate();
  const apiError: Writable<string | null> = writable(null);

  const loginRequest = async (
    email: string,
    password: string
  ): Promise<Response> => {
    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      return response;
    } catch (error) {
      apiError.set("Wrong email or password.");
    }
  };

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
        const response = await loginRequest(values.email, values.password);
        if (response.status !== 200) {
          apiError.set("Wrong email or password.");
        } else {
          const data = await response.json();
          currentArtist.set({
            token: data.access_token,
            email: data.user.email,
            stage_name: data.user.stage_name,
          });
          navigate("/", { replace: true });
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

  <CustomButton btnType="submit" btnIsDisabled={!$isValid}
    >{$isSubmitting ? "Loading..." : "Submit"}</CustomButton
  >
</form>

<style>
  small {
    align-self: flex-end;
  }
</style>
