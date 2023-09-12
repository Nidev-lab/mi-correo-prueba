import React, { useEffect, useState } from "react";
import { Form, FormLayout, Select, TextField, Button } from "@shopify/polaris";
import './RegisterForm.css';
import { useAuth } from "../../context/AuthContext";
import { useAuthenticatedFetch } from "../../hooks";
import { argentinaList } from "../../constants/countries";

export function RegisterForm({ register }) {
    const fetch = useAuthenticatedFetch();
    const { setToken, token } = useAuth();

    const body = {
        user: import.meta.env.VITE_USER,
        password: import.meta.env.VITE_PASSWORD
    }
      
    const getAuthToken = async () => {
        try {
          const response = await fetch("/api/login-mi-correo", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
          const resp = await response.json()
          setToken(resp.data.token)
        } catch (error) {
          console.error(error);
        }
    };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        documentType: 'DNI',
        documentId: '',
        phone: '',
        streetName: '',
        streetNumber: '',
        floor: '',
        apartment: '',
        city: '',
        provinceCode: '',
        postalCode: '',
        cellPhone: ''
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errors = {};

        if (!formData.documentId) {
            errors.documentId = "El número de documento es requerido.";
        }
        if (!formData.firstName) {
            errors.firstName = "El nombre es requerido.";
        }
        if (!formData.lastName) {
            errors.lastName = "El apellido es requerido.";
        }
        if (!formData.email || !/^\S+@\S+$/i.test(formData.email)) {
            errors.email = "El email es requerido y debe ser válido.";
        }
        if (!formData.password) {
            errors.password = "La contraseña es requerida.";
        }
        if (!formData.phone) {
            errors.phone = "El telefono es requerido.";
        }
        if (!formData.cellPhone) {
            errors.cellPhone = "El celular es requerido.";
        }
        if (formData.documentType === 'DNI' && !formData.streetName) {
            errors.streetName = "La calle es requerida.";
        }
        if (formData.documentType === 'DNI' && !formData.streetNumber) {
            errors.streetNumber = "La altura es requerida.";
        }
        if (formData.documentType === 'DNI' && !formData.city) {
            errors.city = "La ciudad es requerida.";
        }
        if (formData.documentType === 'DNI' && !formData.provinceCode) {
            errors.provinceCode = "La provincia es requerida.";
        }
        if (formData.documentType === 'DNI' && !formData.postalCode) {
            errors.postalCode = "El codigo postal es requerida.";
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const onSubmit = async () => {
        const body = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            documentType: formData.documentType,
            documentId: formData.documentId,
            phone: formData.phone,
            cellPhone: formData.cellPhone,
            address: {
                streetName: formData.streetName,
                streetNumber: formData.streetNumber,
                floor: formData.floor,
                apartment: formData.apartment,
                city: formData.city,
                provinceCode: formData.provinceCode,
                postalCode: formData.postalCode,
            }
        }
        if (validate()) {
            register(body)
        }
    };

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
      getAuthToken()
    }, [])
    
    return (
        <div className="register-container">
            <Form onSubmit={onSubmit}>
                <FormLayout>
                    <Select
                        label="Tipo de Documento *"
                        options={["DNI", "CUIT"]}
                        value={formData.documentType}
                        onChange={(value) => handleChange('documentType', value)}
                    />
                    <TextField
                        label="Número de Documento *"
                        type="number"
                        value={formData.documentId}
                        onChange={(value) => handleChange('documentId', value)}
                        error={errors.documentId}
                    />
                    <TextField
                        label="Nombre *"
                        value={formData.firstName}
                        onChange={(value) => handleChange('firstName', value)}
                        error={errors.firstName}
                    />
                    <TextField
                        label="Apellido *"
                        value={formData.lastName}
                        onChange={(value) => handleChange('lastName', value)}
                        error={errors.lastName}
                    />
                    <TextField
                        label="Email *"
                        value={formData.email}
                        onChange={(value) => handleChange('email', value)}
                        error={errors.email}
                    />
                    <TextField
                        label="Contraseña *"
                        value={formData.password}
                        onChange={(value) => handleChange('password', value)}
                        type="password"
                        error={errors.password}
                    />
                    <TextField
                        label={`Calle ${formData.documentType === 'DNI' ? '*' : ''}`}
                        value={formData.streetName}
                        onChange={(value) => handleChange('streetName', value)}
                        error={errors.streetName}
                    />
                    <TextField
                        label={`Altura ${formData.documentType === 'DNI' ? '*' : ''}`}
                        value={formData.streetNumber}
                        onChange={(value) => handleChange('streetNumber', value)}
                        type="number"
                        error={errors.streetNumber}
                    />
                    <TextField
                        label="Piso"
                        value={formData.floor}
                        onChange={(value) => handleChange('floor', value)}
                    />
                    <TextField
                        label="Departamento"
                        value={formData.apartment}
                        onChange={(value) => handleChange('apartment', value)}
                    />
                    <TextField
                        label={`Ciudad ${formData.documentType === 'DNI' ? '*' : ''}`}
                        value={formData.city}
                        onChange={(value) => handleChange('city', value)}
                        error={errors.city}
                    />
                    <Select
                        label={`Provincias ${formData.documentType === 'DNI' ? '*' : ''}`}
                        value={formData.provinceCode}
                        onChange={(value) => handleChange('provinceCode', value)}
                        error={errors.provinceCode}
                        options={argentinaList.region}
                    />
                    <TextField
                        label={`Código Postal ${formData.documentType === 'DNI' ? '*' : ''}`}
                        value={formData.postalCode}
                        onChange={(value) => handleChange('postalCode', value)}
                        error={errors.postalCode}
                    />
                    <TextField
                        label="Teléfono *"
                        value={formData.phone}
                        onChange={(value) => handleChange('phone', value)}
                        type="tel"
                        error={errors.phone}
                    />
                    <TextField
                        label="Celular *"
                        value={formData.cellPhone}
                        onChange={(value) => handleChange('cellPhone', value)}
                        type="tel"
                        error={errors.cellPhone}
                    />
                    <Button submit>Registrarse</Button>
                </FormLayout>
            </Form>
        </div>
    );
}
