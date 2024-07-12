You'll need 3 empty databases, `rpc_1`, `rpc_2`, `rpc_3`.

The gateway behaves like a classic `agent-nodejs`, so all the agent capabilities are supported when developed directly on it.
The RPC agents also have customisations capabilities. Some aren't supported though, be they should be listed in the "Known Limitations" section.

# Install

- `cp .env.example .env` and fill in the necessary details.
- `yarn` to install.
- `yarn seed` to seed the database with dummy data.
- `yarn watch:rpc1` to start RPC Agent 1 (Containing the user collection)
- `yarn watch:rpc2` to start RPC Agent 2 (Containing the company collection)
- `yarn watch:rpc3` to start RPC Agent 2 (Containing the Country with extension collection)
- `yarn watch:gateway` to start the Gateway (That'll contain both RPC Agent 1 & RPC Agent 2 data)

# Technical details

## RPC DataSource

The RPC data source allows get and proxify data from a RPC agent.

# Installation

- install the package `@forestadmin-experimental/datasource-rpc`.
- give the URI, FOREST_ENV_SECRET & FOREST_AUTH_SECRET

```javascript
const { createAgent } = require('@forestadmin/agent');
const { createRpcDataSource } = require('@forestadmin-experimental/datasource-rpc');

const agent = createAgent(options).addDataSource(
  createRpcDataSource({
    uri: 'http://localhost:3352',
    authSecret: process.env.FOREST_AUTH_SECRET,
  }),
);
```

## RPC Agent

The RPC agent is created to split your data into microservice, combined with a real agent and a RPC data source,
you wil be able to acces all your collection as this is a normal agent.

# Installation

- install the package `@forestadmin-experimental/rpc-agent`.
- give options like a real agent.

```javascript
const { createRpcAgent } = require('@forestadmin-experimental/rpc-agent');

const agent = createRpcAgent({
  authSecret: process.env.FOREST_AUTH_SECRET,
  isProduction: process.env.NODE_ENV === 'production',
  loggerLevel: 'Info',
});
// use the agent like a real one.
```

# Known limitations

- The RPC agent are not able to communicate with each other. They can only communicate with the Gateway.
- Using files (Upload or download) on RPC Agents aren't supported yet.
- If a RPC agent cannot start, the gateway won't start as well.

