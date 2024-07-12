import "dotenv/config";

import { createRpcAgent } from "@forestadmin-experimental/rpc-agent";
import { createSqlDataSource } from "@forestadmin/datasource-sql";
import { Schema } from "./rpc-3-typings";

(async () => {
  const agent = createRpcAgent<Schema>({
    authSecret: process.env.RPC_3_AUTH_SECRET as string,
    isProduction: process.env.NODE_ENV === "production",
    loggerLevel: "Info",
    typingsPath: `${__dirname}/rpc-3-typings.d.ts`,
  });

  agent.addDataSource(
    createSqlDataSource(process.env.RPC_3_DATABASE_URL as string),
  );

  agent.mountOnStandaloneServer(9879);

  await agent.start();
})();
