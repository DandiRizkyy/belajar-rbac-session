import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { Admin, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SessionSerializerAdmin extends PassportSerializer {
constructor(private readonly prismaService: PrismaService){
    super();
}

    deserializeUser(payload: number, done: Function) {
        const admin = this.prismaService.admin.findFirst({
            where: {
                id: payload,
            }
        })

        if(!admin){
            done(new Error(`Admin not found`));
            return;
        }
        done(null, admin);
    }

    serializeUser(admin: Admin, done: Function) {
        done(null, admin.id);
    }
}