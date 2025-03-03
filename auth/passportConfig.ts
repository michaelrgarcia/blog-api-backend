import passport from "passport";

import { jwtStrategy } from "./strategies/passportJwt.js";

passport.use(jwtStrategy);

export default passport;
