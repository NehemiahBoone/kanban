import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class TaskService {


  async getById(id, userEmail) {
    let data = await dbContext.Tasks.findOne({ _id: id, creatorEmail: userEmail })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this task")
    }
    return data
  }

  async getAllCommentsByTaskId(userEmail) {
    return await dbContext.Comments.find({ creatorEmail: userEmail }).populate("creator", "name picture")
  }

  async create(rawData) {
    let data = await dbContext.Tasks.create(rawData)
    return data
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Tasks.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this task");
    }
    return data;
  }

  async delete(id, userEmail) {
    let data = await dbContext.Tasks.findOneAndRemove({ _id: id, creatorEmail: userEmail });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this task");
    }
  }

}


export const tasksService = new TaskService()