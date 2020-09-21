import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { commentsService } from '../services/CommentsService'



//PUBLIC
export class CommentsController extends BaseController {
  constructor() {
    super("api/:taskId/comments")
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      .get('', this.getAllCommentsByTaskId)
      .get('/:id', this.getById)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }


  async getAllCommentsByTaskId(req, res, next) {
    try {
      //only gets lists by user who is logged in
      let data = await commentsService.getAllCommentsByTaskId(req.userInfo.email)
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async getById(req, res, next) {
    try {
      let data = await commentsService.getById(req.params.taskId, req.userInfo.email)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await commentsService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await commentsService.edit(req.params.taskId, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      await commentsService.delete(req.params.taskId, req.userInfo.email)
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
}


