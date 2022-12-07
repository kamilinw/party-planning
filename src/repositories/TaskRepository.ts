import { registerProvider } from "@tsed/di";
import { PostgresDataSource } from "../datasources/PostgresDatasource";
import { Task } from "../models/entity/Task";

export const TaskRepository = PostgresDataSource.getRepository(Task);
export const TASK_REPOSITORY = Symbol.for("TaskRepository");
export type TASK_REPOSITORY = typeof TaskRepository;

registerProvider({
  provide: TASK_REPOSITORY,
  useValue: TaskRepository
});
