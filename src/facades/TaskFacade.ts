import { Service } from "@tsed/di";
import { TaskDto } from "../models/dto/TaskDto";
import { TaskMapper } from "../mappers/TaskMapper";
import { TaskService } from "../services/TaskService";
import { PartyService } from "../services/PartyService";

@Service()
export class TaskFacade {
  constructor(private taskMapper: TaskMapper, private taskService: TaskService, private partyService: PartyService) {}

  getTask(id: string) {
    return this.taskService.getTask(id);
  }

  deleteTask(id: string) {
    return this.taskService.deleteTask(id);
  }

  async createTask(taskDto: TaskDto) {
    const task = this.taskMapper.toEntity(taskDto);
    task.party = await this.partyService.getParty(taskDto.partyId);
    return await this.taskService.saveTask(task);
  }
}
