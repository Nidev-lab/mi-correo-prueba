import { Text, Grid, Divider, SkeletonThumbnail, Badge, Page } from '@shopify/polaris';
import LeftSideShipping from '../components/ShippingMethod/LeftSideShipping';
import RightSideShipping from '../components/ShippingMethod/RightSideShipping';

function ShippingMethod() {
  return (
    <>
      <Grid>
        <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 6, xl: 6}} >
          <LeftSideShipping/>
        </Grid.Cell>
        <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 6, xl: 6}} >
          <RightSideShipping/>
        </Grid.Cell>
      </Grid>
    </>
  )
}

export default ShippingMethod