import { registerProvider } from "@tsed/di";
import { PostgresDataSource } from "../datasources/PostgresDatasource";
import { Party } from "../models/entity/Party";

export const PartyRepository = PostgresDataSource.getRepository(Party);
export const PARTY_REPOSITORY = Symbol.for("PartyRepository");
export type PARTY_REPOSITORY = typeof PartyRepository;

registerProvider({
  provide: PARTY_REPOSITORY,
  useValue: PartyRepository
});
