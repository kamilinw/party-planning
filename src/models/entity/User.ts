import { Required } from "@tsed/schema";
import { IsEmail, IsEnum } from "class-validator";
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRoles } from "../enums/UserRoles";

export class User {
  @Required()
  @PrimaryGeneratedColumn("uuid", {
    name: "id"
  })
  id?: string;

  @Required()
  @IsEmail()
  email: string;

  password: string;

  @IsEnum(UserRoles)
  role: UserRoles;

  @UpdateDateColumn()
  @Required()
  updatedAt?: Date;

  @CreateDateColumn()
  @Required()
  createdAt?: Date;
}
