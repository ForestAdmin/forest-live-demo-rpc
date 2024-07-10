import "dotenv/config";

import { createRpcDataSource } from "@forestadmin-experimental/datasource-rpc";
import { createAgent } from "@forestadmin/agent";
import type { Schema } from "./typings";

(async () => {
  // Using the same auth secret is kind of a hack to make the agent work currently.
  // this will need refactor, as the rpc agent are able to return data only based on
  // the signed token, and doesn't check permissions.
  const agent = createAgent<Schema>({
    authSecret: process.env.PROXY_FOREST_AUTH_SECRET as string,
    envSecret: process.env.PROXY_FOREST_ENV_SECRET as string,
    isProduction: process.env.NODE_ENV === "production",
    schemaPath: `${__dirname}/.forestadmin-schema.json`,
    typingsPath: `${__dirname}/typings.d.ts`,
    typingsMaxDepth: 5,
  });

  /* Currently the authentication process requires the same secret to ensure 
  that the agent can communicate with the proxy. The whole authentication is based on this */
  agent.addDataSource(
    createRpcDataSource({
      uri: process.env.RPC_1_URL as string,
      authSecret: process.env.PROXY_FOREST_AUTH_SECRET as string,
      envSecret:
        "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    }),
  );
  agent.addDataSource(
    createRpcDataSource({
      uri: process.env.RPC_2_URL as string,
      authSecret: process.env.PROXY_FOREST_AUTH_SECRET as string,
      envSecret:
        "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    }),
  );
  agent.addDataSource(
    createRpcDataSource({
      uri: "",
      authSecret: process.env.PROXY_FOREST_AUTH_SECRET as string,
      envSecret:
        "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    }),
  );
  // RPC API Charts won't work in the current version of the agent.
  // This will most likely need more work to be supported.

  // Proxy charts are ok though, and can use the Query Interface to get the data
  agent.addChart("companiesCount", async (context, builder) => {
    const [aggregationResult] = await context.dataSource
      .getCollection("companies")
      .aggregate({}, { operation: "Count" });
    return builder.value(Number(aggregationResult.value));
  });

  agent.customizeCollection("companies", (companyBuilder) => {
    companyBuilder.addManyToOneRelation("owner", "users", {
      foreignKey: "user_id",
    });
  });

  agent.mountOnStandaloneServer(9876);

  await agent.start();
})();
