# demo-fastify-esm

Minimal fastify server to demonstrate async module loading using [dynamic import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports).

The [shortscale](https://github.com/jldec/shortscale) module was originally published using CommonJS for v1. Since v2, the module is available only as an ESM module. This means that it can no longer be loaded using Node.js `require()`.

The server.js code below loads both CJS and the ESM versions. Aliases for each are declared in package.json.

```js
// minimal fastify server based on:
// https://www.fastify.io/docs/latest/Getting-Started/#your-first-server

// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
});

fastify.register(async (fastify) => {
  let shortscale_v1 = require('shortscale-v1');
  let shortscale_v3 = (await import('shortscale-v3')).default;

  fastify.get('/shortscale-v1', function (req, res) {
    let n = Number(req.query.n);
    res.send(`${n} in words (v1): ${shortscale_v1(n)}\n`);
  });

  fastify.get('/shortscale-v3', function (req, res) {
    let n = Number(req.query.n);
    res.send(`${n} in words (v3): ${shortscale_v3(n)}\n`);
  });
});

// Run the server!
fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
```