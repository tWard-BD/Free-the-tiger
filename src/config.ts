import type { BgConfig } from "./prefabs/BackgroundContainer";

type Config = {
  backgrounds: Record<string, BgConfig>;
};

export default {
  backgrounds: {
    forest: {
      layers: [
        "background",
        "cage",
        "tiger"
      ],
      panSpeed: 0.2,
    },
  },
} as Config;
