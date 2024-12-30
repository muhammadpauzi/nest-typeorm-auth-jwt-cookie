import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { FastifyReply } from 'fastify';
import { Public } from './guards/auth.guard';
import { LoginDto } from './dtos/login.dto';
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { MeResponseDto } from './dtos/me-response.dto';
import { JWT_COOKIE_TOKEN_KEY } from './auth.constant';
import { Cookie } from '../common/decorators/cookie.decorator';
import { plainToInstance } from 'class-transformer';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Login successful',
  })
  @ApiUnauthorizedResponse({
    description: 'Wrong credentials',
  })
  login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) reply: FastifyReply,
  ) {
    return this.authService.login(body, reply);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: MeResponseDto,
  })
  me(@Req() req): MeResponseDto {
    // req.user is from auth guard
    return plainToInstance(MeResponseDto, req.user);
  }

  @Delete('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Logout successful',
  })
  logout(
    @Cookie(JWT_COOKIE_TOKEN_KEY) token,
    @Res({ passthrough: true }) reply: FastifyReply,
  ) {
    /**
     * TODO: Blacklist the jwt token on redis
     */

    reply.clearCookie(JWT_COOKIE_TOKEN_KEY);

    return;
  }
}
