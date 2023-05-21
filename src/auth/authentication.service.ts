import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUser} from './dto/input-auth.dto';
import { Admin, User } from '@prisma/client';
import { instanceToPlain } from 'class-transformer';
import { CreateAdmin } from 'src/admin/dto/create-admin.dto';

@Injectable()
export class AuthenticationService {
    private readonly bcryptRound: number
    constructor(private prismaService: PrismaService){
        this.bcryptRound = parseInt(process.env['BCRYPT_SALT_ROUND']) || 10
    }

    //register user biasa
    async registerUser(authDto: CreateUser){
        const hashPassword = bcrypt.hashSync(authDto.password, this.bcryptRound);
        try {
            const user = await this.prismaService.user.create({
                data: {
                    email: authDto.email,
                    password: hashPassword
                }
            })
    
            return instanceToPlain(user, {excludePrefixes:['password']})
            
        } catch (error) {
            if (error.code === 'P2002' && error.meta.target.includes('email')){
                return `User with email ${authDto.email} already exists.`
            }
        }
        
    }

    // register admin
    async registerAdmin(createAdminDto: CreateAdmin){
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

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.prismaService.user.findFirst({
            where:{
                email,
            }
        })

        if (!user){
            return null;
        }

        const isPasswordMatch: boolean = bcrypt.compareSync(password, user.password)
        if (!isPasswordMatch){
            return null;
        }

        return user;
    }

    async validateAdmin(username: string, password: string): Promise<Admin | null> {
        const admin = await this.prismaService.admin.findFirst({
            where:{
                username,
            }
        })
        if (!admin){
            return null;
        }
        const isPasswordMatch: boolean = bcrypt.compareSync(password, admin.password)
        if (!isPasswordMatch){
            return null;
        }

        return admin;
    }
}
