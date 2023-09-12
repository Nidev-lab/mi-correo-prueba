import React, { useCallback, useState } from "react";
import {
  Card,
  Form,
  FormLayout,
  Button,
  Heading,
  Select,
} from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import { useSelectedOption } from "../../context/SelectedOptionContext";
import "./SelectorApi.css";

function SelectorComponent() {
  const navigate = useNavigate();

  const { setSelectedOption } = useSelectedOption();
  const [selected, setSelected] = useState("Api pack.ar");

  const handleSubmit = useCallback(
    (_event) => {
      _event.preventDefault();
      setSelectedOption(selected);

      if (selected === "Mi Correo") {
        navigate("/loginmicorreo");
      }

      if (selected === "Api pack.ar") {
        navigate("/loginpaqar");
      }
    },
    [selected]
  );

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  return (
    <div className="container">
      <Heading element="h1">Integración Correo Argentino</Heading>
      <div className="selector-container">
        <Card sectioned>
          <div className="card-content">
            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <Select
                  label="Seleccione su opción: "
                  options={["Api pack.ar", "Mi Correo"]}
                  onChange={handleSelectChange}
                  value={selected}
                />
                <Button submit fullWidth primary>
                  Continuar
                </Button>
              </FormLayout>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default SelectorComponent;
