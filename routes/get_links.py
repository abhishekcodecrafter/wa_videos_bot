from flask import Flask, request, jsonify
from pytube import YouTube
import time

app = Flask(__name__)

@app.route('/get_youtube_download_link', methods=['GET'])
def get_youtube_download_link():
    video_url = request.args.get('video_url')
    if not video_url:
        return jsonify(error='video_url parameter is required.'), 400

    try:
        yt = YouTube(video_url)
        video_stream = yt.streams.get_highest_resolution()
        download_link = video_stream.url

        return jsonify(download_link=download_link)

    except Exception as e:
        return jsonify(error='An error occurred while processing the request.'), 500
    
@app.route('/get_audio_link', methods=['GET'])
def get_audio_link():
    youtube_video_url = request.args.get('youtube_video_url')
    if not youtube_video_url:
        return jsonify(error='youtube_video_url parameter is required.'), 400

    try:
        audio_link = extract_audio_link(youtube_video_url)
        return jsonify(audio_link=audio_link)

    except Exception as e:
        return jsonify(error='An error occurred while processing the request.'), 500

def extract_audio_link(youtube_video_url):
    yt = YouTube(youtube_video_url)

    # Get the audio streams available for the video
    audio_streams = yt.streams.filter(only_audio=True)

    # Get the first available audio stream (you can choose a specific one based on quality if needed)
    audio_stream = audio_streams.first()

    # Get the audio link
    audio_link = audio_stream.url

    return audio_link


if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000,debug=True)
