/* eslint-disable no-console */
import "dotenv/config";
import Knex from "knex";
import { faker } from "@faker-js/faker";
import createUsers from "./rpc-1-users";
import createCompanies from "./rpc-2-companies";
import createCountryWithExtensions from "./rpc-3-tld-with-countries";
import { populateRelation } from "./utils";

const knexRpc1 = Knex({
  client: "pg",
  connection: process.env.RPC_1_DATABASE_URL,
});

const knexRpc2 = Knex({
  client: "pg",
  connection: process.env.RPC_2_DATABASE_URL,
});

const knexRpc3 = Knex({
  client: "pg",
  connection: process.env.RPC_3_DATABASE_URL,
});

(async () => {
  try {
    console.log("Creating & seeding tables...");
    const userIds = await createUsers(knexRpc1);
    await createCompanies(knexRpc2);
    await createCountryWithExtensions(knexRpc3);
    await knexRpc2.schema.alterTable("companies", (builder) => {
      builder.integer("user_id");
    });

    await populateRelation(knexRpc2, "companies", () => {
      return {
        user_id: faker.helpers.arrayElement(userIds),
      };
    });

    console.log("Success!");
  } catch (error) {
    console.log(error);
  } finally {
    process.exit(0);
  }
})();
