import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

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