import { Controller } from "@tsed/di";
import { BodyParams } from "@tsed/platform-params";
import { Post } from "@tsed/schema";
import { TaskFacade } from "../facades/TaskFacade";
import { TaskDto } from "../models/dto/TaskDto";
import { Task } from "../models/entity/Task";

@Controller("/task")
export class TaskController {
  constructor(private taskFacade: TaskFacade) {}

  @Post("/")
  createTask(@BodyParams() taskDto: TaskDto): Promise<Task> {
    return this.taskFacade.createTask(taskDto);
  }
}
