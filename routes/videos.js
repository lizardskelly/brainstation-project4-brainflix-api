const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
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

router.post('/', (req, res) => {
  console.log(req.body);
  const uploadRequest = {
    title: req.body.title,
    channel: req.body.channel,
    image: req.body.image,
    description: req.body.description,
    views: '0',
    likes: '0',
    duration: '10:00',
    video: '',
    timestamp: Date.now(),
    comments: [],
    id: uuidv4()
  };
  const oldVideoList = JSON.parse(fs.readFileSync('data/videos.json'));
  let newVideoList = [...oldVideoList, uploadRequest]; 
  fs.writeFileSync('data/videos.json', JSON.stringify(newVideoList));
  res.send(uploadRequest.id);
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