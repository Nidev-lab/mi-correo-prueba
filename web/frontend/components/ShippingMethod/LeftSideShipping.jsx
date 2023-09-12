import { Form, FormLayout, Checkbox, TextField, Button, Text, Select, Grid } from '@shopify/polaris';
import { useState, useCallback } from 'react';

function LeftSideShipping() {
  const [newsletter, setNewsletter] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = useCallback(() => {
    setEmail('');
    setNewsletter(false);
  }, []);

  const handleNewsLetterChange = useCallback(
    (value) => setNewsletter(value),
    [],
  );

  const handleEmailChange = useCallback((value) => setEmail(value), []);
  return (
    <>
      <Text variant="headingXl" alignment='start' as="h4">ShippingMethod</Text>
      <Form onSubmit={handleSubmit}>
        <Text variant="headingLg" alignment='start'>Informacion de contacto</Text>
        <FormLayout>
          <TextField
            name="email"
            value={email}
            onChange={handleEmailChange}
            label="Correo Electronico"
            type="email"
          />
          <Checkbox
            label="Enviarme novedades y ofertas por correo electronico"
            checked={newsletter}
            onChange={handleNewsLetterChange}
          />
          <Text variant="headingLg" alignment='start'>Direccion de envio</Text>
          <Select
            label='Pais / Region'
            options={['Argentina']}
          />
          <Grid>
            <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
              <TextField
                label='Nombre'
                type='text'
                autoComplete='off'
              />
            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
              <TextField
                label='Apellidos'
                type='text'
                autoComplete='off'
              />
            </Grid.Cell>
          </Grid>
          <TextField
            label='Direccion'
            type='text'
            autoComplete='off'
          />
          <TextField
            label='Casa, apartamento, etc'
            type='text'
            autoComplete='off'
          />
          <Grid>
            <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 4, xl: 4}}>
              <TextField
                label='Codigo postal'
                type='text'
                autoComplete='off'
              />
            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 4, xl: 4}}>
              <TextField
                label='Ciudad'
                type='text'
                autoComplete='off'
              />
            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 4, xl: 4}}>
              <Select
                label='Provincia / Estado'
                options={['Mendoza']}
              />
            </Grid.Cell>
          </Grid>
          <Checkbox
            label="Guardar mi informacion y consultar mas rapidamente la proxima vez"
            checked={newsletter}
            onChange={handleNewsLetterChange}
          />
          <Grid>
            <Grid.Cell columnSpan={{xs: 12, sm: 12, md: 4, lg: 4, xl: 4}}>
              <Button submit plain>Volver al carrito</Button>
            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 12, sm: 12, md: 4, lg: 4, xl: 4}} />
            <Grid.Cell columnSpan={{xs: 12, sm: 12, md: 4, lg: 4, xl: 4}}>
              <Button primary submit>Continuar con envios</Button>
            </Grid.Cell>
          </Grid>
        </FormLayout>
      </Form>
    </>
  )
}

export default LeftSideShipping