import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdmin } from './dto/create-admin.dto';

@Controller('admins')
export class AdminController {
    constructor(private adminService: AdminService){}

    @Post()
    async createAdmin(@Body() createAdminDto: CreateAdmin){
        return await this.adminService.createAdmin(createAdminDto);
    }

    @Get()
    async getAllAdmins(){
        return await this.adminService.getAllAdmins();
    }

}
