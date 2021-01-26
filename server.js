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