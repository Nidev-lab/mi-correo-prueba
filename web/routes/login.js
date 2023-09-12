import { Router } from 'express' 
import CAPI from "../services/CAPI.js";

const router = Router();

router.post("/login", async (_req, res) => {
  let status = 200;
  let error = null;
  const capi = new CAPI();

  try {
    const session = res.locals.shopify.session;
    const info = _req.body;

    const result = await capi.login(info.agreement, info.apikey, session.shop);

    console.log("Success:");
  } catch (e) {
    console.log(`> Failed to process auth/login: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

router.post("/login-mi-correo", async (req, res) => {
  let status = 200;
  let error = null;
  let data = null;
  const capi = new CAPI();

  try {
    const session = res.locals.shopify.session;
    const { user, password } = req.body;
    const result = await capi.loginMiCorreo(user, password, session.shop);
    status = result.status;
    data = result.data;
  } catch (e) {
    console.log(`> Failed to process auth/loginaasdaf: ${e}`);
    status = 500;
    error = e.message;
  }

  res.status(status).send({ success: status === 200, data, error });
});

router.post("/login-method", async (_req, res) => {
  let status = 200;
  let error = null;
  const capi = new CAPI();

  try {
    const session = res.locals.shopify.session;
    const { loginMethod } = _req.body;

    const result = await capi.setLoginMethod(session.shop, loginMethod);

    console.log("Success:", result);
  } catch (e) {
    console.log(`> Failed to process auth/login-mi-correo: ${e}`);
    status = 500;
    error = e.message;
  }

  res.status(status).send({ success: status === 200, error });
});

router.get("/login-method", async (req, res) => {
  try {
    const session = res.locals.shopify.session;
    const shop = session.shop;

    const capi = new CAPI();
    const loginMethod = await capi.getLoginMethod(shop);

    if (loginMethod) {
      res.status(200).send({ loginMethod });
    } else {
      res
        .status(404)
        .send({ error: "Login method not found for the given shop." });
    }
  } catch (e) {
    console.log(`> Failed to fetch login method: ${e.message}`);
    res.status(500).send({ error: e.message });
  }
});

export default router;