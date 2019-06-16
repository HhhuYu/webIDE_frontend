import { Role } from "./role";

export class User {
    _id: number;
    email: string;
    username: string;
    create_time: Date;
    update_time: Date;
    role: Role;
    enable: boolean;
    path: string;
    token?: string;
}

