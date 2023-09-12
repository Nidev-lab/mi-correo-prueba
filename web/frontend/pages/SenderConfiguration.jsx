import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Frame, Loading, Page } from "@shopify/polaris";

import { useAuthenticatedFetch } from "../hooks";

import SenderConfigurationComponent from "../components/FormSenderConfiguration/FormSenderConfiguration";
import ToastMessage from "../components/ToastMessage/ToastMessage";
import SuccessScreen from "../components/SuccessScreen/SuccessScreen";

const SenderConfiguration = () => {
  const [configData, setConfigData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTst, setActiveTst] = useState(false);
  const [messageTst, setMessageTst] = useState();
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const fetch = useAuthenticatedFetch();

  const toggleActive = useCallback(
    () => setActiveTst((activeTst) => !activeTst),
    []
  );

  const getConfiguration = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/configuration");
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setConfigData(data.result);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    getConfiguration();
  }, []);

  const showErrorMessage = (msg) => {
    setMessageTst(msg);
    toggleActive();
  };

  const save = async (data) => {
    setIsLoading(true);
    try {
      await fetch("/api/configuration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // if (response.ok) {
      //   setIsLoading(false);
      //   setSuccess(true);
      // }

      await fetch("/api/webhook/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      await fetch("/api/carrier", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsLoading(false);
      setSuccess(true);
    } catch (e) {
      console.log("error: ", e);
      showErrorMessage("Ocurrió un error");
    }
  };

  const deleteAccessToken = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/token", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setIsLoading(false);
        navigate("/loginpaqar");
      }
    } catch (e) {
      showErrorMessage("Ocurrió un error");
    }
  };

  return (
    <Page>
      {success ? (
        <SuccessScreen />
      ) : (
        <SenderConfigurationComponent
          configData={configData}
          deleteAccessToken={deleteAccessToken}
          save={save}
          showErrorMessage={showErrorMessage}
        />
      )}
      <ToastMessage
        msg={messageTst}
        active={activeTst}
        toggleActive={toggleActive}
      />
      {isLoading ? (
        <Frame>
          <Loading />
        </Frame>
      ) : (
        ""
      )}
    </Page>
  );
};

export default SenderConfiguration;
