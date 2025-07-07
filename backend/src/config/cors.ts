import { CorsOptions } from "cors";

const WHITELISTED_ORIGINS = [
  "http://localhost:5173",
  "https://patientor-neon.vercel.app",
  "https://vercel.com/josuee-contreras-projects/patientor/Eu8zSWnHJHRTkGx1zAfRhhLp2Ltq",
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
