"use strict";
const mysql = require("mysql");
const router = require("express").Router();
const axios = require("axios");
const ig = require("instagram-url-dl");
const getVideoUrl = require("./reels.js");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const WhatsappCloudAPI = require("whatsappcloudapi_wrapper");
const Whatsapp = new WhatsappCloudAPI({
  accessToken: process.env.Meta_WA_accessToken,
  senderPhoneNumberId: process.env.Meta_WA_SenderPhoneNumberId,
  WABA_ID: process.env.Meta_WA_wabaId,
  // graphAPIVersion: 'v13.0'
});

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "w_chatbot",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

router.get("/meta_wa_callbackurl", (req, res) => {
  try {
    console.log("GET: Someone is pinging me!");
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (
      mode &&
      token &&
      mode === "subscribe" &&
      process.env.Meta_WA_VerifyToken === token
    ) {
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  } catch (error) {
    console.error({ error });
    return res.sendStatus(500);
  }
});

router.post("/meta_wa_callbackurl", async (req, res) => {
  try {
    console.log("POST: Someone is pinging me!");
    res.sendStatus(200); // Acknowledge the message immediately

    const data = Whatsapp.parseMessage(req.body);
    console.log(data);

    if (data?.isMessage) {
      const incomingMessage = data.message;
      const recipientPhone = incomingMessage.from.phone;
      const to = recipientPhone;
      const recipientName = incomingMessage.from.name;
      const typeOfMsg = incomingMessage.type;

      const starterMessagesRegex = /^(hello|hi|hlw|hie|hlo)$/i;
      if (typeOfMsg === "text_message") {
        if (starterMessagesRegex.test(incomingMessage.text.body)) {
          await Whatsapp.sendText({
            message: `Hello 👋 ${recipientName},\nWelcome to Video Downloader, A video Downloading service by abhish3k._.developer.\nHere you can Download videos 🎥 from various platforms like Instagram ,YouTube and many more.`,
            recipientPhone: recipientPhone,
          });

          await Whatsapp.sendText({
            message: `Just send a link to download any video from any social platform 💯💯.`,
            recipientPhone: recipientPhone,
          });

          Whatsapp.sendVideo({
            recipientPhone: to,
            caption: "The video you want!",
            url: "https://download.ig-7-data.xyz/ig/1690577862/69dc55c10810c056f3332dd90ec0db6e0203f66ea4b25374f4812e599dfd0baa?file=aHR0cHM6Ly9zY29udGVudC5jZG5pbnN0YWdyYW0uY29tL3YvdDY2LjMwMTAwLTE2LzEyMTE4NjkyNl82NjUyMDAwMTg3OTA0NjNfMTY5NTk4NjAwMjc0ODU2MjkxOV9uLm1wND9fbmNfaHQ9c2NvbnRlbnQuY2RuaW5zdGFncmFtLmNvbSZfbmNfY2F0PTEwMyZfbmNfb2hjPXREZWZjeW0weVhzQVg4azBRNk8mZWRtPUFQczE3Q1VCQUFBQSZjY2I9Ny01Jm9oPTAwX0FmREQ1SG5qNzRRUUVMT1RlZTJiaHhkTkVLZDFaNkFYZkJWOUNJTTM2TzNiVmcmb2U9NjRDNjEzOEQmX25jX3NpZD0xMGQxM2ImbmFtZT1TYXZlSUcuQXBwXzMxNDYwNDA1OTA5ODU1MzEzNDMubXA0",
          });
        }
      }

        const regexYouTubeLink =
          /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?=.*v=([\w-]+))|embed\/|v\/|shorts\/)|youtu.be\/)([\w-]+)/;
        if (incomingMessage.text.body.match(regexYouTubeLink)) {
          const matchResult = incomingMessage.text.body.match(regexYouTubeLink);
          const videoId = matchResult[1] || matchResult[2] || matchResult[3];
          console.log("YouTube Video ID:", videoId);
          const staticvideourl = incomingMessage.text.body;
          console.log("Video Url From Link : ", staticvideourl);

          Whatsapp.sendText({
            message: `We have received your request and downloading the video for you. \nPlease be patient as the video archival time may depend on your video size.`,
            recipientPhone: to,
          });

          try {
            const response = await axios.get(
              "http://127.0.0.1:5000/get_youtube_download_link",
              { params: { video_url: staticvideourl } }
            );
            console.log("Downloadable link:", response.data.download_link);
            const downloadablevideolink = response.data.download_link;

            Whatsapp.sendVideo({
              recipientPhone: to,
              caption: "The video you want!",
              url: downloadablevideolink,
            });
          } catch (error) {
            console.error("Error:", error.message);
          }
        } else {
          console.log("Not a valid YouTube link.");
          // Whatsapp.sendText({
          //   message: `Not a  valid Youtube link Please try again!`,
          //   recipientPhone: to,
          // });
        }

        if (incomingMessage.text.body.includes("https://www.instagram.com")) {
          console.log(
            "found word",
            incomingMessage.text.body.search("https://www.instagram.com")
          );

          Whatsapp.sendText({
            message: `We have received your request and downloading the video for you. \nPlease be patient as the video archival time may depend on your video size.`,
            recipientPhone: to,
          });

          const reelUrl = incomingMessage.text.body;

          ig(reelUrl)
            .then((res) => {
              console.log("Res Type:", res.data[0].type);
              console.log("Res URL:", res.data[0].url);
              // check and send the reel
              if (res.data[0].type === "video") {
                Whatsapp.sendVideo({
                  recipientPhone: to,
                  caption: "The video you want!",
                  url: res.data[0].url,
                });
              }
                // check and send the video
                if (res.data[0].type === 'image'){
                Whatsapp.sendImage({
                  recipientPhone: to,
                  caption: "The Post You Want!",
                  url: res.data[0].url,
                });
              }
              
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          console.log("Not a valid Instagram link.");
          // Whatsapp.sendText({
          //   message: `Not a  valid Instagram link Please try again!`,
          //   recipientPhone: to,
          // });
        }

        // <-- By Selenium Using INSTAPHOTODOWNLOADER website  -->

        // try {
        //   const response = await axios.get('http://127.0.0.1:5000/get_insta_download_link', { params: { link_to_reel: reelUrl } });
        //   console.log('Downloadable link:', response.data.download_link);
        //   const downloadablevideolink = response.data.download_link;

        //   Whatsapp.sendVideo({
        //     recipientPhone: to,
        //     caption: "The video you want!",
        //     url: downloadablevideolink,
        //   });
        // } catch (error) {
        //   console.error('Error:', error.message);
        // }

        // <-- From Rapid Api -->

        // try {
        //   const videoUrl = await getVideoUrl(reelUrl);
        //   console.log("Video URL:", videoUrl);
        //   Whatsapp.sendVideo({
        //     recipientPhone: to,
        //     caption: "The video you want!",
        //     url: videoUrl,
        //   });
        // } catch (error) {
        //   console.error("Error:", error.message);
        // }
        // }
      

      console.log("User:", recipientName);
      console.log("Sent Message:", incomingMessage);
    }
  } catch (error) {
    console.error({ error });
    res.sendStatus(500);
  }
});

module.exports = router;
