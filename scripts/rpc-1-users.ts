import { faker } from "@faker-js/faker";
import { Knex } from "knex";

import { populate } from "./utils";

export const USER_STATUSES = [
  "signed_up",
  "waiting_for_legal_doc",
  "approved",
  "rejected",
  "require_further_verification",
];

export default async function populateUsers(client: Knex): Promise<number[]> {
  const tableName = "users";

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);
  await client.raw(`DROP TYPE IF EXISTS "user_status"`);

  await client.schema.createTable(tableName, (table) => {
    table.increments("id").primary();
    table.date("signup_date");
    table.string("fullname");
    table.string("iban");
    table.string("address");
    table.string("email").notNullable();
    table.string("phone_number");
    table
      .enum("status", USER_STATUSES, {
        useNative: true,
        enumName: "user_status",
      })
      .defaultTo("signed_up");
    table.boolean("is_blacklisted");
  });

  return populate(client, tableName, 5000, () => ({
    signup_date: faker.date.past(),
    fullname: `${faker.person.firstName()} ${faker.person.lastName()}`,
    iban: faker.finance.iban(),
    address: `${faker.location.streetAddress()} ${faker.location.city()} ${faker.location.country()}`,
    email: faker.internet.email(),
    phone_number: faker.phone.number(),
    status: faker.helpers.arrayElement(USER_STATUSES),
    is_blacklisted: Math.random() > 0.95,
  }));
}
