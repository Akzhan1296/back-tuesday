import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { emailAdapter } from "../adapter/email-adapter";
import { jwtUtility } from "../application/jwt-utility";
import { authService } from "../domain/auth-service";
import { inputValidators, sumErrorsMiddleware } from "../middlewares/input-validator-middleware";
import { hasUserMiddleware, isUserAlreadyConfirmedMiddleware } from "../middlewares/users-middleware";
import { blockIpMiddleWare } from '../middlewares/block-ip-middleware';

export const authRouter = Router({});

authRouter.use(blockIpMiddleWare);

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
  hasUserMiddleware,
  inputValidators.email,
  inputValidators.login,
  inputValidators.password,
  sumErrorsMiddleware,
  async (req: Request, res: Response) => {
    const email = req.body.email;
    const login = req.body.login;
    const password = req.body.password;

    await authService.registration(email, login, password);

    res.status(204).send();
  });

authRouter.post('/registration-confirmation',
  async (req: Request, res: Response) => {
    try {
      const code = new ObjectId(req.body.code);

      const user = await authService.getUserByCode(code);
      console.log(user);

      if (user && user.confirmCode) {
        return res.status(400).send({
          errorsMessages: [{
            message: "bad value",
            field: "code"
          }]
        })
      }

      await authService.confirmRegistrationCode(code);
      res.status(204).send();
    } catch (err) {
      res.status(400).send({
        errorsMessages: [{
          message: "bad value",
          field: "code"
        }]
      })
    }

  });

authRouter.post('/registration-email-resending',
  isUserAlreadyConfirmedMiddleware,
  inputValidators.email,
  sumErrorsMiddleware,
  async (req: Request, res: Response) => {
    const email = req.body.email;
    await authService.resendCode(email);

    res.status(204).send();
  });

