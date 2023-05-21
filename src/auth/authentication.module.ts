import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LocalStrategy } from './local.strategy';
import { LocalAuthGuard } from './local-auth.guard';
import { SessionSerializer } from './session.serializer';
import { AuthenticatedGuard } from './authenticated.guard';
import { LocalStrategyAdmin } from './local.admin.strategy';
import { LocalAuthGuardAdmin } from './local-admin-auth.guard';
import { SessionSerializerAdmin } from './session.admin.serializer';
import { AuthenticatedGuardAdmin } from './authenticated-admin.guard';

@Module({
  imports:[PrismaModule],
  providers: [
    AuthenticationService, 
    LocalStrategy,
    SessionSerializer, 
    LocalAuthGuard, 
    AuthenticatedGuard,
    SessionSerializerAdmin,
    LocalAuthGuardAdmin,
    AuthenticatedGuardAdmin,
    LocalStrategyAdmin,
  ],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
