import axios from "axios";
export const getArgentinaId = async (session) => {
  const url = "https://" + session.shop + "/admin/api/2023-04/countries.json";
  const headers = {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": session.accessToken,
  };
  const res = await axios.get(url, { headers: headers });
  const countries = res.data.countries;
  const arg = countries.filter((c) => c.code == "AR")[0];

  return arg.id;
};
