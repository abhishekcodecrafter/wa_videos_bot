# WhatsApp Chatbot for Instagram and YouTube Video Downloads


## Check it out live!

[![WhatsApp Chatbot](https://i.postimg.cc/RFXjMJcY/RBOLJNREO7-CTN1-1.png)](https://wa.me/919717741778)

- Scan the QR code above or [click here](https://wa.me/919717741778) to open a chat or add the bot to your phone's best thing list.

- You can also send a message manually on WhatsApp to +919717741778.


## Features
- Download Instagram reels, posts, and IGTVs by sharing their links in WhatsApp chats.
- Download YouTube videos and audios at their highest quality.

## Next Version Will Cover
### Instagram
- Download story function.
- Download looped posts.
- Access/view private accounts and download their stories.

### YouTube
- Download videos based on resolution selection.
- Download audios.
- Support external links for downloading videos like movies.

## Setup Instructions

### Clone the Repository
```bash
git clone https://github.com/abhishekcodecrafter/wa_videos_bot.git
cd wa_videos_bot
```

### Resolve Dependencies
```bash
npm i
pip3 install flask pytube
```

## Configuration
- Replace Waba ID, Waba phone ID, Waba access token, and webhook secret code in .env.js files.

## Run the Application

### Start the chatbot
```bash
node app.js 
```
### Execute for YouTube videos and audios
```bash
python3 get_links.py
```

- Upon successful setup, you'll receive a Log in Terminal like "Someone is pinging me!" after registering the webhook at meta webhooks for WaBaCloud.
