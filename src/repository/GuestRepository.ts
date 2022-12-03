import { registerProvider } from "@tsed/di";
import { Guest } from "../models/entity/Guest";
import { PostgresDataSource } from "../datasources/PostgresDatasource";

export const GuestRepository = PostgresDataSource.getRepository(Guest);
export const GUEST_REPOSITORY = Symbol.for("GuestRepository");
export type GUEST_REPOSITORY = typeof GuestRepository;

registerProvider({
  provide: GUEST_REPOSITORY,
  useValue: GuestRepository
});
