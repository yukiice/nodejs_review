const { log } = require("console");

// 创建一个长度为10 且用0填充的Buffer
const buf1 = Buffer.alloc(10);
console.log(buf1);

// 创建一个长度为 10、且未初始化的 Buffer。
// 这比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 需要使用 fill() 或 write() 重写。
const buf2 = Buffer.allocUnsafe(10);

console.log(buf2)



// 写入buffer的实例

const buf3 =  Buffer.alloc(123)
const newBuf = buf3.write('hello world')
console.log('写入的字节数',newBuf)


// 从buffer中读取数据
const buf4 = Buffer.from('Hello Buffer');
console.log(buf4.toString());

// 合并buffer
const buffer1 = Buffer.from('Hello ');
const buffer2 = Buffer.from('Buffer');
const buffer3 = Buffer.concat([buffer1,buffer2]);

console.log("buffer3 内容: " + buffer3.toString());

// 比较buffer

const buffer4 = Buffer.from('ABC');
const buffer5 = Buffer.from('ABCD');
const result = buffer1.compare(buffer2);

if(result < 0) {
   console.log(buffer4 + " 在 " + buffer5 + "之前");
}else if(result == 0){
   console.log(buffer4 + " 与 " + buffer5 + "相同");
}else {
   console.log(buffer4 + " 在 " + buffer5 + "之后");
}