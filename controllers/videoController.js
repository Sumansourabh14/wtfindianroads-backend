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

module.exports = { uploadVideo };
