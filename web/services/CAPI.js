import axios from "axios";
import dotenv from "dotenv";
import DbService from "./db.js";

dotenv.config();

export default class CAPI {
  constructor(baseURL) {
    this.baseURL = process.env.CAPI_URL;
    this.db = new DbService();
  }

  async login(agreement, authorization, shop) {
    const url = this.baseURL + "/paqar/v1/auth";
    let res = await axios.get(url, {
      headers: {
        authorization: `Apikey ${authorization}`,
        agreement: agreement,
      },
    });
    if (res.status === 204) {
      let response = await this.db.saveAccessToken(
        authorization,
        agreement,
        shop
      );
      return res;
    } else {
      return res;
    }
  }

  async loginMiCorreo(user, password) {
    const url = this.baseURL + "/micorreo/v1/token";

    let res = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: "Basic " + btoa(`${user}:${password}`),
        },
      }
    );

    if (res.status === 204) {
      await this.db.saveAccessToken(user, password, shop);
      return res;
    } else {
      return res;
    }
  }

  async register(body, token) {
    const url = this.baseURL + "/micorreo/v1/register";

    try {
      let response = await axios.post(url, body, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }, 
      });
      return {
        data: response.data,
        status: response.status,
        message: response.data?.message || response.statusText,
      };
    } catch (error) {
      return {
        data: error.response.data,
        status: error.response.data.code,
        message: error.response.data.message,
      };
    }
  }

  async getLoginMethod(shop) {
    return await this.db.getLoginMethod(shop);
  }

  async setLoginMethod(shop, loginMethod) {
    return await this.db.setLoginMethod(shop, loginMethod);
  }

  async verifyUser(shop) {
    let info = await this.getSellerInfo(shop);
    return { loggedIn: !!info.access_token };
  }

  async getSellerInfo(shop) {
    try {
      let res = await this.db.getSellerInfo(shop);
      return { status: "OK", ...res[0] };
    } catch (e) {
      return { status: "error" };
    }
  }

  async saveSellerInfo(data, shop) {
    try {
      let res = await this.db.saveConfiguration({ ...data, shop });
      return { status: "OK", ...res };
    } catch (e) {
      return { status: "error" };
    }
  }

  async deleteToken(shop) {
    try {
      let response = await this.db.deleteToken(shop);
      return { status: "OK", ...response };
    } catch (e) {
      return { status: "error" };
    }
  }

  async newOrder(order, authorization, agreement) {
    const headers = {
      Authorization: `Apikey ${authorization}`,
      agreement: agreement,
    };
    const url = this.baseURL + "/v1/orders";
    return axios.post(url, order, { headers: headers });
  }

  async getAgencies(authorization, agreement, stateId) {
    const url =
      this.baseURL + `/v1/agencies?stateId=${stateId}&pickup_availability=true`;
    const headers = {
      Authorization: `Apikey ${authorization}`,
      agreement: agreement,
    };
    console.log(headers.agreement);
    return axios.get(url, { headers: headers });
  }
}
