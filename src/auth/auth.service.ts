import {
  ClassSerializerInterceptor,
  Get,
  Injectable,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';

import { AuthMessages, JWT_COOKIE_TOKEN_KEY } from '@/auth/auth.constant';
import { LoginDto } from '@/auth/dtos/login.dto';
import { User } from '@/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(body: LoginDto, reply: FastifyReply) {
    const user = await this.userRepository.findOne({
      select: {
        id: true,
        username: true,
        password: true,
      },
      where: {
        username: body.username,
      },
    });

    if (!user || !(await compare(body.password, user.password))) {
      throw new UnauthorizedException(AuthMessages.WRONG_CREDENTIALS);
    }

    const token = await this.jwtService.signAsync(
      { sub: user.id, username: user.username },
      {
        expiresIn: '7d',
      },
    );

    const isProduction = this.configService.get('NODE_ENV') === 'production';
    reply.setCookie(JWT_COOKIE_TOKEN_KEY, token, {
      secure: isProduction,
      signed: isProduction,
      httpOnly: isProduction,
      path: '/',
      sameSite: 'strict',
      // maxAge: , // TODO: should be same like the jwt token
    });

    return;
  }

  async me() {
    // return
  }
}
