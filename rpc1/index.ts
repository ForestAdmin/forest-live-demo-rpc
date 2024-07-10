import 'dotenv/config';

import { createRpcAgent } from '@forestadmin-experimental/rpc-agent';
import { createSqlDataSource } from '@forestadmin/datasource-sql';

import type { Schema } from './rpc-1-typings';

(async () => {
  const agent = createRpcAgent<Schema>({
    authSecret: process.env.RPC_1_FOREST_AUTH_SECRET as string,
    // This env secret is useless and will be removed
    envSecret: "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    isProduction: process.env.NODE_ENV === 'production',
    loggerLevel: 'Info',
    typingsPath: `${__dirname}/rpc-1-typings.d.ts`,
    /* Just a trick to bypass most of the http communication with forest servers */
    forestAdminClient: null as unknown as any, 
    /* Just a trick to bypass most of the sse communication with forest servers */
    instantCacheRefresh: false,
  });

  agent.addDataSource(createSqlDataSource(process.env.RPC_1_DATABASE_URL as string));

  agent.customizeCollection('users', userBuilder => {
    userBuilder
      .addField('splittedName', {
        columnType: 'String',
        dependencies: ['fullname'],
        getValues: (records) => {
          return records.map(record => record?.fullname?.split(' '));
        },
      })
      .addField('firstName', {
        columnType: 'String',
        dependencies: ['splittedName'],
        getValues: (records) => {
          return records.map(record => (record?.splittedName || [])[0]);
        },
      })
      .addField('lastName', {
        columnType: 'String',
        dependencies: ['splittedName'],
        getValues: (records) => {
          return records.map(record => (record?.splittedName || [])[1]);
        },
      })
      .removeField('splittedName')
      .removeField('fullname');
  });

  agent.mountOnStandaloneServer(9877);

  await agent.start();
})();
