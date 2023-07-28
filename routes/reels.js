const axios = require('axios');

async function getVideoUrl(url) {
  const options = {
    method: 'GET',
    url: 'https://instagram-downloader-download-instagram-videos-stories.p.rapidapi.com/index',
    params: {
      url: url
    },
    headers: {
      'X-RapidAPI-Key': 'a36f480b42msh80fe917e95b67a5p167a16jsn2b2d914073b0',
      'X-RapidAPI-Host': 'instagram-downloader-download-instagram-videos-stories.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);

    if (response.status === 200) {
      const videoUrl = response.data.media;
      console.log('Video Url : ', videoUrl);
      return videoUrl;
    } else {
      throw new Error('Failed to get video URL');
    }
  } catch (error) {
    throw new Error('Error getting video URL: ' + error.message);
  }
}

module.exports = getVideoUrl;
