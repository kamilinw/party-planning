import { Inject, Service } from "@tsed/di";
import { ResourceNotFoundException } from "../models/exception";
import { TASK_REPOSITORY } from "../repositories/TaskRepository";
import { Task } from "../models/entity/Task";

@Service()
export class TaskService {
  @Inject(TASK_REPOSITORY)
  protected taskRepository: TASK_REPOSITORY;

  getTask(id: string) {
    return this.taskRepository.findOneByOrFail({ id }).catch((error) => {
      throw new ResourceNotFoundException(error.message);
    });
  }

  async saveTask(task: Task) {
    return await this.taskRepository.save(task);
  }
}
