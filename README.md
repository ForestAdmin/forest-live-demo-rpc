You'll need 2 empty databases, `rpc_1` & `rpc_2`.

`cp .env.example .env` and fill in the necessary details.

`yarn` to install.
`yarn seed` to seed the database with dummy data.
`yarn watch:rpc1` to start RPC Agent 1 (Containing the user collection)
`yarn watch:rpc2` to start RPC Agent 1 (Containing the company collection)
`yarn watch:proxy` to start the Gateway (That'll contain both RPC Agent 1 & RPC Agent 2 data)
