import { TwitterApi } from "twitter-api-v2";
import "dotenv/config";

const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET_KEY,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
  bearerToken: process.env.BEARER_TOKEN,
  clientId: process.env.CONSUMER_TOKEN,
  clientSecret: process.env.CONSUMER_TOKEN_SECRET,
});

const rwClient = client.readWrite;

export default rwClient;
