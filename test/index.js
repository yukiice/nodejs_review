const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const cors = require('koa2-cors');
const app = new Koa();
app.use(cors());
const router = new Router();

router.get('/geojson', async (ctx) => {
  console.log(ctx)
  const filePath = path.join(__dirname, './test01.geojson'); // 替换为你的geojson文件路径
  const data = fs.readFileSync(filePath, 'utf8');
  ctx.body = JSON.parse(data);
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log('Server is running at http://localhost:4000');
});