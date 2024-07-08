// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
import { chromium } from "playwright";
import {convertToTimestamp} from "./commonFunctions.js";
import {logArticleInfo} from "./commonFunctions.js";

const sortedUrl = 'https://news.ycombinator.com/newest';
const unsortedUrl = 'https://news.ycombinator.com/front';

async function sortHackerNewsArticles(url) {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  

  // go to Hacker News
  await page.goto(url);


// Wait for articles to load
  await page.waitForSelector('.athing');


  // using the $$eval method in playwright to use the .athing selector to find articles, slicing the articles 
  //to the first 100, I map it to an array, extract the title and date, use the javascript queryselector method
  //to look for tag <a> inside all elements inside the .titleline class, I do the same thing for the .age class
  //and declare two const's to hold their values, finally I return an object for title and age which will populate 
  //the returned array for the .map method 


  const articles = await page.$$eval('.athing', articles => {
    return articles.slice(0, 100).map(article => {
      const title = article.querySelector('.titleline a').innerText;
      const age = article.nextElementSibling.querySelector('.age a').innerText;
      return { title, age };
    });
  });

  logArticleInfo(url, articles);


  // boolean value for 'sorted', running a for loop with an index which will run my 'convertToTimestamp'
  //function and increase the length of 'i' (index) by 1 until it reaches the length of the articles array(100)
  let sorted = true;
  for (let i = 0; i < articles.length - 1; i++) {
    const currentTimestamp = convertToTimestamp(articles[i].age);
    const nextTimestamp = convertToTimestamp(articles[i + 1].age);
    if (currentTimestamp < nextTimestamp) {
      sorted = false;
      break;
    }
  }
//if/else statement that checks the 'sorted' let which is limited to the block
// and logs to the console if the articles were sorted correctly or not
  if (sorted) {
    console.log('The first 100 articles are sorted from newest to oldest.');
  } else {
    console.log('The articles are not sorted correctly.');
  }
//close the browser 
  await browser.close();
}

(async () => {

  await sortHackerNewsArticles(sortedUrl); //checks articles ARE sorted


  //await sortHackerNewsArticles(unsortedUrl); //checks for a URL where articles are NOT sorted

})();
