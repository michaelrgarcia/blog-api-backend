import passport from "passport";

import { jwtStrategy } from "./strategies/passportJwtBlogger.js";

passport.use(jwtStrategy);

export default passport;
