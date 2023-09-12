import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

export default class Db {
  constructor() {}

  async connect() {
    try {
      const dbConfig = {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
      };
      return sql.connect(
        `Server=${dbConfig.host};Database=${dbConfig.name};User Id=${dbConfig.user};Password=${dbConfig.pass};Trusted_Connection=True;TrustServerCertificate=True;`
      );
    } catch (err) {
      console.log(err);
    }
  }

  async saveAccessToken(authorization, agreement, shop) {
    let connection = await this.connect();
    let results =
      await connection.query`SELECT * from dbo.shopify WHERE shop=${shop}`;

    if (results.recordset.length > 0) {
      return connection.query`UPDATE dbo.shopify SET access_token=${authorization}, agreement=${agreement} WHERE shop=${shop}`;
    } else {
      return connection.query`INSERT INTO dbo.shopify (access_token, agreement, shop) VALUES (${authorization}, ${agreement}, ${shop})`;
    }
  }

  async setLoginMethod(shop, loginMethod) {
    let connection = await this.connect();
    let results =
      await connection.query`SELECT login_method from dbo.shopify WHERE shop=${shop}`;

    if (results.recordset.length > 0) {
      return connection.query`UPDATE dbo.shopify SET login_method=${loginMethod} WHERE shop=${shop}`;
    } else {
      return connection.query`INSERT INTO dbo.shopify (shop, login_method) VALUES (${shop}, ${loginMethod})`;
    }
  }

  async getLoginMethod(shop) {
    let connection = await this.connect();
    let results =
      await connection.query`SELECT login_method from dbo.shopify WHERE shop=${shop}`;

    if (results.recordset.length > 0) {
      return results.recordset[0].login_method;
    } else {
      return null;
    }
  }

  async getSellerInfo(shop) {
    let connection = await this.connect();
    let results =
      await connection.query`SELECT * from dbo.shopify WHERE shop=${shop}`;
    return results.recordset;
  }

  async saveConfiguration(info) {
    let connection = await this.connect();
    let results =
      await connection.query`SELECT * from dbo.shopify WHERE shop=${info.shop}`;
    if (results.recordset.length > 0) {
      return connection.query`UPDATE dbo.shopify
              SET
                  cityName = ${info.address.cityName},
                  department = ${info.address.department},
                  floor=${info.address.floor},
                  state=${info.address.state},
                  streetName=${info.address.streetName},
                  streetNumber=${info.address.streetNumber},
                  zipCode=${info.address.zipCode},
                  businessName=${info.businessName},
                  email=${info.email},
                  cellphoneNumber=${info.cellphoneNumber},
                  phoneNumber=${info.phoneNumber},
                  shopifyToken=${info.accessToken}
              WHERE shop=${info.shop}`;
    } else {
      throw "Shop not found";
    }
  }

  async deleteToken(shop) {
    let connection = await this.connect();
    return connection.query`UPDATE dbo.shopify SET access_token = '' WHERE shop=${shop}`;
  }
}
