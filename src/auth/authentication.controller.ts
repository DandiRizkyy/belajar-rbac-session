import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUser, LoginUser } from './dto/input-auth.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthenticatedGuard } from './authenticated.guard';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateAdmin } from 'src/admin/dto/create-admin.dto';
import { LoginAdmin } from 'src/admin/dto/login-admin.dto';
import { LocalAuthGuardAdmin } from './local-admin-auth.guard';
import { AuthenticatedGuardAdmin } from './authenticated-admin.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthenticationController {
    constructor(private authService: AuthenticationService){}

    // register user
    @Post('register/user')
    @ApiCreatedResponse({status: 201, description: 'Successfully Registered'})
    async registerUser(@Body() authDto: CreateUser){
        return await this.authService.registerUser(authDto);
    }

    // register admin
    @Post('register/admin')
    async registerAdmin(@Body() createAdminDto: CreateAdmin){
        return await this.authService.registerAdmin(createAdminDto);
    }

    // login user biasa
    @UseGuards(LocalAuthGuard)
    @Post('login/user')
    @ApiCreatedResponse({status: 201, description: 'Login Successfully'})
    async loginUser(@Body() authDto: LoginUser){
        console.log(`${authDto.email} is logging in`)
        return `Login Successfully.`
    }

    // login admin 
    @UseGuards(LocalAuthGuardAdmin)
    @Post('login/admin')
    async loginAdmin(@Body() loginAdminDto: LoginAdmin){
        console.log(`${loginAdminDto.username} is logging in`);
        return `Login Successfully.`
    }


    // logout user biasa
    @UseGuards(AuthenticatedGuard)
    @Post('logout/user')
    @ApiCreatedResponse({status: 201, description: 'Logout Successfully'})
    logoutUser(@Request() req){
        req.session.destroy();
        return `Logout Successfully.`
    }

    // logout admin
    @UseGuards(AuthenticatedGuardAdmin)
    @Post('logout/admin')
    logoutAdmin(@Request() req){
        req.session.destroy();
        return `Logout Successfully.`
    }
}
