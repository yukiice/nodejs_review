const Koa =require('koa')
const fs = require('fs')
const app = new Koa()
function render(page){
    return new Promise((resolve,reject)=>{
        let url = `./page/${page}`
        fs.readFile(url,'binary',(err,data)=>{
            if (err) {
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

async function router(url){
    let view = "404.html"
    switch (url) {
        case '/':
            view = 'index.html'
            break;
            case '/error':
                view = 'error.html'
                break;
                case '/404':
            view = '404.html'
            break;
        default:
            break;
    }
    return await render(view)
}

app.use(async(ctx)=>{
    let url = ctx.request.url
    ctx.body =await router(url)
})

app.listen(3000)