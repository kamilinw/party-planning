import { Required } from "@tsed/schema";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

  @Column()
  @Required()
  guests: number; //TODO replace with array of Guest entity

  @Column()
  @Required()
  tasks: number; //TODO replace with array of Task entity

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
