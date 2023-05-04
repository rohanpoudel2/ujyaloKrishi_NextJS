import puppeteer from 'puppeteer';
import cache from '../../utils/cache';

export default async function handler(req, res) {
  const cachedData = cache.get('marketData');
  const isFresh = cachedData && (Date.now() - cachedData.timestamp) < 3600000;

  if (isFresh) {
    console.log('Serving from cache...');
    return res.status(200).json(cachedData.data);
  }

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

  cache.set('marketData', { data, timestamp: Date.now() });

  res.status(200).json(data);
}
