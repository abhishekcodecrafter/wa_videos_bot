from flask import Flask, request, jsonify
from pytube import YouTube
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time

app = Flask(__name__)

@app.route('/get_insta_download_link', methods=['GET'])
def get_insta_download_link():
    link_to_reel = request.args.get('link_to_reel')
    if not link_to_reel:
        return jsonify(error='link_to_reel parameter is required.'), 400

    try:
        download_link = fetch_insta_download_link(link_to_reel)
        return jsonify(download_link=download_link)

    except Exception as e:
        return jsonify(error='An error occurred while processing the request.'), 500

def fetch_insta_download_link(link_to_reel):
    # Set the path to Chromedriver executable
    PATH = "C:\\Program Files\\chromedriver\\chromedriver.exe"

    # Instantiate Chrome WebDriver with options
    chrome_options = Options()
    # chrome_options.add_argument("--headless")  # To run the browser in headless mode (no GUI)
    chrome_options.add_argument("--log-level=3")  
    driver = webdriver.Chrome(PATH, options=chrome_options)

    # Open the website
    driver.get("https://instaphotodownloader.com/")

    # Find the input element and enter the link
    url_input = driver.find_element(By.ID, "url")
    url_input.clear()
    url_input.send_keys(link_to_reel)

    # Click the download button
    submit_button = driver.find_element(By.ID, "submit")
    submit_button.click()

    # Wait for a few seconds to let the page load the download link
    wait_time = 5
    time.sleep(wait_time)

    # Get the download link for the reel
    download_link = driver.find_element(By.ID, "download-btn").get_attribute("href")

    # Close the browser
    driver.quit()

    return download_link

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
