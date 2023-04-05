import puppeteer from 'puppeteer';

export default async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto('https://krishidaily.com/category/news/');

  const data = await page.evaluate(() => {
    const newsList = document.querySelectorAll('.td_module_2');
    const data = [];

    newsList.forEach((news) => {
      const title = news.querySelector('.td-module-title').textContent;
      const link = news.querySelector('.td-module-title a').href;
      const image = news.querySelector('.td-image-wrap img');
      const lazySrc = image.getAttribute('data-img-url');

      data.push({ title, link, image: lazySrc });
    });

    return data;
  });

  await browser.close();

  res.status(200).json(data);
};

