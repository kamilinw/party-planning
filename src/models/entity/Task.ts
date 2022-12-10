import { Required } from "@tsed/schema";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Party } from "./Party";

@Entity()
export class Task {
  @Required()
  @PrimaryGeneratedColumn("uuid", {
    name: "id"
  })
  id?: string;

  @Column({
    length: 64
  })
  @Required()
  name: string;

  @Column({
    length: 256,
    nullable: true
  })
  @Required()
  description?: string;

  @Column({ nullable: true })
  @Required()
  plannedCost?: number;

  @Column({ default: 0 })
  @Required()
  actualCost?: number;

  @Column({ default: false })
  @Required()
  done?: boolean;

  @Column({ nullable: true })
  @Required()
  executionDate?: Date;

  @ManyToOne(() => Party, (party) => party.tasks, { onDelete: "CASCADE" })
  party?: Party;

  @UpdateDateColumn()
  @Required()
  updatedAt?: Date;

  @CreateDateColumn()
  @Required()
  createdAt?: Date;
}
