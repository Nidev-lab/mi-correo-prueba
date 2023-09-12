import { Router } from 'express' 
import productCreator from "../product-creator.js";

const router = Router();

router.get("/products/count", async (_req, res) => {
  console.log("en /products/count");
  // const countData = await shopify.api.rest.Product.count({
  //   session: res.locals.shopify.session,
  // });
  // res.status(200).send(countData);
});

router.get("/products/create", async (_req, res) => {
  let status = 200;
  let error = null;
  console.log("en /products/create");
  // try {
  //   await productCreator(res.locals.shopify.session);
  // } catch (e) {
  //   console.log(`Failed to process products/create: ${e.message}`);
  //   status = 500;
  //   error = e.message;
  // }
  // res.status(status).send({ success: status === 200, error });
});

export default router;