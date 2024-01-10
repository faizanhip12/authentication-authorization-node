import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from "dotenv";
import {UserModel} from '../module/auth/model'


config()

export default passport.use(
    new GoogleStrategy(
      {
        clientID:process.env.GOOGLE_CLIENT_ID_OAUTH,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET_OAUTH ,
        callbackURL: 'http://localhost:3000/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const existingUser = await UserModel.findOne({ googleId: profile.id });
  
          if (existingUser) {
            return done(null, existingUser);
          }
  
          const newUser = new UserModel({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null,
            role:'USER',
            password:"test"
          });
  
          await newUser.save();
          done(null, newUser);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );



//   async (accessToken, refreshToken, profile, done) => {
//     try {
//       const existingUser = await UserModel.findOne({ googleId: profile.id });

//       if (existingUser) {
//         return done(null, existingUser);
//       }

//       const newUser = new UserModel({
//         googleId: profile.id,
//         displayName: profile.displayName,
//         email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null,
//       });

//       await newUser.save();
//       done(null, newUser);
//     } catch (error) {
//       done(error, null);
//     }
//   }