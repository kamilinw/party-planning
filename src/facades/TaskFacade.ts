import { Service } from "@tsed/di";
import { TaskDto } from "../models/dto/TaskDto";
import { TaskMapper } from "../mappers/TaskMapper";
import { TaskService } from "../services/TaskService";

@Service()
export class TaskFacade {
  constructor(private taskMapper: TaskMapper, private taskService: TaskService) {}

  getTask(id: string) {
    return this.taskService.getTask(id);
  }

  async createTask(taskDto: TaskDto) {
    const task = this.taskMapper.toEntity(taskDto);
    return await this.taskService.saveTask(task);
  }
}
