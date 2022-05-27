import { mainFunction } from "./twitterFunction.js";
import { ETwitterStreamEvent, TwitterApi } from "twitter-api-v2";

const client = new TwitterApi(process.env.BEARER_TOKEN);

const main = async () => {
  // Add rules

  const addedRules = await client.v2.updateStreamRules({
    add: [
      {
        value: "#SolanaNFT WL RT -is:retweet -is:reply -is:quote",
        tag: "solana",
      },
    ],
  });

  const rules = await client.v2.streamRules();

  // Log every rule ID
  console.log(rules.data.map((rule) => rule));

  const stream = await client.v2.searchStream({
    "tweet.fields": "text,author_id,entities",
  });

  // Awaits for a tweet
  stream.on(
    // Emitted when Node.js {response} emits a 'error' event (contains its payload).
    ETwitterStreamEvent.ConnectionError,
    (err) => console.log("Connection error!", err)
  );

  stream.on(
    // Emitted when Node.js {response} is closed by remote or using .close().
    ETwitterStreamEvent.ConnectionClosed,
    () => console.log("Connection has been closed.")
  );

  stream.on(
    // Emitted when a Twitter payload (a tweet or not, given the endpoint).
    ETwitterStreamEvent.Data,
    (eventData) => {
      console.log("Twitter has sent something:", eventData),
        console.log("Mentions:", eventData.data.entities.mentions),
        mainFunction(eventData.data.id, eventData.data.entities.mentions);
    }
  );

  stream.on(
    // Emitted when a Twitter sent a signal to maintain connection active
    ETwitterStreamEvent.DataKeepAlive,
    () => console.log("Twitter has a keep-alive packet.")
  );

  // Enable reconnect feature
  stream.autoReconnect = true;
  // Be sure to close the stream where you don't want to consume data anymore from it
};

main();
