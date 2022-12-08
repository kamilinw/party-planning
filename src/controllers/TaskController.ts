import { Controller } from "@tsed/di";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Get, Post } from "@tsed/schema";
import { TaskFacade } from "../facades/TaskFacade";
import { TaskDto } from "../models/dto/TaskDto";
import { Task } from "../models/entity/Task";

@Controller("/task")
export class TaskController {
  constructor(private taskFacade: TaskFacade) {}

  @Get("/:id")
  async getTask(@PathParams("id") id: string): Promise<Task> {
    const task = await this.taskFacade.getTask(id);
    return { ...task };
  }

  @Post("/")
  createTask(@BodyParams() taskDto: TaskDto): Promise<Task> {
    return this.taskFacade.createTask(taskDto);
  }
}
