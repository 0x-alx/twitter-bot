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
    const request = await rwClient.v2.like(meUser.data.id, tweetId);
    if (request.data.liked) {
      console.log("✅ Tweet ID: " + tweetId + " - Like OK");
    }
  } catch (error) {
    console.log("❌ Error on like() function -> ", error.data.detail);
  }
};

//Retweet tweet function
const retweet = async (tweetId) => {
  try {
    const request = await rwClient.v2.retweet(meUser.data.id, tweetId);
    if (request.data.retweeted) {
      console.log("✅ Tweet ID: " + tweetId + " - Rewtweet OK");
    }
  } catch (error) {
    console.log("❌ Error on retweet() function -> ", error.data.detail);
  }
};
//Reply function
const reply = async (tweetId) => {
  try {
    const request = await rwClient.v2.reply(
      "@Bro_IntOox @Bro_Walkyrie @Im__Broke " +
        randomReplyFunction(randomReply),
      tweetId
    );
    if (request.data) {
      console.log("✅ Tweet ID: " + tweetId + " - Reply OK");
    }
  } catch (error) {
    console.log("❌ Error on reply() function -> ", error.data.detail);
  }
};

//Follow user function
const followUser = async (users_ids) => {
  users_ids.map(async (user) => {
    try {
      const request = await rwClient.v2.follow(meUser.data.id, user.id);
      if (request.data.following) {
        console.log("✅ User ID: " + user.username + " - Follow OK");
      }
    } catch (error) {
      console.log("❌ Error on followUser() function -> ", error.data);
    }
  });
};

//Get user infos by username function
const getUserInfo = async (username) => {
  try {
    await rwClient.v2.userByUsername(username);
  } catch (error) {
    console.log("❌ Error on getUserInfo() function -> ", error.data.detail);
  }
};

const userFilterDuplicate = (usersArray) => {
  let filteredArray = [];
  usersArray.map((user) => {
    if (!filteredArray.includes(user.id)) {
      filteredArray.push({ id: user.id, username: user.username });
    }
  });
  console.log(filteredArray);
  return filteredArray;
};

const mainFunction = (tweet_id, users_ids) => {
  like(tweet_id);
  retweet(tweet_id);
  reply(tweet_id);
  followUser(userFilterDuplicate(users_ids));
};

export { mainFunction };
