import "dotenv/config";

import { createRpcAgent } from "@forestadmin-experimental/rpc-agent";
import { createRpcDataSource } from "@forestadmin-experimental/datasource-rpc";
import { createSqlDataSource } from "@forestadmin/datasource-sql";
import { Schema } from "./rpc-2-typings";

(async () => {
  const agent = createRpcAgent<Schema>({
    authSecret: process.env.RPC_2_AUTH_SECRET as string,
    isProduction: process.env.NODE_ENV === "production",
    loggerLevel: "Info",
    typingsPath: `${__dirname}/rpc-2-typings.d.ts`,
  });

  agent.addDataSource(
    createSqlDataSource(process.env.RPC_2_DATABASE_URL as string),
  );

  agent.addDataSource(
    createRpcDataSource({
      uri: process.env.RPC_3_URL as string,
      authSecret: process.env.RPC_3_AUTH_SECRET as string,
    }),
  );

  // Smart actions doesn't support file download on the RPC agent.
  agent.customizeCollection("companies", (companyBuilder) => {
    companyBuilder
      .addAction('Update to "rejected" status', {
        scope: "Single",
        form: [
          {
            label: "Note",
            type: "String",
          },
        ],
        execute: async (context, resultBuilder) => {
          await context.collection.update(context.filter, {
            status: "rejected",
          });
          return resultBuilder.success('Company status updated to "rejected"');
        },
      })
      .addAction('Update to "approved" status', {
        scope: "Single",
        execute: async (context, resultBuilder) => {
          return resultBuilder.success('Company status updated to "approved"');
        },
      })
      .addField("urlExtension", {
        columnType: "String",
        dependencies: ["url"],
        getValues: (records) => {
          return records.map((record) => {
            return `.${/https?:\/\/.*\.(\w*)/.exec(record?.url || "")?.[1]}`;
          });
        },
      })
      .emulateFieldFiltering("urlExtension")
      .addManyToOneRelation("potentialCountry", "countries_with_extension", {
        foreignKey: "urlExtension",
      });
  });

  agent.addChart("companiesCount", async (context, builder) => {
    const [aggregationResult] = await context.dataSource
      .getCollection("companies")
      .aggregate({}, { operation: "Count" });
    return builder.value(Number(aggregationResult.value));
  });

  agent.mountOnStandaloneServer(9878);

  await agent.start();
})();
