import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdmin } from './dto/create-admin.dto';
import * as bcrypt from 'bcrypt';
import { error } from 'console';
import { instanceToPlain, plainToClass, plainToInstance } from 'class-transformer';

@Injectable()
export class AdminService {
    private bcryptRound: number;
  constructor(private prismaService: PrismaService) {
    this.bcryptRound = parseInt(process.env['BCRYTP_SALT_ROUND']) || 10
  }

  async createAdmin(createAdminDto: CreateAdmin) {
    const hashPassword = bcrypt.hashSync(createAdminDto.password, this.bcryptRound)
    try {
      const adminData = await this.prismaService.admin.create({
        data: {
          username: createAdminDto.username,
          password: hashPassword,
        },
      });
      return instanceToPlain(adminData, {excludePrefixes: ['password']})
    } catch (error) {
        throw new NotFoundException(`Admin with username (${createAdminDto.username}) exist already.`)
    }   
  }

  async getAllAdmins(){
    const adminData = await this.prismaService.admin.findMany();
    return instanceToPlain(adminData, {excludePrefixes: ['password']})
  }
}
