import { Controller } from "@tsed/di";
import { BodyParams } from "@tsed/platform-params";
import { Post } from "@tsed/schema";
import { TaskDto } from "../models/dto/TaskDto";
import { Task } from "../models/entity/Task";

@Controller("/task")
export class TaskController {
  @Post("/")
  createTask(@BodyParams() taskDto: TaskDto): Task {
    return { ...taskDto };
  }
}
