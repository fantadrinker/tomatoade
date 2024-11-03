// now this script runs on every page that matches with the key 
// from "manifest.json"

/**
  * Gets all word counts for a given article
  * @param {HTMLElement} article 
  * @returns {number}
  * */
function getAllWordCount(article) {
  console.log("found article")
  const text = article.textContent;
  const wordMatchRegExp = /[^\s]+/g; // Regular expression
  const words = text.matchAll(wordMatchRegExp);
  // matchAll returns an iterator, convert to array to get word count
  const allwords = [...words]
  const wordCount = allwords.length;
  // console.log(allwords.reduce((acc, word) => `${acc} ${word}`, ''))
  return wordCount
}

/**
  * creates a reading time node and attaches it
  * to the end of the article title
  * @param {HTMLElement} article 
  * @param {number} wordCount 
  * */
function attachReadingTime(article, wordCount) {
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement("p");
  // Use the same styling as the publish information in an article's header
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `⏱️ ${readingTime} min read`;

  // Support for API reference docs
  const heading = article.querySelector("h1");
  // Support for article docs with date
  const date = article.querySelector("time")?.parentNode;

  (date ?? heading).insertAdjacentElement("afterend", badge);
}


function main() {
  // get content from website html
  const article = document.querySelector("article");

  // `document.querySelector` may return null if the selector doesn't match anything.
  if (article) {
    // first let's just attach the reading time to the title
    const wordCount = getAllWordCount(article)
    attachReadingTime(article, wordCount)

    // let's try to reach a local service
    const rawHTML = article.innerText
    console.log(111, rawHTML)
    const paragraphs = rawHTML.split('\n').filter((line) => line.length > 0)
    console.log(222, paragraphs)
    const endpoint = 'http://localhost:3113/chat'
    const result = fetch(endpoint).then((res) => {
      console.log("success")
      return res.json()
    }).then(console.log).catch(console.error)
  } else {
    console.log("article not found")
  }
}


main()
