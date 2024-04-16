const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);

const agents = [
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36',
    // ...其他的user agents
];

let requestCount = 0;

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function deg2num(lat_deg, lon_deg, zoom) {
    const lat_rad = degreesToRadians(lat_deg);
    const n = 2.0 ** zoom;
    const xtile = parseInt((lon_deg + 180.0) / 360.0 * n);
    const ytile = parseInt((1.0 - Math.log(Math.tan(lat_rad) + (1 / Math.cos(lat_rad))) / Math.PI) / 2.0 * n);
    return { xtile, ytile };
}

async function getimg(Tpath, Spath, x, y) {
    if (requestCount >= 10000) {
        console.log('Reached request limit for this minute');
        return;
    }

    try {
        const response = await axios.get(Tpath, {
            headers: { 'User-Agent': agents[Math.floor(Math.random() * agents.length)] },
            responseType: 'arraybuffer'
        });
        await writeFile(Spath, response.data);
        console.log(`${x}_${y} ok`);
        requestCount++;
    } catch (error) {
        console.log(`${x}_${y} error`);
    }
}

const zoom = 17;
const lefttop = deg2num(39.7486, 118.0085, zoom); // 左上角的经纬度
const rightbottom = deg2num(39.4910, 118.3808, zoom);

const rootDir = "E:\\mapbox\\";

let promises = [];

for (let x = lefttop.xtile; x < rightbottom.xtile; x++) {
    for (let y = lefttop.ytile; y < rightbottom.ytile; y++) {
        const tilepath = `https://api.mapbox.com/v4/mapbox.satellite/${zoom}/${x}/${y}.webp?sku=101PEtcd8P5ef&access_token=pk.eyJ1IjoiaGFpa2UiLCJhIjoiY2xsMGdyM2hnMDZqMDNrbXlxeXhpaGpoeiJ9.oO9ye-mco6uh_ditWQKBMw`;
        const dir = path.join(rootDir, String(zoom), String(x));
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        promises.push(getimg(tilepath, path.join(dir, `${y}.png`), x, y));
    }
}

Promise.all(promises)
    .then(() => {
        console.log('all ok');
    })
    .catch((error) => {
        console.error('Error:', error);
    });

// Reset requestCount every minute
setInterval(() => {
    requestCount = 0;
}, 60 * 1000);