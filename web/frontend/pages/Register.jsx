import { useAuthenticatedFetch } from "../hooks"
import { Page } from "@shopify/polaris"
import { RegisterForm } from "../components/RegisterForm/RegisterForm"
import { useAuth } from "../context/AuthContext";

const RegisterMiCorreo = () => {
  const { token } = useAuth();
  const fetch = useAuthenticatedFetch();

  const register = async (body) => {
    try {
      const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body, token }),
      });
      const data = await response.json()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Page>
      <RegisterForm register={register} />
    </Page>
  )
}

export default RegisterMiCorreo