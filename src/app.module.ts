import { Module, Scope } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { APP_GUARD, APP_INTERCEPTOR, REQUEST } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { OrganizationsModule } from './organizations/organizations.module';
import { Organization } from './organizations/entities/organization.entity';
import { FastifyReply } from 'fastify';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      // signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.getOrThrow('DATABASE_HOST'),
          port: parseInt(configService.getOrThrow('DATABASE_PORT'), 10),
          username: configService.getOrThrow('DATABASE_USER'),
          password: configService.getOrThrow('DATABASE_PASS'),
          database: configService.getOrThrow('DATABASE_NAME'),
          entities: [User, Organization],
          synchronize: false,
        };
      },
    }),
    AuthModule,
    UsersModule,
    OrganizationsModule,
  ],
  controllers: [],
  providers: [
    {
      // guard for globally
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    // {
    //   provide: 'CONNECTION',
    //   scope: Scope.REQUEST,
    //   useFactory: (req: FastifyReply) => {
    //     // const organizationId = req.user.organization_id;
    //     // console.log('TYPEORM CONECC');
    //     // const tenant = someMethodToDetermineTenantFromHost(req.headers.host);
    //     // return getConnection(tenant);
    //   },
    //   inject: [REQUEST],
    // },
  ],
})
export class AppModule {}
