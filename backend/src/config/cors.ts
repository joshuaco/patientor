import { CorsOptions } from "cors";

const WHITELISTED_ORIGINS = [
  "http://localhost:5173",
  "https://patientor-neon.vercel.app",
  "https://patientor-josuee-contreras-projects.vercel.app/",
];

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || WHITELISTED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS`));
    }
  },
};
