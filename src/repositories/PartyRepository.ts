import { registerProvider } from "@tsed/di";
import { PostgresDataSource } from "../datasources/PostgresDatasource";
import { Party } from "../models/entity/Party";

export const PartyRepository = PostgresDataSource.getRepository(Party).extend({
  getPartyById(id: string): Promise<Party> {
    return this.createQueryBuilder("party")
      .leftJoinAndSelect("party.tasks", "task")
      .andWhere("party.id = :id", { id })
      .select("CASE WHEN COUNT(task.done) != 0 THEN ((COUNT(CASE WHEN task.done THEN 1 END)*100) / COUNT(task.done)) END", "progress")
      .addSelect("SUM(task.actualCost)", "expenses")
      .addSelect("SUM(task.plannedCost)", "plannedBudget")
      .addSelect("party.id", "id")
      .addSelect("party.date", "date")
      .addSelect("party.name", "name")
      .addSelect("party.updatedAt", "updatedAt")
      .addSelect("party.createdAt", "createdAt")
      .groupBy("party.id")
      .getRawOne();
  },

  getGuestsData(id: string): Promise<{ guestInvited: number; guestConfirmed: number }> {
    return this.createQueryBuilder("party")
      .leftJoinAndSelect("party.guests", "guest")
      .andWhere("party.id = :id", { id })
      .select(
        "SUM(CASE WHEN guest.confirmed and guest.plusOne THEN 2 WHEN guest.confirmed and guest.plusOne = false THEN 1 END)",
        "guestConfirmed"
      )
      .addSelect("sum(CASE WHEN guest.plusOne IS NOT NULL THEN( CASE WHEN guest.plusOne then 2 ELSE 1 END) END)", "guestInvited")
      .getRawOne();
  }
});

export const PARTY_REPOSITORY = Symbol.for("PartyRepository");
export type PARTY_REPOSITORY = typeof PartyRepository;

registerProvider({
  provide: PARTY_REPOSITORY,
  useValue: PartyRepository
});
