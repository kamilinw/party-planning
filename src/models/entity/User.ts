import { Required } from "@tsed/schema";
import { IsEmail, IsEnum } from "class-validator";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRoles } from "../enums/UserRoles";
import { Party } from "./Party";

@Entity()
export class User {
  @Required()
  @PrimaryGeneratedColumn("uuid", {
    name: "id"
  })
  id?: string;

  @Column({ unique: true, length: 64 })
  @Required()
  @IsEmail()
  email: string;

  @Column({ length: 64 })
  password: string;

  @Column({ length: 16, enum: UserRoles, default: UserRoles.USER })
  @IsEnum(UserRoles)
  role?: string;

  @OneToMany(() => Party, (party) => party.host)
  parties?: Party[];

  @UpdateDateColumn()
  @Required()
  updatedAt?: Date;

  @CreateDateColumn()
  @Required()
  createdAt?: Date;
}
