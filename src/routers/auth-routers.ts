import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { emailAdapter } from "../adapter/email-adapter";
import { jwtUtility } from "../application/jwt-utility";
import { authService } from "../domain/auth-service";
import { inputValidators, sumErrorsMiddleware } from "../middlewares/input-validator-middleware";
import { hasUserMiddleware, isUserAlreadyConfirmedMiddleware } from "../middlewares/users-middleware";
import { blockIpMiddleWare } from '../middlewares/block-ip-middleware';
import { userAuthMiddleware } from "../middlewares/auth-middleware";

export const authRouter = Router({});

authRouter.use(blockIpMiddleWare);

authRouter.post('/login', async (req: Request, res: Response) => {
  const user = await authService.checkCredentials(req.body.login, req.body.password)
  if (user) {
    const token = await jwtUtility.createJWT(user)
    const refreshToken = await jwtUtility.createRefreshJWT(user);

    res.cookie('JWT refreshToken', refreshToken, { httpOnly: true })
    res.status(200).send({ accessToken: token });
  } else {
    res.sendStatus(401);
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
  inputValidators.code,
  sumErrorsMiddleware,
  async (req: Request, res: Response) => {

    const code = new ObjectId(req.body.code);
    const user = await authService.getUserByCode(code);
    console.log(user);

    if (user && user.isConfirmed) {
      return res.status(400).send({
        errorsMessages: [{
          message: "bad value",
          field: "code"
        }]
      })
    }

    await authService.confirmRegistrationCode(code);
    res.status(204).send();
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

authRouter.get('/me', userAuthMiddleware, async (req: Request, res: Response) => {
  const user = req.user;

  const { login, email, _id } = user;

  res.status(200).send({
    login, email, id: _id
  });

});