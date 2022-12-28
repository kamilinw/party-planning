import { Required } from "@tsed/schema";
import { IsDate } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Guest } from "./Guest";
import { Task } from "./Task";
import { User } from "./User";

@Entity()
export class Party {
  @PrimaryGeneratedColumn("uuid", {
    name: "id"
  })
  @Required()
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

  @Required()
  progress?: number;

  @Required()
  plannedBudget?: number;

  @Required()
  expenses?: number;

  @Required()
  guestInvited?: number;

  @Required()
  guestConfirmed?: number;

  @OneToMany(() => Guest, (guest) => guest.party)
  guests?: Guest[];

  @OneToMany(() => Task, (task) => task.party)
  tasks?: Task[];

  @ManyToOne(() => User, (user) => user.parties, { onDelete: "CASCADE" })
  host?: User;

  @UpdateDateColumn()
  @Required()
  updatedAt?: Date;

  @CreateDateColumn()
  @Required()
  createdAt?: Date;
}
