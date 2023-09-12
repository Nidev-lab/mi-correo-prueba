import { useCallback, useState } from "react";
import { Button, TextField } from "@shopify/polaris";
import "./FormPaqAr.css";

function LoginComponent({ login, wrongPass }) {
  const [agreement, setAgreement] = useState();
  const [apikey, setApikey] = useState();

  const handleAgreementChange = useCallback((value) => setAgreement(value), []);
  const handleApiKeyChange = useCallback((value) => setApikey(value), []);

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      login(agreement, apikey);
    }
  };

  return (
    <div className="login-container">
      <div onKeyUp={handleKeyUp}>
        <h2 className="title">Login Correo Argentino</h2>
        <TextField
          label="Acuerdo"
          type="text"
          value={agreement}
          onChange={handleAgreementChange}
        />
        <br />
        <TextField
          label="ApiKey"
          type="password"
          value={apikey}
          onChange={handleApiKeyChange}
        />
        {wrongPass && (
          <h2 className="wrong-pass">Error en el usuario o password</h2>
        )}
        <br />
        <Button
          className="login-btn"
          onClick={() => login(agreement, apikey)}
          primary
          fullWidth
        >
          Login
        </Button>
        <div className="register">
          <p>
            ¿No tenés cuenta? Hace click{" "}
            <a href="https://www.correoargentino.com.ar/" target="_blank">
              aca
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
