import { Required } from "@tsed/schema";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Party } from "./Party";

@Entity()
export class Guest {
  @PrimaryGeneratedColumn("uuid", {
    name: "id"
  })
  @Required()
  id?: string;

  @Column({
    length: 32
  })
  @Required()
  firstName: string;

  @Column({
    length: 32
  })
  @Required()
  lastName: string;

  @Column()
  @Required()
  age: number;

  @Column()
  @Required()
  plusOne: boolean;

  @Column({ default: false })
  @Required()
  confirmed: boolean;

  @ManyToOne(() => Party, (party) => party.guests, { onDelete: "CASCADE" })
  party?: Party;

  @UpdateDateColumn()
  @Required()
  updatedAt?: Date;

  @CreateDateColumn()
  @Required()
  createdAt?: Date;
}
