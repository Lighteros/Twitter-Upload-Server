import express from "express";
import multer from "multer";
import { TwitterApi } from "twitter-api-v2";
import cors from "cors";
import fs from "fs";

const app = express();
const port = 3001;

// Fill your API credentials
const client = new TwitterApi({
  appKey: process.env.CONSUMER_KEY,
  appSecret: process.env.CONSUMER_SECRET,
  accessToken: process.env.ACCESS_KEY,
  accessSecret: process.env.ACCESS_SECRET,
  bearerToken: process.env.BEARER_TOKEN,
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

const mediaTweet = async (text, mediaPath) => {
  try {
    // Create mediaID
    console.log(mediaPath);
    const mediaId = await client.v1.uploadMedia(mediaPath);

    // Use tweet() method and pass an object with text
    // in the text field and media items in the media field
    await rwClient.v2.tweet({
      text: text,
      media: { media_ids: [mediaId] },
    });
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    // Extract the original file extension
    const originalExtension = file.originalname.split('.').pop();
    // Generate a new filename with the original extension
    const filename = `${file.fieldname}-${Date.now()}.${originalExtension}`;
    cb(null, filename);
  },
});

const upload = multer({ dest: 'uploads/', storage: storage }); // Specify the directory where the uploaded files will be stored

app.get('/', (req, res) => {
  res.send('Welcome to Twitter-upload API')
})

app.post('/upload', upload.single('file'), (req, res) => {
  // Access the uploaded file using req.file
  if (req.file) {
//    console.log('File received:', req.file);
    const filePath = req.file.path;
    const uncFilePath = `${filePath.replace(/\\/g, '\\\\')}`;
    mediaTweet("Hello, world! this is my first video upload!",uncFilePath);
    res.sendStatus(200);
  } else {
    res.status(400).send('No file uploaded');
  }
});

app.listen(3001, () => {
  console.log('Server is listening on port 3001');
});