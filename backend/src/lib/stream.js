/** @format */

import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
	throw new Error("Stream API key or Secret is missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
	try {
		await streamClient.upsertUsers([userData]);
		return userData;
	} catch (error) {
		console.error("Error upserting Stream user:", error);
		throw error; // propagate error to caller
	}
};

export const generateStreamToken = (userId) => {
	try {
		return streamClient.createToken(userId.toString());
	} catch (error) {
		console.error("Error generating Stream token:", error);
		throw error;
	}
};
