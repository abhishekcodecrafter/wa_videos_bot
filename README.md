# WhatsApp Chatbot for Instagram and YouTube Video Downloads

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
git clone https://github.com/abhishekcodecrafter/download_videos_wa_chatbot.git
cd whatsapp-chatbot
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
