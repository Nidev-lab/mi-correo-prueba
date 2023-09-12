import { Text, Grid, Divider, SkeletonThumbnail, Badge, Page } from '@shopify/polaris';
import './RightSideShipping.css'

function RightSideShipping() {
  return (
    <Page>
      <div className="section-below alignCenterItems">
        <Grid>
          <Grid.Cell columnSpan={{xs: 2, sm: 2, md: 2, lg: 2, xl: 2}} >
            <div className="productBadge">
              <Badge className="badge">1</Badge>
              <SkeletonThumbnail size="medium"/>
            </div>
          </Grid.Cell>
          <Grid.Cell columnSpan={{xs: 8, sm: 8, md: 8, lg: 8, xl: 8}} >
            <Text>Nombre del producto</Text>
          </Grid.Cell>
          <Grid.Cell columnSpan={{xs: 2, sm: 2, md: 2, lg: 2, xl: 2}} >
            <Text>0.000,00</Text>
          </Grid.Cell>
        </Grid>
      </div>
      <div className="section">
        <Divider borderColor="border"/>
        <Grid>
          <Grid.Cell columnSpan={{xs: 10, sm: 10, md: 10, lg: 10, xl: 10}} >
            <Text>Subtotal</Text>
          </Grid.Cell>
          <Grid.Cell columnSpan={{xs: 2, sm: 2, md: 2, lg: 2, xl: 2}} >
            <Text>0.000,00</Text>
          </Grid.Cell>
          <Grid.Cell columnSpan={{xs: 10, sm: 10, md: 10, lg: 10, xl: 10}} >
            <Text>Envios</Text>
          </Grid.Cell>
          <Grid.Cell columnSpan={{xs: 2, sm: 2, md: 2, lg: 2, xl: 2}} >
            <Text>0.000,00</Text>
          </Grid.Cell>
        </Grid>
      </div>
      <div className="section">
        <Divider borderColor="border"/>
        <Grid>
          <Grid.Cell columnSpan={{xs: 10, sm: 10, md: 10, lg: 10, xl: 10}} >
            <Text variant='bodyLg'>Total</Text>
          </Grid.Cell>
          <Grid.Cell columnSpan={{xs: 2, sm: 2, md: 2, lg: 2, xl: 2}} >
            <Text variant='bodyLg'>
              <span className="currency">
                ARS
              </span>
              <b>$0.000,00</b>
            </Text>
          </Grid.Cell>
        </Grid>
      </div>
    </Page>
  )
}

export default RightSideShipping