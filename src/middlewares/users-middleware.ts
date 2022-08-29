import { NextFunction, Request, Response } from "express";
import { queryRepository } from "../repositories/query-db-repository";

export const hasUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {

  const email = req.body.email;
  const login = req.body.login;

  const getUserByLogin = await queryRepository.findByLogin(login);

  if (getUserByLogin) {
    return res.status(400).send({
      errorsMessages: [{
        message: "user already exist",
        field: "login"
      }],
    });
  }

  const getUserByEmail = await queryRepository.findUserByEmail(email);

  if (getUserByEmail) {
    return res.status(400).send({
      errorsMessages: [{
        message: "user already exist",
        field: "email"
      }],
    });
  }

  next();
}

export const isUserAlreadyConfirmedMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email;

  const getUserByEmail = await queryRepository.findUserByEmail(email);

  if (getUserByEmail && getUserByEmail.isConfirmed) {
    return res.status(400).send({
      errorsMessages: [{
        message: "user already confirmed email",
        field: "email"
      }]
    })
  }

  if (!getUserByEmail) {
    return res.status(400).send({
      errorsMessages: [{
        message: "user does not exist",
        field: "email"
      }]
    })
  }


  next();
  return;

}