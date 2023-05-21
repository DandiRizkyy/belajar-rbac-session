import { IsNotEmpty, IsString } from "class-validator";

export class LoginAdmin{
    
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}