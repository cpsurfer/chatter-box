// controllers/chat.controller.js

import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    const token = await generateStreamToken(req.user.id);
    // Return the token inside a `token` property
    res.status(200).json({ token: token });
  } catch (error) {
    console.error("Error in getStreamToken controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}