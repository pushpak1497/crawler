import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

const isProductUrl = (url) => {
  return /\/(product|item|p|shirt)\//.test(url);
};

export const crawlDomain = async (req, res) => {
  const { domains } = req.body;
  console.log(domains)
  const result = {};

  try {
    const browser = await puppeteer.launch();
    for (const domain of domains) {
      const page = await browser.newPage();
      await page.goto(`https://${domain}`);
      const content = await page.content();
      const $ = cheerio.load(content);
  
      const productUrls = [];
      $('a').each((_, elem) => {
        const url = $(elem).attr('href');
        if (url && isProductUrl(url)) {
          productUrls.push(new URL(url, `https://${domain}`).href);
        }
      });
  
      result[domain] = [...new Set(productUrls)];
    }
    await browser.close();
  
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send({message:error?.message})
  }
};
