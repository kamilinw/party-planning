import { Required } from "@tsed/schema";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Party {
  @ObjectIdColumn()
  id: number;

  @Column()
  @Required()
  name: string;

  @Column()
  @Required()
  numberOfGuests: number;
}
