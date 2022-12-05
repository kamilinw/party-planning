import { Required } from "@tsed/schema";
import { IsDate } from "class-validator";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Guest } from "./Guest";

@Entity()
export class Party {
  @PrimaryGeneratedColumn("uuid", {
    name: "id"
  })
  id: string;

  @Column()
  @Required()
  name: string;

  @Column()
  @Required()
  @IsDate()
  date: Date;

  @Column()
  @Required()
  progress: number;

  @Column()
  @Required()
  plannedBudget: number;

  @Column()
  @Required()
  expenses: number;

  @OneToMany(() => Guest, (guest) => guest.party)
  guests: Guest[];

  @Column()
  @Required()
  tasks: number; //TODO replace with array of Task entity

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
