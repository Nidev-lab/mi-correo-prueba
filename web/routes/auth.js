import { Router } from "express";
import CAPI from "../services/CAPI.js";

const router = Router();

router.get("/verify", async (_req, res) => {
  let status = 200;
  let error = null;
  let result = null;
  const capi = new CAPI();

  try {
    const session = res.locals.shopify.session;

    result = await capi.verifyUser(session.shop);

    console.log("Success");
  } catch (e) {
    console.log(`> Failed to process /api/auth/verify: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error, result });
});

router.delete("/token", async (_req, res) => {
  let status = 200;
  let error = null;
  const capi = new CAPI();
  try {
    const session = res.locals.shopify.session;
    await capi.deleteToken(session.shop);
  } catch (e) {
    console.log(`> Failed to process /api/auth/token: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

export default router;
