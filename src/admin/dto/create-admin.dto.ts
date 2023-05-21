import { IsNotEmpty, IsString } from "class-validator";

export class CreateAdmin{
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}