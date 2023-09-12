import { Router } from "express";
import axios from "axios";
import { DeliveryMethod } from "@shopify/shopify-api";

import CAPI from "../services/CAPI.js";
import { splitAddress } from "../helpers/splitAddress.js";
import { isCAOrder } from "../services/utils.js";

const router = Router();

router.post("/order", async (req, res) => {
  let capi = new CAPI();

  if (req.body && req.headers) {
    let shop;
    if (req.headers["x-shopify-shop-domain"]) {
      shop = req.headers["x-shopify-shop-domain"];
    } else {
      shop = res.locals.shopify.session.shop;
    }

    if (Object.keys(req.body).length === 0) {
      //Empty object check
      if (req.headers["origin-page"] == "orderDetails")
        res
          .status(400)
          .json({ message: "Ocurrió un error procesando la orden" });
      return;
    }

    let shopifyOrder;
    if (req.headers["origin-page"] == "orderDetails") {
      shopifyOrder = JSON.parse(JSON.stringify(req.body));
    } else {
      shopifyOrder = JSON.parse(req.body);
    }

    if (!isCAOrder(shopifyOrder)) {
      console.log("El pedido no pertenece a CA");
      if (req.headers["origin-page"] == "orderDetails")
        res.status(400).json({ message: "El pedido no pertenece a CA" });
      return;
    }

    let mappedProducts = [];
    shopifyOrder.line_items.map((product) => {
      const mapProduct = {
        declaredValue: product.price,
        productWeight: product.grams,
        productCategory: "",
        dimensions: {
          depth: "1",
          height: "1",
          width: "1",
        },
      };
      mappedProducts.push(mapProduct);
    });

    const results = await capi.db.getSellerInfo(shop);
    if (results.length <= 0) {
      throw "Seller not found";
    }
    const info = results[0];

    const senderData = {
      address: {
        cityName: info.cityName,
        department: info.department,
        floor: info.floor,
        state: info.state,
        streetName: info.streetName,
        streetNumber: info.streetNumber,
        zipCode: info.zipCode,
      },
      areaCodeCellphone: "54",
      areaCodePhone: "54",
      businessName: info.businessName,
      cellphoneNumber: info.cellphoneNumber,
      email: info.email,
      observation: "",
      phoneNumber: info.phoneNumber,
    };

    const address = splitAddress(shopifyOrder.shipping_address.address1);
    const shippingData = {
      address: {
        cityName: shopifyOrder.shipping_address.city,
        department: shopifyOrder.shipping_address.address2,
        floor: "",
        state: shopifyOrder.shipping_address.province_code,
        streetName: address.name,
        streetNumber: address.number,
        zipCode: shopifyOrder.shipping_address.zip,
      },
      areaCodeCellphone: "",
      areaCodePhone: "",
      cellphoneNumber: shopifyOrder.customer.phone,
      email: shopifyOrder.customer.email,
      name: shopifyOrder.shipping_address.name,
      observation: "",
      phoneNumber: shopifyOrder.customer.phone,
    };

    let order = {};
    if (shopifyOrder.shipping_lines[0].code.includes("homeDelivery")) {
      order = {
        sellerId: "",
        order: {
          agencyId: "",
          deliveryType: shopifyOrder.shipping_lines[0].code,
          parcels: mappedProducts,
          shipmentClientId: "",
          serviceType: "CP",
          saleDate: shopifyOrder.created_at,
          senderData: senderData,
          shippingData: shippingData,
        },
      };
    } else if (shopifyOrder.shipping_lines[0].code.includes("agency")) {
      let shopifyOrderCode = shopifyOrder.shipping_lines[0].code;
      let [shopifyDeliveryTypeCode, agencyIdentifier] =
        shopifyOrderCode.split(" ");

      order = {
        sellerId: "",
        order: {
          agencyId: agencyIdentifier,
          deliveryType: shopifyDeliveryTypeCode,
          parcels: mappedProducts,
          shipmentClientId: "",
          serviceType: "CP",
          saleDate: shopifyOrder.created_at,
          senderData: senderData,
          shippingData: shippingData,
        },
      };
    }

    try {
      let orderResult = await capi.newOrder(
        order,
        info.access_token,
        info.agreement
      );

      let trackingNumber = orderResult.data.trackingNumber;
      const fulfillmentId = shopifyOrder.fulfillments[0].id;

      const fulfillemntUrl =
        "https://" +
        shop +
        "/admin/api/2021-07/orders/" +
        shopifyOrder.id +
        "/fulfillments/" +
        fulfillmentId +
        ".json";

      const nHeaders = {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": info.shopifyToken,
      };

      const caTrackingUrl =
        "https://www.correoargentino.com.ar/formularios/e-commerce&id=";

      const update_tracking = {
        fulfillment: {
          tracking_number: trackingNumber,
          tracking_company: "Correo Argentino",
          tracking_url: caTrackingUrl + trackingNumber,
        },
      };

      let trackingUpdateResponse = await axios.put(
        fulfillemntUrl,
        update_tracking,
        { headers: nHeaders }
      );

      if (req.headers["origin-page"] == "orderDetails")
        res.status(200).json({ status: "ok" });
    } catch (e) {
      console.log(e);
      if (e.response) {
        console.log(e.response.data);
        if (req.headers["origin-page"] == "orderDetails")
          res.status(e.response.status).json(e.response.data);
      } else {
        if (req.headers["origin-page"] == "orderDetails")
          res.status(500).json({ status: "error" });
      }
    }
  }
});

router.post("/init", async (_req, res) => {
  console.log("----------------- api/webhook/init");
  let status = 200;
  let error = null;

  try {
    const session = res.locals.shopify.session;

    await shopify.api.webhooks.addHandlers({
      ORDERS_FULFILLED: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: "/api/webhook/order",
        // callback: handleWebhookRequest,
      },
    });

    const response = await shopify.api.webhooks.register({ session: session });

    console.log("+++++++++++++++++", response);

    console.log("Success webhook/init");
  } catch (e) {
    console.log(`> Failed to process POST api/webhook/init: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

export default router;
