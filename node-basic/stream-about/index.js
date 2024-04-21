const fs = require('fs');

const read = fs.createReadStream('./text.txt',{flags:"r"},{
    start: 0,
    end: 10,
    encoding: 'utf8',
    highWaterMark: 1
});
console.log(read);

// 数据读取过程的监听
read.on('data', (chunk) => {
    console.log(chunk,'chunk');
    read.pause();
    console.log('暂停读取');
    // 1s后继续读取
    setTimeout(() => {
        read.resume();
        console.log('继续读取');
    }, 1000);
})

// 数据读取完成的监听
read.on('end', () => {
    console.log('数据读取完成');
})

// 数据读取错误的监听
read.on('error', (err) => {
    console.log(err);
})