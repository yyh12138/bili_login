const puppeteer = require('puppeteer');
const base64Img = require('base64-img');
const imageJS = require('imagejs');

// 滑块验证
const slideVerity = async (page, rect) => {
    const fullbg = await page.$('.geetest_canvas_fullbg')
    const gapbg = await page.$('.geetest_canvas_bg')

    const content1 = await gapbg.evaluate(node => node.toDataURL("image/png"))
    const content2 = await fullbg.evaluate(node => node.toDataURL("image/png"))

    base64Img.img(content1, './', 'gapbg', function(err, filepath) {})
    base64Img.img(content2, './', 'fullbg', function(err, filepath) {})

    var gapbitmap = new imageJS.Bitmap()
    var fullbitmap = new imageJS.Bitmap()
    await gapbitmap.readFile('gapbg.png')
    await fullbitmap.readFile('fullbg.png')
    var distance = 80
    for(var i=20; i<=260; i=i+4) {
        for(var j=20; j<=160; j=j+4) {
            if(Math.abs(gapbitmap.getPixel(i, j)['r'] - fullbitmap.getPixel(i, j)['r']) > 20
            &&Math.abs(gapbitmap.getPixel(i, j)['g'] - fullbitmap.getPixel(i, j)['g']) > 20
            &&Math.abs(gapbitmap.getPixel(i, j)['b'] - fullbitmap.getPixel(i, j)['b']) > 20) {
                distance = i
            }
        }
    }
    distance = distance/1.218-30
    var temp = distance/3*2
    console.log(distance)
    if(distance>=110) {
        distance += 10
    }
    if(distance>=140) {
        distance += 10
    }
    const mouse = page.mouse
    await mouse.move(rect.x+rect.width/2, rect.y+rect.height/2)
    await mouse.down()
    await mouse.move(rect.x+rect.width/2 + temp, rect.y+rect.height/2, { steps: 20 })
    await mouse.move(rect.x+rect.width/2 + distance, rect.y+rect.height/2, { steps: 50 })
    await mouse.up()
    await page.waitFor(1000)
}

// 用户登录
const login2liveRoom = async (roomid, danmaku, username, password) => {
    const browser = await puppeteer.launch({ ignoreHTTPSErrors: true,
        headless: false,
        args: ['--ppapi-flash-args']
    })
    const page = await browser.newPage()
    await page.goto('https://passport.bilibili.com/login')
    await page.evaluate(async () => {
        Object.defineProperty(navigator, 'webdriver', {get: () => false})
    })
    await page.type('#login-username', username, { delay: 100 })
    await page.type('#login-passwd', password, { delay: 100 })
    await page.click('.btn-login')
    const slide_btn = await page.waitForSelector('.geetest_slider_button')
    const rect = await page.evaluate((slide_btn) => {
        const { x, y, width, height } = slide_btn.getBoundingClientRect()
        return { x, y, width, height }
    }, slide_btn)
    // 完整图片.geetest_canvas_fullbg 带缺口图片.geetest_canvas_bg
    await page.waitFor(1000)
    await slideVerity(page, rect)
    if(page.url()==='https://passport.bilibili.com/login') {
        await page.waitFor(1000)
        await page.waitForSelector('.geetest_panel_error_content')
        await page.click('.geetest_panel_error_content')
        await page.waitFor(1000)
        await slideVerity(page, rect)
    }
    await page.goto('https://live.bilibili.com/'+roomid)
    await page.waitForSelector('.chat-input')
    await page.type('.chat-input', danmaku, { delay: 50 })
    await page.click('.bl-button')
}
// danmaku<=25
login2liveRoom(1143095, 6, '19825005288', 'abc19991019')
// https://live.bilibili.com/1143095


