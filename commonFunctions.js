  // uses the 'age' parameter from the previous function as a string and stores the numbered value as value 
  //and the unit of time as unit(minute,hour etc), uses the Date constructor JS method, we check for singular
  //and plural Units (e.g minute&minutes) and multiply accordingly depending on the Unit type.
  //note i'm using UNIX timestamp info instead of actual dates/time, it's much easier to sort which article is newer


  export function convertToTimestamp(age) {
    const [value, unit] = age.split(' ');
    const currentTime = new Date().getTime();
    if (unit.startsWith('minute')) {
      return currentTime - (value * 60 * 1000);
    } else if (unit.startsWith('hour')) {
      return currentTime - (value * 60 * 60 * 1000);
    } else if (unit.startsWith('day')) {
      return currentTime - (value * 24 * 60 * 60 * 1000);
    } else {
      return currentTime;
    }
  }


// Log article titles and their timestamp for debugging purposes
  export function logArticleInfo(url, articles){

 console.log(`Articles at ${url}:`);
 console.log("====================");
 articles.forEach(article => {
   const timestamp = convertToTimestamp(article.age);
   console.log(`${article.title} - Timestamp: ${timestamp}`);
   console.log("====================");
 })}
