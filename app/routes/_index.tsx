import { MetaFunction } from "@remix-run/cloudflare";
import { Frame } from "frames.js";
import { HOST_URL } from "~/lib/constants";
import { getFrameMetadata } from "~/lib/utils";

const initialFrame: Frame = {
  image: "https://picsum.photos/seed/frames.js/1146/600",
  version: "vNext",
  buttons: [
    {
      label: "Random image",
      action: "post",
    },
  ],
  postUrl: `${HOST_URL}/api/frames`,
};

export const meta: MetaFunction = () => {
  return [
    { title: "Very cool app | Remix" },
    {
      property: "og:title",
      content: "Very cool app",
    },
    {
      name: "description",
      content: "This app is the best",
    },
    ...getFrameMetadata(initialFrame),
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
    </div>
  );
}
