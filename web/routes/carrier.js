import { Router } from "express";
import axios from "axios";
import CAPI from "../services/CAPI.js";

const router = Router();

router.post("/", async (_req, res) => {
  console.log("----------------- api/carrier");
  let status = 200;
  let error = null;

  try {
    const currentSession = res.locals.shopify.session;

    const carrierName = "Correo Argentino";

    const url =
      "https://" +
      currentSession.shop +
      "/admin/api/2023-07/carrier_services.json";

    const body = {
      carrier_service: {
        name: carrierName,
        callback_url: process.env.HOST + "/api/carrier/callback",
        service_discovery: true,
      },
    };

    const headers = {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": currentSession.accessToken,
    };

    const newCarrier = () => {
      return axios.post(url, body, { headers: headers });
    };

    const getCarriers = () => {
      return axios.get(url, { headers: headers });
    };

    const updateCarrier = (id) => {
      const newUrl =
        "https://" +
        currentSession.shop +
        "/admin/api/2021-07/carrier_services/" +
        id +
        ".json";
      const updatedBody = {
        carrier_service: {
          id: id,
          ...body.carrier_service,
        },
      };
      return axios.put(newUrl, updatedBody, { headers: headers });
    };

    const deleteCarrier = (id) => {
      return axios.delete(
        "https://" +
          currentSession.shop +
          "/admin/api/2023-07/carrier_services/" +
          id +
          ".json",
        { headers: headers }
      );
    };

    let info;
    let message = "";

    const response = await getCarriers();
    const carriers = response.data.carrier_services;
    console.log("--------> carriers: ", carriers);
    try {
      if (carriers.map((c) => c.name).includes(carrierName)) {
        //CA is already a carrier
        const CAid = carriers.filter((c) => c.name == carrierName)[0].id;
        info = await updateCarrier(CAid);
        message = "Carrier updated";
      } else {
        info = await newCarrier();
        message = "Carrier created";
      }
    } catch (er) {
      console.log(er);
      error = er.message;
    }
    console.log("############# message:", message);
    console.log("Success api/carrier");
  } catch (e) {
    console.log(`> Failed to process POST api/carrier: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

router.post("/callback", async (_req, res) => {
  console.log("----------------- api/carrier/callback");
  let status = 200;
  let error = null;
  let rates = [];
  try {
    let zipCode = _req.body.rate.destination.postal_code;
    let stateId = _req.body.rate.destination.province;
    let capi = new CAPI();

    const shop = _req.headers["x-shopify-shop-domain"];
    const results = await capi.db.getSellerInfo(shop);
    if (results.length <= 0) {
      throw "Seller not found";
    }

    const info = results[0];

    const resp = await capi.getAgencies(
      info.access_token,
      info.agreement,
      stateId
    );
    const agencies = resp.data;

    let filteredAgencies = agencies.filter((a) =>
      a.location.zip_code.includes(zipCode)
    );

    rates = [
      {
        service_name: "Envío a domicilio",
        description: "Correo Argentino - Entrega en domicilio",
        service_code: "homeDelivery",
        currency: "ARS",
        total_price: "000",
      },
    ];

    filteredAgencies.map((agency) => {
      let rate = {
        service_name: "Envío a sucursal " + agency.agency_name,
        description: `Correo Argentino Sucursal ${agency.location.neighborhood_name}\n${agency.location.street_name} ${agency.location.street_number}`,
        service_code: "agency " + agency.agency_id,
        currency: "ARS",
        total_price: "000",
      };
      rates.push(rate);
    });

    console.log("Success api/carrier/callback");
  } catch (e) {
    console.log(`> Failed to process POST api/carrier/callback: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error, rates });
});

export default router;
