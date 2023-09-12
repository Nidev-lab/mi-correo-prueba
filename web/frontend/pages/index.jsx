import { Page, Spinner } from "@shopify/polaris";
import { SelectorApi } from "../components/SelectorApi";
import { useAuthenticatedFetch } from "../hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  textAlign: "center",
  marginTop: "40px",
};

const Selector = () => {
  const navigate = useNavigate();
  const fetch = useAuthenticatedFetch();
  const [hasLoginMethod, setHasLoginMethod] = useState(false);
  const [isFullLoading, setIsFullLoading] = useState(true);

  const getLoginMethod = async () => {
    try {
      const response = await fetch("/api/login-method");

      if (response.ok) {
        const { loginMethod } = await response.json();

        if (loginMethod) {
          // setHasLoginMethod(true);
          // navigate(`/login${loginMethod}`);
          setIsFullLoading(false);
        } else {
          setIsFullLoading(false);
        }
      } else {
        setIsFullLoading(false);
      }
    } catch (error) {
      console.error("There was an error fetching the login method:", error);
    }
  };

  useEffect(() => {
    getLoginMethod();
  }, []);

  return (
    <Page>
      {isFullLoading ? (
        <div style={styles}>
          <Spinner accessibilityLabel="selector" size="large" />
        </div>
      ) : (
        <SelectorApi />
      )}
    </Page>
  );
};

export default Selector;
