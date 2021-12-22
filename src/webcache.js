import Koa from 'koa';
import path from 'path';
import resource from 'koa-static';
import conditional from 'koa-conditional-get';
import etag from 'koa-etag';

const app = new Koa();
const hostName = 'localhost';
const port = 3600;

app.use(async (ctx, next) => {
  ctx.set({
    // 'Cache-Control': 'no-cache'
    'Cache-Control': 'max-age=30'
  });

  // ctx.set({
  //   'last-Modified': new Date(Date.now() + 10 * 1000).toUTCString()
  // });

  // ctx.set({
  //   expires: new Date(Date.now() + 30 * 1000).toGMTString()
  // });

  await next();
});
app.use(conditional());
// app.use(etag());

app.use(resource(path.join(__dirname, './static')));

app.listen(port, () => {
  console.log(`server is start on ${hostName}:${port}`);
});
