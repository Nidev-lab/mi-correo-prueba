import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppQuery, useAuthenticatedFetch } from "../hooks";

import { Page, Spinner } from "@shopify/polaris";

import FormLoginPaqAr from "../components/FormPaqAr/FormPaqAr";

const styles = {
  textAlign: "center",
  marginTop: "40px",
};

const LoginPaqar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullLoading, setIsFullLoading] = useState(true);
  const [wrongPass, setWrongPass] = useState(false);

  const navigate = useNavigate();

  const fetch = useAuthenticatedFetch();

  const { data } = useAppQuery({
    url: "/api/login",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });

  const login = async (agreement, apikey) => {
    const body = {
      agreement,
      apikey,
    };

    if (body) {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const loginMethod = "paqar";
        const responseLoginMethod = await fetch("/api/login-method", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ loginMethod }),
        });

        navigate("/senderConfiguration");
      } else {
        setWrongPass(true);
      }
    }
  };

  const verifyToken = async () => {
    setIsFullLoading(true);
    try {
      const response = await fetch("/api/auth/verify");

      if (response.ok) {
        const data = await response.json();
        if (data && data.result.loggedIn) {
          navigate("/senderConfiguration");
        } else {
          setIsFullLoading(false);
        }
      } else {
        setIsFullLoading(false);
      }
    } catch (error) {
      console.error("Error while verifying token:", error);
      setIsFullLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <Page>
      {isFullLoading ? (
        <div style={styles}>
          <Spinner accessibilityLabel="Login loading" size="large" />
        </div>
      ) : (
        <FormLoginPaqAr login={login} wrongPass={wrongPass} />
      )}
    </Page>
  );
};

export default LoginPaqar;
