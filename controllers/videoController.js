const asyncHandler = require("express-async-handler");
const VideoModel = require("../models/VideoModel");

const uploadVideo = asyncHandler(async (req, res, next) => {
  const { title, description, videoUrl, location, incidentType } = req.body;

  if (!title || !videoUrl) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const userId = req.user ? req.user.id : null;

  const payload = {
    title,
    description,
    videoUrl,
    location,
    incidentType,
    uploadedBy: userId || undefined,
    uploadedByGuest: !userId,
  };

  const video = await VideoModel.create(payload);

  res.status(201).json({
    success: true,
    message: "Video added successfully!",
    data: video.id,
  });
});

const getVideos = asyncHandler(async (req, res, next) => {
  const videos = await VideoModel.find();

  res.status(200).json({
    success: true,
    data: videos,
    total: videos.length,
  });
});

const getVideoDetails = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const video = await VideoModel.findById(id);

  if (!video) {
    res.status(404);
    throw new Error("Video not found");
  }

  res.status(200).json({
    success: true,
    data: video,
  });
});

module.exports = { uploadVideo, getVideos, getVideoDetails };
