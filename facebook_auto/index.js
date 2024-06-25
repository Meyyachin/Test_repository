const puppeteer = require("puppeteer");
const userinfo = require("./config");
const autoSingUp = async () => {
    try {
        console.log("Auto Sign up...");
        const browser = await puppeteer.connect({
            browserURL: "http://localhost:9222/"
        });
        const page = await browser.newPage();

        //     await page.goto(req.body.url, { waitUntil: "domcontentloaded" });
        //     const productResult = await getData(page);
        //     res.status(200).json({ product: productResult });
    } catch (error) {
        console.log(error.message);
    }
}

autoSingUp();