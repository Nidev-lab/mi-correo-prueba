import { Link } from "react-router-dom";
import { Button } from "@shopify/polaris";
import "./SuccessScreen.css";

const SuccessScreen = () => {
  return (
    <div className="success-container">
      <h2 className="success-title">Configuración Exitosa</h2>
      <div className="button-container">
        <Link to="/loginpaqar">
          <Button primary size="large">
            Volver
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessScreen;
