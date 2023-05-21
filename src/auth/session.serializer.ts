import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
constructor(private readonly prismaService: PrismaService){
    super();
}
    
    serializeUser(user: User, done: Function) {
        console.log('serializeUser called with user:', user);

        done(null, user.id);
    }

   async deserializeUser(payload: number, done: Function) {
        console.log('deserializeUser called with payload:', payload);
        const user = await this.prismaService.user.findFirst({
            where: {
                id: payload,
            }
        })
        console.log('User found:', user);
        if(!user){
            console.log('User not found');
            done(new Error(`User not found`));
            return;
        }
        console.log('User authenticated:', user);
        done(null, user);
    }

    
}