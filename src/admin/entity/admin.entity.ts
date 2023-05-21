import { Admin } from "@prisma/client";
import { Exclude } from "class-transformer";

export class AdminEntity implements Admin{
    id: number;
    username: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}