import { faker } from "@faker-js/faker";
import { Knex } from "knex";

import { populate } from "./utils";

export const COMPANY_STATUSES = [
  "created",
  "waiting_for_legal_doc",
  "approved",
  "rejected",
  "require_further_verification",
];

export default async function populateCompanies(
  client: Knex,
): Promise<number[]> {
  const tableName = "companies";

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);
  await client.raw(`DROP TYPE IF EXISTS "company_status"`);

  await client.schema.createTable(tableName, (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("iban");
    table.string("url");
    table.string("headquarter");
    table
      .enum("status", COMPANY_STATUSES, {
        useNative: true,
        enumName: "company_status",
      })
      .defaultTo("created");
  });

  return populate(client, tableName, 250, () => ({
    name: faker.company.name(),
    iban: faker.finance.iban(),
    headquarter: `${faker.location.streetAddress()} ${faker.location.city()} ${faker.location.country()}`,
    url: `https://${faker.internet.domainWord()}.${faker.helpers.arrayElement(["fr", "vn", "com", "nl", "al", "co.uk", "be"])}`,
    status: faker.helpers.arrayElement(COMPANY_STATUSES),
  }));
}
