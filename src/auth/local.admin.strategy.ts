import { PassportStrategy } from "@nestjs/passport";
import { Admin, User } from "@prisma/client";
import { Strategy } from "passport-local";
import { AuthenticationService } from "./authentication.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategyAdmin extends PassportStrategy(Strategy, 'admin'){

    constructor(private readonly authenticationService: AuthenticationService){
        super({
            usernameField: 'email',
        });
    }
    
    async validate(username: string, password:string): Promise<Admin> {
        const admin =  await this.authenticationService.validateAdmin(username, password);
        if (!admin){
            throw new UnauthorizedException();  
        }
        return admin;
    }
}