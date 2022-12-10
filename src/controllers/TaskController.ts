import { Controller } from "@tsed/di";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Get, Post, Delete, Returns } from "@tsed/schema";
import { TaskFacade } from "../facades/TaskFacade";
import { TaskDto } from "../models/dto/TaskDto";

@Controller("/task")
export class TaskController {
  constructor(private taskFacade: TaskFacade) {}

  @Get("/:id")
  async getTask(@PathParams("id") id: string) {
    return await this.taskFacade.getTask(id);
  }

  @Delete("/:id")
  async deleteTask(@PathParams("id") id: string) {
    return await this.taskFacade.deleteTask(id);
  }

  @Post("/")
  @Returns(201)
  createTask(@BodyParams() taskDto: TaskDto) {
    return this.taskFacade.createTask(taskDto);
  }
}
