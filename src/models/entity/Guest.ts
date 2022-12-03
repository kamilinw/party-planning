import { Required } from "@tsed/schema";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Guest {
  @PrimaryGeneratedColumn("uuid", {
    name: "id"
  })
  id: string;

  @Column()
  @Required()
  firstName: string;

  @Column()
  @Required()
  lastName: string;

  @Column()
  @Required()
  age: number;

  @Column()
  @Required()
  plusOne: boolean;

  @Column()
  @Required()
  confirmed: boolean;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
