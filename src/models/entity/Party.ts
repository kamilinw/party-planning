import { Required } from "@tsed/schema";
import { IsDate } from "class-validator";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Guest } from "./Guest";

@Entity()
export class Party {
  @PrimaryGeneratedColumn("uuid", {
    name: "id"
  })
  id?: string;

  @Column({
    length: 64
  })
  @Required()
  name: string;

  @Column()
  @Required()
  @IsDate()
  date: Date;

  @Column({ default: 0 })
  progress?: number;

  @Column({ default: 0 })
  plannedBudget?: number;

  @Column({ default: 0 })
  expenses?: number;

  @OneToMany(() => Guest, (guest) => guest.party)
  guests?: Guest[];

  @Column({ default: 0 })
  tasks?: number; //TODO replace with array of Task entity

  @UpdateDateColumn()
  updatedAt?: Date;

  @CreateDateColumn()
  createdAt?: Date;
}
