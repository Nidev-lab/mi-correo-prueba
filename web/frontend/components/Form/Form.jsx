import React, { useCallback, useState } from "react";
import { Form, FormLayout, TextField, Button } from "@shopify/polaris";
import { Link } from "react-router-dom";
import "./Form.css";

function LoginComponent({ login, wrongPass }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    login({ user, password });
  }

  const handleUserChange = useCallback((value) => setUser(value), []);
  const handlePasswordChange = useCallback((value) => setPassword(value), []);

  return (
    <div className="container">
      <div className="login-container">
        <h2 className="title">Login Correo Argentino</h2>
        <div className="card-content">
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <TextField
                value={user}
                onChange={handleUserChange}
                label="Usuario"
                autoComplete="off"
                requiredIndicator
              />
              <TextField
                value={password}
                onChange={handlePasswordChange}
                label="Contraseña"
                type="password"
                autoComplete="current-password"
                requiredIndicator
              />
              {wrongPass && (
                <h2 className="wrong-pass">Error en el usuario o password</h2>
              )}
              <Button submit fullWidth primary>
                Iniciar sesión
              </Button>
              <div>
                ¿No tienes cuenta? <Link to="/register">Haz clic aquí</Link>
              </div>
            </FormLayout>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
