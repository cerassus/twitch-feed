import express from "express";
import TWITCH_FEED from "./twitch.js";
import cors from "cors"
import bodyParser from "body-parser"

const corsOptions = {
  optionsSuccessStatus: 200,
  methods: "GET, POST, PUT",
};
const app = express();

// Middlewares

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Routes

// app.get("/haystack", async (req, res) => {
//   try {
//     await HAYSTACK_FEED.fetchData("https://www.haystack.tv/feed/vewd/videos");
//     HAYSTACK_FEED.parseElements();
//     const report = HAYSTACK_FEED.getParsedData();
//     res.status(200).json(report);
//   } catch (err) {
//     res.json({ error: err });
//   }
// });

app.get("/twitch", async (req, res) => {
  try {
    const URL = "https://api.twitch.tv/helix/games/top"
    const PARAMS = { 
      method: 'GET', 
      headers: {
        "Client-Id": "mqeb2z79xtgi24hxvk4ifjfxm22gvk",
        "Authorization": "Bearer 40ejews0g7csnajkmjn5cd2hmm4ftk"
      }
    }
    await TWITCH_FEED.fetchData(URL, PARAMS);
    TWITCH_FEED.parseElements();
    const report = TWITCH_FEED.getParsedData();
    res.status(200).json(report);
  } catch (err) {
    res.json({ error: err });
  }
});

// Server listen on port 3333

app.listen(3333, function () {
  console.log("Example app listening on port 3333!");
});
