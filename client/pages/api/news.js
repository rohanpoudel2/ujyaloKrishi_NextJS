import puppeteer from 'puppeteer';

export default async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36');

  await page.goto('https://halokhabar.com/content/1/News');

  const data = await page.evaluate(() => {
    const newsList = document.querySelectorAll('.md-newsbox');
    const data = [];

    newsList.forEach((news) => {
      const title = news.querySelector('.md-detail h3').textContent;
      const link = news.querySelector('.md-detail h3 a').href;
      const image = news.querySelector('.md-newsbox figure img');
      const lazySrc = image.getAttribute('src');

      data.push({ title, link, image: lazySrc });
    });

    return data;
  });

  await browser.close();

  res.status(200).json(data);
};