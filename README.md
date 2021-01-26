# demo-fastify-esm

Minimal fastify server to demonstrate async module loading using [dynamic import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports).

The [shortscale](https://github.com/jldec/shortscale) module was originally published using CommonJS for v1. Since v2, the module is available only as an ESM module. This means that it can no longer be loaded using Node.js `require()`.

The server.js code below loads both CJS and the ESM versions. Aliases for each are declared in package.json.

```js
// minimal fastify server based on:
// https://www.fastify.io/docs/latest/Getting-Started/#your-first-server

const fastify = require('fastify')({ logger: true });

fastify.register(async (fastify) => {
  let shortscale_v1 = require('shortscale-v1');
  let shortscale_v4 = (await import('shortscale-v4')).default;

  // e.g. http://localhost:3000/shortscale-v1?n=47
  fastify.get('/shortscale-v1', function (req, res) {
    let num = Number(req.query.n);
    let str = '' + shortscale_v1(num);
    res.send({num, str});
  });

  // e.g. http://localhost:3000/shortscale-v4?n=47
  fastify.get('/shortscale-v4', function (req, res) {
    let num = Number(req.query.n);
    let str = '' + shortscale_v4(num);
    res.send({num, str});
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