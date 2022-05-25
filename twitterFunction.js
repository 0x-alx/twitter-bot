import rwClient from "./twitterClient.js";

const meUser = await rwClient.v2.me();

let randomReply = [
  "OMG Let's fucking go 🔥🔥🔥",
  "Gimme that WL duuuude ! 💸",
  "Hope I'm gonna win ! 💸",
  "Really need this ! 😇",
  "Awesome project ! ✨",
  "I'm actually vibin for this WL 😇",
  "Appreciate it 😇",
  "I'm ON FIIIIREEEEE 🔥🔥",
  "This project is pretty hype imo",
  "Cause I'm an ISLAND BOYYYYY 🏝️",
  "Sexy WL in my pockeeeeetttt",
  "Sushi WL in da house",
  "I NEEEEEEDDDD IT 🍀",
  "This project is so freakin hot 🔥",
  "My ass for this WL 🍑",
  "SWAGGGGGGG ✨✨",
  "FIIIIREEEEEEE 🔥",
  "Puuuump it ! ✊",
];

//Select random string to reply
function randomReplyFunction(array) {
  return array[(Math.random() * (array.length - 1)).toFixed()];
}

// Like tweet function
const like = async (tweetId) => {
  try {
    await rwClient.v2.like(meUser.data.id, tweetId);
  } catch (error) {
    console.log("Error on like() function: ", error);
  }
};

//Retweet tweet function
const retweet = async (tweetId) => {
  try {
    await rwClient.v2.retweet(meUser.data.id, tweetId);
  } catch (error) {
    console.log("Error on retweet() function: ", error);
  }
};
//Reply function
const reply = async (tweetId) => {
  try {
    await rwClient.v2.reply(randomReplyFunction(randomReply), tweetId);
  } catch (error) {
    console.log("Error on reply() function: ", error);
  }
};

//Follow user function
const followUser = async (userId) => {
  try {
    await rwClient.v2.follow(meUser.data.id, userId);
  } catch (error) {
    console.log("Error on followUser() function: ", error);
  }
};

//Get user infos by username function
const getUserInfo = async (username) => {
  try {
    await rwClient.v2.userByUsername(username);
  } catch (error) {
    console.log("Error on followUser() function: ", error);
  }
};

export { like, retweet, reply, followUser, getUserInfo };
