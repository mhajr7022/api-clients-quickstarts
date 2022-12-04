// Install the API client: https://www.algolia.com/doc/api-client/getting-started/install/javascript/?client=javascript
const algoliasearch = require("algoliasearch");
const dotenv = require("dotenv");

dotenv.config();

// Get your Algolia Application ID and (admin) API key from the dashboard: https://www.algolia.com/account/api-keys
// and choose a name for your index. Add these environment variables to a `.env` file:
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY;
const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME;
const fs = require("fs");
const { fileURLToPath } = require("url");

// Start the API client
// https://www.algolia.com/doc/api-client/getting-started/instantiate-client-index/
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

// Create an index (or connect to it, if an index with the name `ALGOLIA_INDEX_NAME` already exists)
// https://www.algolia.com/doc/api-client/getting-started/instantiate-client-index/#initialize-an-index
const index = client.initIndex(ALGOLIA_INDEX_NAME);

// // Create fetch request to Rest API

// fetch(
//   `https://analytics.algolia.com/2/searches?index=${ALGOLIA_INDEX_NAME}&limit=1000`,
//   {
//     method: "GET",
//     headers: {
//       "X-Algolia-API-Key": `${ALGOLIA_API_KEY}`,
//       "X-Algolia-Application-Id": `${ALGOLIA_APP_ID}`,
//     },
//   }
// )
//   .then((res) => res.json())
//   .catch((error) => console.error("Error:", error))
//   .then((response) =>
//     fs.writeFile(
//       `${ALGOLIA_INDEX_NAME}_top_1000_searches.json`,
//       JSON.stringify(response),
//       (err) => {
//         // In case of a error throw err.
//         if (err) throw err;
//       }
//     )
//   );

(async () => {
  const response = await fetch(
    `https://analytics.algolia.com/2/searches?index=${ALGOLIA_INDEX_NAME}&limit=1000`,
    {
      method: "GET",
      headers: {
        "X-Algolia-API-Key": `${ALGOLIA_API_KEY}`,
        "X-Algolia-Application-Id": `${ALGOLIA_APP_ID}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log("creating JSON file...");
  fs.writeFile(
    `${ALGOLIA_INDEX_NAME}_top_1000_searches.json`,
    JSON.stringify(data),
    (err) => {
      // In case of a error throw err.
      if (err) throw err;
    }
  );
  console.log(`JSON file "${ALGOLIA_INDEX_NAME}_top_1000_searches" created!`);
})();
