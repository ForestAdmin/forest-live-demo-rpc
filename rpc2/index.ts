import "dotenv/config";

import { createRpcAgent } from "@forestadmin-experimental/rpc-agent";
import { createSqlDataSource } from "@forestadmin/datasource-sql";
import { Schema } from "./rpc-2-typings";

(async () => {
  const agent = createRpcAgent<Schema>({
    authSecret: process.env.PROXY_FOREST_AUTH_SECRET as string,
    // This env secret is useless and will be removed
    envSecret:
      "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    isProduction: process.env.NODE_ENV === "production",
    loggerLevel: "Info",
    typingsPath: `${__dirname}/rpc-2-typings.d.ts`,
    /* Just a trick to bypass most of the http communication with forest servers */
    forestAdminClient: null as unknown as any,
    /* Just a trick to bypass most of the sse communication with forest servers */
    instantCacheRefresh: false,
  });

  agent.addDataSource(
    createSqlDataSource(process.env.RPC_2_DATABASE_URL as string),
  );

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
      // Buggy, display a smart action form even though it shouldn't
      .addAction('Update to "approved" status', {
        scope: "Single",
        execute: async (context, resultBuilder) => {
          return resultBuilder.success('Company status updated to "approved"');
        },
      });
  });

  agent.mountOnStandaloneServer(9878);

  await agent.start();
})();
