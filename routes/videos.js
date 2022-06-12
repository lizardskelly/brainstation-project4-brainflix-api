const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (_req, res) => {
  const videoData = JSON.parse(fs.readFileSync('data/videos.json'));
  res.json(videoData.map(video => {
    return {
      title: video.title,
      channel: video.channel,
      image: video.image,
      id: video.id
    }
  }))
});

router.get('/:id', (req, res) => {
  const videoData = JSON.parse(fs.readFileSync('data/videos.json'));
  const id = req.params.id;
  const foundVideo = videoData.find(video => video.id === id);
  if(foundVideo) {
    res.json(foundVideo);
  } else {
    res.status(404).send(`Video ${id} not found`);
  };
});

module.exports = router;