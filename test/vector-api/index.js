
// 引入 satellite.js
const satellite = require('satellite.js');
const positions = [];
function GetLngLat(){
    const startTime = new Date(2024, 4, 15, 9, 0, 0);
    const endTime = new Date(2024, 4, 15, 15, 0, 0);
    const tleLine = ['OBJECT C                ', '1 57582U 23117C   24085.90772687  .00014753  00000+0  80300-3 0  9999', '2 57582  97.4927 159.1667 0010629 217.2524 142.7971 15.14493595 34579']
    const step = 60
    const satrec = satellite.twoline2satrec(tleLine[1], tleLine[2]);
    // 计算步数
    let steps = Math.ceil((endTime.getTime() - startTime.getTime()) / (step * 1000));
    // 存储每一步的卫星坐标
    steps = steps > 0 ? steps : 1;
    for (let i = 0; i < steps; i++) {
        // 计算当前步的时间
        const time = new Date(startTime.getTime() + i * step * 1000);
        // 计算卫星位置
        const positionAndVelocity = satellite.propagate(satrec, time);
        const positionEci = positionAndVelocity.position;
        // 将 ECI 坐标转换为地理坐标
        const gmst = satellite.gstime(time);
        // @ts-ignore
        const positionGd = satellite.eciToGeodetic(positionEci, gmst);
        const longitude = satellite.degreesLong(positionGd.longitude);
        const latitude = satellite.degreesLat(positionGd.latitude);
        // 添加到结果数
        positions.push(longitude, latitude);
    }
    console.log(positions)
}

GetLngLat()