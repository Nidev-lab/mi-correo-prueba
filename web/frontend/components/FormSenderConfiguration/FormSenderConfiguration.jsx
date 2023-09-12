import { useCallback, useEffect, useState } from "react";
import { Button, ButtonGroup, Text, TextField } from "@shopify/polaris";

import { useAuthenticatedFetch } from "../../hooks";

import SelectProvinces from "../SelectProvinces/SelectProvinces";

import ListModal from "../ListModal/ListModal";

import "./FormSenderConfiguration.css";

const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!regex.test(email)) {
    return false;
  }

  return true;
};

const isValidZipCode = (zipCode) => {
  const postalCodePattern = /^[0-9]{4}$/;

  if (!postalCodePattern.test(zipCode)) {
    return false;
  }
  return true;
};

function SenderConfigurationComponent({
  configData,
  deleteAccessToken,
  save,
  showErrorMessage,
}) {
  const [address, setAddress] = useState();
  const [addressNumber, setAddressNumber] = useState();
  const [cellphoneNumber, setCellphoneNumber] = useState();
  const [cityName, setCityName] = useState();
  const [department, setDepartment] = useState();
  const [email, setEmail] = useState();
  const [floor, setFloor] = useState();
  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [provinces, setProvinces] = useState();
  const [province, setProvince] = useState("");
  const [zipCode, setZipCode] = useState();

  const [deleteTokenModalActive, setDeleteTokenModalActive] = useState(false);

  const fetch = useAuthenticatedFetch();

  const getProvinces = async () => {
    try {
      const response = await fetch("/api/province");
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setProvinces(data.result.provinces);
        } else {
          console.log("error al recuperar la data");
        }
      } else {
        console.log("error");
      }
    } catch (error) {
      setIsFullLoading(false);
    }
  };

  useEffect(() => {
    getProvinces();
  }, []);

  useEffect(() => {
    // if (configData && configData.status === "OK") {
    if (configData) {
      if (configData.status === "OK") {
        setProvince(configData.state);
        setCityName(configData.cityName);
        setEmail(configData.email);
        setAddress(configData.streetName);
        setAddressNumber(configData.streetNumber);
        setCellphoneNumber(configData.cellphoneNumber);
        setPhoneNumber(configData.phoneNumber);
        setName(configData.businessName);
        setDepartment(configData.department);
        setFloor(configData.floor);
        setZipCode(configData.zipCode);
      }
    }
  }, [configData]);

  const handleChangeDeleteTokenModal = useCallback(
    () => setDeleteTokenModalActive(!deleteTokenModalActive),
    [deleteTokenModalActive]
  );

  const renderErrorMessage = (item, key) => {
    return <p key={key}>{item}</p>;
  };

  const onlyNumbers = (input, setter) => {
    if (!isNaN(input)) {
      setter(input);
    }
  };

  const validate = () => {
    if (!province) {
      showErrorMessage("Error en la provincia");
      return;
    }
    if (!address) {
      showErrorMessage("Error en la dirección");
      return;
    }
    if (!cityName) {
      showErrorMessage("Error en la ciudad");
      return;
    }
    if (!addressNumber) {
      showErrorMessage("Error en el número de la dirección");
      return;
    }
    if (!zipCode) {
      showErrorMessage("Error en el código postal");
      return;
    } else {
      if (!isValidZipCode(zipCode)) {
        showErrorMessage("Error al ingresar código postal");
        return;
      }
    }
    if (!name) {
      showErrorMessage("Error en el campo nombre");
      return;
    }
    if (!email) {
      showErrorMessage("Error en el campo Email");
      return;
    } else {
      if (!isValidEmail(email)) {
        showErrorMessage("Error al ingresar Email");
        return;
      }
    }
    save(data);
  };

  let data = {
    address: {
      cityName: cityName,
      department: department,
      floor: floor,
      state: province,
      streetName: address,
      streetNumber: addressNumber,
      zipCode: zipCode,
    },
    areaCodeCellphone: "",
    areaCodePhone: "",
    businessName: name,
    cellphoneNumber: cellphoneNumber,
    email: email,
    phoneNumber: phoneNumber,
  };

  return (
    <div className="form-container">
      <div className="margin-vertical">
        <Text variant="headingLg">Configuración del remitente</Text>
      </div>
      <div className="margin-vertical">
        <SelectProvinces
          province={province}
          provinces={provinces}
          setProvince={setProvince}
        />
      </div>
      <div className="margin-vertical">
        <TextField
          label="Ciudad"
          type="text"
          value={cityName ? cityName : ""}
          onChange={(e) => setCityName(e)}
          requiredIndicator
        />
      </div>

      <div className="margin-vertical">
        <div className="width-100-flex">
          <div className="width-70">
            <TextField
              label="Calle"
              type="text"
              value={address ? address : ""}
              onChange={(e) => setAddress(e)}
              requiredIndicator
            />
          </div>
          <div className="address-number">
            <TextField
              label="Número"
              type="text"
              value={addressNumber ? addressNumber : ""}
              onChange={(e) => onlyNumbers(e, setAddressNumber)}
              requiredIndicator
            />
          </div>
        </div>
      </div>

      <div className="margin-vertical">
        <div className="width-100-flex">
          <div className="width-25">
            <TextField
              label="Piso"
              type="text"
              value={floor ? floor : ""}
              onChange={(e) => setFloor(e)}
            />
          </div>
          <div className="department">
            <TextField
              label="Depto."
              type="text"
              value={department ? department : ""}
              onChange={(e) => setDepartment(e)}
            />
          </div>
          <div className="width-45">
            <TextField
              label="Código postal"
              type="text"
              value={zipCode ? zipCode : ""}
              onChange={(e) => setZipCode(e)}
              requiredIndicator
            />
          </div>
        </div>
      </div>

      <div className="margin-vertical">
        <Text variant="headingLg">Configuración Personal</Text>
      </div>

      <div className="margin-vertical">
        <TextField
          label="Nombre completo"
          type="text"
          value={name ? name : ""}
          onChange={(e) => setName(e)}
          requiredIndicator
        />
      </div>
      <div className="margin-vertical">
        <TextField
          label="Email"
          type="email"
          value={email ? email : ""}
          onChange={(e) => setEmail(e)}
          requiredIndicator
        />
      </div>

      <div className="margin-vertical">
        <div className="width-100-flex">
          <div className="cellphone-number">
            <TextField
              label="Celular"
              type="tel"
              value={cellphoneNumber ? cellphoneNumber : ""}
              onChange={(e) => onlyNumbers(e, setCellphoneNumber)}
            />
          </div>
          <div className="width-45">
            <TextField
              label="Teléfono"
              type="tel"
              value={phoneNumber ? phoneNumber : ""}
              onChange={(e) => onlyNumbers(e, setPhoneNumber)}
            />
          </div>
        </div>
      </div>

      <div className="margin-vertical">
        <ButtonGroup className="buttons">
          <Button onClick={() => validate(data)} primary>
            Activar Correo Argentino
          </Button>
          <Button
            onClick={() => handleChangeDeleteTokenModal()}
            destructive={true}
          >
            Restablecer credenciales
          </Button>
        </ButtonGroup>
        <ListModal
          active={deleteTokenModalActive}
          title={"Restablecer credenciales"}
          textAction={"Restablecer credenciales"}
          acceptAction={deleteAccessToken}
          items={["¿Desea restablecer las credenciales?"]}
          renderItem={renderErrorMessage}
          handleChange={handleChangeDeleteTokenModal}
        />
      </div>
    </div>
  );
}

export default SenderConfigurationComponent;
