import { Controller } from "@tsed/di";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Get, Post, Delete, Returns, Put, Partial } from "@tsed/schema";
import { TaskUpdate } from "../models/dto/TaskUpdate";
import { TaskFacade } from "../facades/TaskFacade";
import { TaskDto } from "../models/dto/TaskDto";
import { WithAuth } from "../decorators/WithAuth";
import { UserRoles } from "../models/enums/UserRoles";

@WithAuth({ roles: [UserRoles.USER] })
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

  @Put("/:id")
  async updateTask(@PathParams("id") id: string, @BodyParams() @Partial() taskUpdate: TaskUpdate) {
    return await this.taskFacade.updateTask(id, taskUpdate);
  }

  @Post("/")
  @Returns(201)
  createTask(@BodyParams() taskDto: TaskDto) {
    return this.taskFacade.createTask(taskDto);
  }
}
