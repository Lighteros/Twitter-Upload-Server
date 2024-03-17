import express from "express";
import { TwitterApi } from "twitter-api-v2";
import cors from "cors";

const app = express();
const port = 3001;

// Fill your API credentials
const client = new TwitterApi({
  appKey: "x5ZHT53Ie0ON0gJ59etjBUUCj",
  appSecret: "56A6B66xpfioKTH01sYns01EEfTty1sfuEfdrWP6l2czQbnBig",
  accessToken: "1769128796492570624-Z9CZ3kKNr0CknXyeqpmJOj5P4R7oTW",
  accessSecret: "dSnxzbI9YFHEyzi00vUWHJ2lxdSvOLdLtsBtgjbVAtg2U",
  bearerToken:
    "AAAAAAAAAAAAAAAAAAAAAGBMswEAAAAAfNdh40oaaFk5XsE8VfLvmOjRX8I%3Dw9WI2N01GrmYnbEMzhLzqLFcxPup0fGyOmXxuEAzEAKXoIy1Rh",
});

// Provide read write controls
const rwClient = client.readWrite;

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Create mediaTweet function which posts
// a tweet with media and text

const textTweet = async () => {
  try {
    await rwClient.v2.tweet("This tweet has been created using nodejs");
    console.log("success");
  } catch (error) {
    console.error(error);
  }
};

const mediaTweet = async (mediaData) => {

	console.log(mediaData);
  try {
    // Create mediaID
    const mediaId = await client.v1.uploadMedia(mediaData);

    // Use tweet() method and pass an object with text
    // in the text field and media items in the media field
    await rwClient.v2.tweet({
      text: "hello",
      media: { media_ids: [mediaId] },
    });
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};

// Define an API endpoint
app.post("/api/tweet", async (req, res) => {
  try {
    const { text, mediaPath } = req.body;

    // Call the mediaTweet function with the provided values
    await mediaTweet(text, mediaPath);
    //	await textTweet("hello");

    res.status(200).json({ message: "Tweet posted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while posting the tweet" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});