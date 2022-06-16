import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { emailAdapter } from "../adapter/email-adapter";
import { jwtUtility } from "../application/jwt-utility";
import { authService } from "../domain/auth-service";
import { inputValidators, sumErrorsMiddleware } from "../middlewares/input-validator-middleware";
import { hasUserMiddleware } from "../middlewares/users-middleware";


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
  // inputValidators.code,
  sumErrorsMiddleware,
  async (req: Request, res: Response) => {
    try {
      const code = new ObjectId(req.body.code);
      await authService.confirmRegistrationCode(code);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({
        errorsMessages: [{
          message: "bad value",
          field: "code"
        }],
        resultCode: 1,
      })
    }

  });

authRouter.post('/registration-email-resending',
  inputValidators.email,
  sumErrorsMiddleware,
  async (req: Request, res: Response) => {
    const email = req.body.email;
    await authService.resendCode(email);

    res.status(204).send();
  });

