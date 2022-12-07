import { Service } from "@tsed/di";
import { TaskDto } from "src/models/dto/TaskDto";
import { Task } from "src/models/entity/Task";

@Service()
export class TaskMapper {
  public toEntity(taskDto: TaskDto): Task {
    return {
      ...taskDto
    };
  }
}
