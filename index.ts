import "dotenv/config";

import { createRpcDataSource } from "@forestadmin-experimental/datasource-rpc";
import { createAgent } from "@forestadmin/agent";
import type { Schema } from "./typings";

(async () => {
  const agent = createAgent<Schema>({
    authSecret: process.env.GATEWAY_FOREST_AUTH_SECRET as string,
    envSecret: process.env.GATEWAY_FOREST_ENV_SECRET as string,
    isProduction: process.env.NODE_ENV === "production",
    schemaPath: `${__dirname}/.forestadmin-schema.json`,
    typingsPath: `${__dirname}/typings.d.ts`,
    typingsMaxDepth: 5,
  });

  agent
    .addDataSource(
      createRpcDataSource({
        uri: process.env.RPC_1_URL as string,
        authSecret: process.env.RPC_1_AUTH_SECRET as string,
      }),
    )
    .addDataSource(
      createRpcDataSource({
        uri: process.env.RPC_2_URL as string,
        authSecret: process.env.RPC_2_AUTH_SECRET as string,
      }),
    );

  agent.customizeCollection("companies", (companyBuilder) => {
    companyBuilder.addManyToOneRelation("owner", "users", {
      foreignKey: "user_id",
    });
  });

  agent.mountOnStandaloneServer(9876);

  await agent.start();
})();
