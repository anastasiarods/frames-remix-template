import { Frame } from "frames.js";

export function getFrameMetadata(frame: Frame) {
  const buttons =
    frame.buttons?.reduce((acc, button, idx) => {
      acc.push({
        property: `fc:frame:button:${idx + 1}`,
        content: button.label,
      });

      acc.push({
        property: `fc:frame:button:${idx + 1}:action`,
        content: button.action,
      });

      if (button.target) {
        acc.push({
          property: `fc:frame:button:${idx + 1}:target`,
          content: button.target,
        });
      }

      return acc;
    }, [] as { property: string; content: string }[]) || [];

  return [
    {
      property: "fc:frame",
      content: frame.version,
    },
    {
      property: "fc:frame:image",
      content: frame.image,
    },
    {
      property: "fc:frame:post_url",
      content: frame.postUrl,
    },
    {
      property: "og:image",
      content: frame.ogImage || frame.image,
    },
    ...buttons,
    ...(frame.imageAspectRatio
      ? [
          {
            property: "fc:frame:image:aspect_ratio",
            content: frame.imageAspectRatio,
          },
        ]
      : []),
  ];
}
