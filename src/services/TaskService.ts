import { Inject, Service } from "@tsed/di";
import { ResourceNotFoundException } from "../models/exception";
import { TASK_REPOSITORY } from "../repositories/TaskRepository";
import { Task } from "../models/entity/Task";
import { ValidationException } from "../models/exception/ValidationException";
import { TaskUpdate } from "../models/dto/TaskUpdate";

@Service()
export class TaskService {
  @Inject(TASK_REPOSITORY)
  protected taskRepository: TASK_REPOSITORY;

  getTask(id: string) {
    return this.taskRepository.findOneByOrFail({ id }).catch((error) => {
      throw new ResourceNotFoundException(error.message);
    });
  }

  updateTask(id: string, taskUpdate: TaskUpdate) {
    return this.taskRepository.update({ id }, taskUpdate).catch((error) => {
      throw new ResourceNotFoundException(error.message);
    });
  }

  deleteTask(id: string) {
    return this.taskRepository.delete({ id }).catch((error) => {
      throw new ValidationException(error.message);
    });
  }

  async saveTask(task: Task) {
    return await this.taskRepository.save(task);
  }
}
