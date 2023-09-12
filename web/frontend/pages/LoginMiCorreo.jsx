import React, { useEffect, useState } from "react";
import FormLogin from "../components/Form/Form";
import { Page, Spinner } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAuthenticatedFetch } from "../hooks";
import { useSelectedOption } from "../context/SelectedOptionContext";

const body = {
  user: import.meta.env.VITE_USER,
  password: import.meta.env.VITE_PASSWORD
}

const styles = {
  textAlign: "center",
  marginTop: "40px",
};

const Login = () => {
  const navigate = useNavigate();
  const [wrongPass, setWrongPass] = useState(false);
  const [isFullLoading, setIsFullLoading] = useState(false);

  const { selectedOption } = useSelectedOption();

  const fetch = useAuthenticatedFetch();
  const { setToken } = useAuth();

  const login = async ({ user, password }) => {
    try {
      const response = await fetch("/api/login-mi-correo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, password }),
      });

      if (!response.ok) {
        setWrongPass(true);
      } else {
        const loginMethod = "micorreo";
        await fetch("/api/login-method", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ loginMethod }),
        });

        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Page>
      {isFullLoading ? (
        <div style={styles}>
          <Spinner accessibilityLabel="Login loading" size="large" />
        </div>
      ) : (
        <FormLogin login={login} wrongPass={wrongPass} />
      )}
    </Page>
  );
};

export default Login;
