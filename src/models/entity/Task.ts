import { Required } from "@tsed/schema";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Party } from "./Party";

@Entity()
export class Task {
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
  description?: string;

  @Column({ nullable: true })
  plannedCost?: number;

  @Column({ default: 0 })
  actualCost?: number;

  @Column({ default: false })
  done?: boolean;

  @Column({ nullable: true })
  executionDate?: Date;

  @ManyToOne(() => Party, (party) => party.tasks)
  party?: Party;

  @UpdateDateColumn()
  updatedAt?: Date;

  @CreateDateColumn()
  createdAt?: Date;
}
