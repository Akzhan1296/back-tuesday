import { Request, Response, Router } from "express";
import { jwtUtility } from "../application/jwt-utility";
import { authService } from "../domain/auth-service";
import { inputValidators, sumErrorsMiddleware } from "../middlewares/input-validator-middleware";

export const authRouter = Router({});

authRouter.post('/login', async (req: Request, res: Response) => {
  const user = await authService.checkCredentials(req.body.login, req.body.password)
  if (user) {
    const token = await jwtUtility.createJWT(user)
    res.status(200).send({ token });
  } else {
    res.sendStatus(401)
  }
});

authRouter.post('/registration',
  inputValidators.email,
  inputValidators.login,
  inputValidators.password,
  sumErrorsMiddleware,
  async (req: Request, res: Response) => {
    res.status(204).send();
  });

authRouter.post('/registration-confirmation',
  inputValidators.code,
  sumErrorsMiddleware,
  async (req: Request, res: Response) => {
    res.status(204).send();
  });

authRouter.post('/registration-email-resending',
  inputValidators.email,
  sumErrorsMiddleware,
  async (req: Request, res: Response) => {
    res.status(204).send();
  });

