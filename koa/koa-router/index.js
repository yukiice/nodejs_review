const koa = require("koa");
const Router = require("koa-router");
const app = new koa();

const routerOne = new Router();
routerOne.get("/", async (ctx) => {
  ctx.body = "Hello World";
});

const routerTwo = new Router();
routerTwo
  .get("/404", async (ctx) => {
    ctx.body = "Page not founds";
  })
  .get("/500", async (ctx) => {
    ctx.body = "Internal server error";
  });

const router = new Router();
router.use("/", routerOne.routes(), routerOne.allowedMethods());
router.use("/error", routerTwo.routes(), routerTwo.allowedMethods());
 
// 加载中间件
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
