import express from "express";
import productRoutes from "./product.js";
import loginRoutes from "./login.js";
import shopify from "../shopify.js";
import authRoutes from "./auth.js";
import provinceRoutes from "./province.js";
import webhookRoutes from "./webhook.js";
import carrierRoutes from "./carrier.js";
import configuration from "./configuration.js";
import registerRoutes from "./register.js";
const router = express.Router();

router.use("/*", shopify.validateAuthenticatedSession());
router.use("/products", productRoutes);
router.use("/auth", authRoutes);
router.use("/province", provinceRoutes);
router.use("/webhook", webhookRoutes);
router.use("/carrier", carrierRoutes);
router.use("/configuration", configuration);
router.use("/register", registerRoutes);
router.use("/", loginRoutes);

export default router;
