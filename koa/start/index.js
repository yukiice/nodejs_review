const koa  = require('koa');
const generator = require('./middleware/generator');
const app = new koa();
app.use(generator())
app.use(async (ctx) => {
    ctx.body = 'Hello World';
});
app.listen(3000,()=>{
    console.log('Server is running at http://localhost:3000')
})