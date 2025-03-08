import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifiedCallback,
  StrategyOptionsWithoutRequest,
} from "passport-jwt";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";

import { authError } from "../../errors/authError.js";

config();

const options: StrategyOptionsWithoutRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: String(process.env.JWT_SECRET),
};

export const jwtStrategy = new JwtStrategy(
  options,
  async (payload: any, done: VerifiedCallback) => {
    const prisma = new PrismaClient();

    try {
      const blogger = await prisma.user.findUnique({
        where: {
          username: payload.username,
          role: "BLOGGER",
        },
      });

      if (user && payload.role === "USER") throw authError("You are not a blogger.");

      if (!blogger && !user) throw authError("User not found");

      return done(null, true);
    } catch (err: any) {
      return done(null, false);
    }
  }
);
