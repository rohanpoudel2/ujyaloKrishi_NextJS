import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36');
  await page.goto('https://ramropatro.com/vegetable');
  await page.waitForSelector('.features-inner');

  const data = await page.evaluate(() => {
    const rows = document.querySelectorAll('table tr');
    const rowData = [];

    for (const row of rows) {
      const cols = row.querySelectorAll('td');
      const colData = [];

      for (const col of cols) {
        colData.push(col.innerText.trim());
      }

      rowData.push(colData);
    }

    return rowData;
  });

  await browser.close();

  res.status(200).json(data);
}