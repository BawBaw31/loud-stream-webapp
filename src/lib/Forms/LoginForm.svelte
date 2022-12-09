<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";
  import { currentArtist } from "../../store/auth";
  import CustomButton from "../CustomButton.svelte";
  import { useNavigate } from "svelte-navigator";

  const navigate = useNavigate();

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
      console.error("Wrong email or password", error);
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
        const data = await response.json();
        console.log(data);
        currentArtist.set({
          token: data.access_token,
          email: data.user.email,
          stage_name: data.user.stage_name,
        });
        navigate("/", { replace: true });
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

  <CustomButton btnType="submit" btnIsDisabled={!$isValid}
    >{$isSubmitting ? "Loading..." : "Submit"}</CustomButton
  >
</form>

<style>
  small {
    align-self: flex-end;
  }
</style>
