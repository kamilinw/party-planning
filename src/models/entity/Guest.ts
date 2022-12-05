import { Required } from "@tsed/schema";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Party } from "./Party";

@Entity()
export class Guest {
  @PrimaryGeneratedColumn("uuid", {
    name: "id"
  })
  id?: string;

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

  @ManyToOne(() => Party, (party) => party.guests)
  party?: Party;

  @UpdateDateColumn()
  updatedAt?: Date;

  @CreateDateColumn()
  createdAt?: Date;
}
