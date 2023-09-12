import { Router } from "express";
import CAPI from "../services/CAPI.js";

const router = Router();

router.get("/", async (_req, res) => {
  let status = 200;
  let error = null;
  let result = null;
  const capi = new CAPI();
  try {
    const session = res.locals.shopify.session;

    result = await capi.getSellerInfo(session.shop);

    console.log("Success");
  } catch (e) {
    console.log(`> Failed to process /api/configuration: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error, result });
});

router.post("/", async (_req, res) => {
  let status = 200;
  let error = null;
  const capi = new CAPI();
  try {
    const session = res.locals.shopify.session;

    const info = { ..._req.body, accessToken: session.accessToken };

    await capi.saveSellerInfo(info, session.shop);

    console.log("Success");
  } catch (e) {
    console.log(`> Failed to process POST /api/configuration: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

export default router;
