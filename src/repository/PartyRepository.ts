import { registerProvider } from "@tsed/di";
import { MongodbDataSource } from "../datasources/MongodbDatasource";
import { Party } from "../models/entity/Party";

export const PartyRepository = MongodbDataSource.getRepository(Party);
export const PARTY_REPOSITORY = Symbol.for("PartyRepository");
export type PARTY_REPOSITORY = typeof PartyRepository;

registerProvider({
  provide: PARTY_REPOSITORY,
  useValue: PartyRepository
});
