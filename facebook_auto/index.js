const puppeteer = require('puppeteer');
const fs = require('fs');

async function autoSignUp() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // Navigate to Facebook sign-up page
  await page.goto('https://www.facebook.com/signup');
  // Fill the sign-up form
  await page.type('#u_0_n', 'FirstName'); // First Name
  await page.type('#u_0_p', 'LastName');  // Last Name
  await page.type('#u_0_s', 'email@example.com'); // Email
  await page.type('#u_0_v', 'email@example.com'); // Re-enter Email
  await page.type('#u_0_x', 'Password123'); // Password
  // Select birthday
  await page.select('#day', '15');
  await page.select('#month', '6');
  await page.select('#year', '1990');
  // Select gender
  await page.click('#u_0_6'); // Male, for example
  // Submit the form
  await page.click('#u_0_13');
  // Wait for navigation after submitting form
  await page.waitForNavigation();
  // Assuming sign-up is successful, navigate to profile page
  await page.goto('https://www.facebook.com/me');
  // Wait for profile elements to load
  await page.waitForSelector('img[alt="Profile picture"]', { visible: true });
  // Get profile details
  const profileDetails = await page.evaluate(() => {
    const avatar = document.querySelector('img[alt="Profile picture"]').src;
    const name = document.querySelector('span[id^="u_0_"]').innerText;
    const fbId = document.querySelector('a[href^="/me"]').href.split('?id=')[1];
    return { avatar, name, fbId };
  });
  // Print and save profile details
  console.log(profileDetails);
  fs.writeFileSync('profileDetails.json', JSON.stringify(profileDetails, null, 2));
  // Close the browser
  await browser.close();
}

autoSignUp();