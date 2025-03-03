import passport from "passport";

import { jwtStrategy } from "./strategies/passportJwtUser.js";

passport.use(jwtStrategy);

export default passport;
