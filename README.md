# demo-fastify-esm

Minimal fastify server to demonstrate async module loading using [dynamic import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports).

The [shortscale](https://github.com/jldec/shortscale) module was originally published using CommonJS for v1, but since v2 and v3 is is available only as an ESM module. This means that it cannot be loaded using Node.js require().

By leveraging `fastify.register`, and it is simple to load a mix of CJS or ESM modules with dynamic import().

```js
fastify.register(async (fastify) => {
  let shortscale_v1 = (await import('shortscale-v1')).default;
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
```