import { json, type ActionFunctionArgs } from "@remix-run/cloudflare";
import {
  Frame,
  FrameActionPayload,
  getFrameHtml,
  validateFrameMessage,
} from "frames.js";
import { HOST_URL } from "~/lib/constants";

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== "POST") {
    return json({ message: "Method not allowed" }, 405);
  }

  try {
    const body = await request.json();

    const { isValid, message } = await validateFrameMessage(
      body as FrameActionPayload
    );

    if (!isValid || !message) {
      return new Response("Invalid message", { status: 400 });
    }
    const randomInt = Math.floor(Math.random() * 100);
    const imageUrlBase = `https://picsum.photos/seed/${randomInt}`;

    // Use the frame message to build the frame
    const frame: Frame = {
      version: "vNext",
      image: `${imageUrlBase}/1146/600`,
      buttons: [
        {
          label: `Next (pressed by ${message.data.fid})`,
          action: "post",
        },
      ],
      ogImage: `${imageUrlBase}/600`,
      postUrl: `${HOST_URL}/api/frames`,
    };

    // Return the frame as HTML
    const html = getFrameHtml(frame);

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
