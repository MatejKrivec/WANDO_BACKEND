import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwkToPem from 'jwk-to-pem';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private jwksUrl = `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`;

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: async (request, rawJwtToken, done) => {
        try {
          const { data } = await axios.get(this.jwksUrl);
          const key = data.keys.find((k) => k.kid === jwt.decode(rawJwtToken, { complete: true })?.header.kid);
          if (!key) {
            return done(new Error('Invalid token'), undefined);
          }
          const pem = jwkToPem(key);
          done(null, pem);
        } catch (error) {
          done(error, undefined);
        }
      },
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
