const puppeteer = require('puppeteer');
const fs = require('fs');
const userinfo = require('./config');
async function autoSignUpGetInfo() {
    try{
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://inner.arkaroam.com/register');
        await page.type('#username', userinfo.fullname); // First Name
        await page.type('#email', userinfo.email);  // Last Name
        await page.type('#password', userinfo.password); // Email
        await page.click('#btn_submit');
        await page.waitForNavigation();

        await page.goto("https://inner.arkaroam.com/login");
        await page.type('#email', userinfo.email);  // Last Name
        await page.type('#password', userinfo.password); // Email
        await page.click('#btn_login');
        await page.waitForNavigation();

        await page.goto("https://inner.arkaroam.com/account");
        await page.waitForSelector('img[alt="Avatar"]', { visible: true });
        // Get profile details
        const profileDetails = await page.evaluate(() => {
            const avatar = document.querySelector('img[alt="Avatar"]').src;
            const name = document.querySelector('h5[id^="user"]').innerText;
            return { avatar, name };
        });
        // Print and save profile details
        console.log(profileDetails);

        fs.writeFileSync('profileDetails.json', JSON.stringify(profileDetails, null, 2));
        // Close the browser
        await browser.close();
    }catch(e){
        console.log(error.message);
    }
}

autoSignUpGetInfo();