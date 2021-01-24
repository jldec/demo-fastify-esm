// minimal fastify server based on:
// https://www.fastify.io/docs/latest/Getting-Started/#your-first-server

// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
});

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

// Run the server!
fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
