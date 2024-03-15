import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtSecret } from '../constant/jwt.constant';
import { JwtService as Jwt } from '@nestjs/jwt';

@Injectable()
export class JwtService  {
  constructor(private jwt: Jwt) {}

  generateToken(id: number, email: string, roles: Array<string>,) {
    const payload = {id, email, roles};
    return this.jwt.sign(payload);
  }

}