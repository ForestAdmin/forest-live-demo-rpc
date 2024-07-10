import 'dotenv/config';

import { createRpcDataSource } from '@forestadmin-experimental/datasource-rpc';
import { createAgent } from '@forestadmin/agent';
import type { Schema } from './typings';

(async () => {
  const agent = createAgent<Schema>({
    authSecret: process.env.PROXY_FOREST_AUTH_SECRET as string,
    envSecret: process.env.PROXY_FOREST_ENV_SECRET as string,
    isProduction: process.env.NODE_ENV === 'production',
    schemaPath: `${__dirname}/.forestadmin-schema.json`,
    typingsPath: `${__dirname}/typings.ts`,
    typingsMaxDepth: 5,
  });
  
  agent.addDataSource(createRpcDataSource({
    uri: 'http://0.0.0.0:9877',
    authSecret: process.env.RPC_1_FOREST_AUTH_SECRET as string,
    envSecret: process.env.RPC_1_FOREST_ENV_SECRET as string,
  }))
  agent.addDataSource(createRpcDataSource({
    uri: 'http://0.0.0.0:9878',
    authSecret: process.env.RPC_2_FOREST_AUTH_SECRET as string,
    envSecret: process.env.RPC_2_FOREST_ENV_SECRET as string,
  }))


  agent.customizeCollection('companies', companyBuilder => {
    companyBuilder.addManyToOneRelation('owner', 'users', {
      foreignKey: 'user_id',
    });
  });

  agent.mountOnStandaloneServer(9876);

  await agent.start();
})();