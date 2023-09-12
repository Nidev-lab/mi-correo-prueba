import { Router } from "express";
import axios from "axios";

import { getArgentinaId } from "../helpers/getArgentinaId.js";

const router = Router();

router.get("/", async (_req, res) => {
  let status = 200;
  let error = null;
  let result = null;
  try {
    const session = res.locals.shopify.session;

    const argId = await getArgentinaId(session);
    const url =
      "https://" +
      session.shop +
      "/admin/api/2023-04/countries/" +
      argId +
      "/provinces.json";

    const headers = {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": session.accessToken,
    };

    result = await axios.get(url, { headers: headers });
    result = result.data;
  } catch (e) {
    console.log(`> Failed to process /api/province: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error, result });
});

export default router;
