import CAPI from "../services/CAPI.js";
import { Router } from 'express' 
const router = Router();

router.post("/", async (_req, res) => {
  let status = 200;
  let error = null;
  const capi = new CAPI();

  try {
    const session = res.locals.shopify.session;
    const { body, token } = _req.body
    const { status, message } = await capi.register(body, token);
    return res.status(status).json(message);
  } catch (err) {
    console.log(`> Failed to process register: ${err}`);

    return res.status(err.code).json({ success: false, err });
  }
});

export default router;