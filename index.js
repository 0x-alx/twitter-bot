import rwClient from "./twitterClient.js";
import {
  followUser,
  like,
  retweet,
  reply,
  getUserInfo,
} from "./twitterFunction.js";

const main = async () => {
  followUser("1514706755858616323");
};

main();
