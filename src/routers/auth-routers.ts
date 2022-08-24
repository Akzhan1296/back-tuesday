import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { jwtUtility } from "../application/jwt-utility";
import { authService } from "../domain/auth-service";
import { inputValidators, sumErrorsMiddleware } from "../middlewares/input-validator-middleware";
import { hasUserMiddleware, isUserAlreadyConfirmedMiddleware } from "../middlewares/users-middleware";
import { blockIpMiddleWare } from '../middlewares/block-ip-middleware';
import { userAuthMiddleware, userRefreshMiddleware } from "../middlewares/auth-middleware";
import { jwtService } from "../domain/jwt-service";

export const authRouter = Router({});

authRouter.use(blockIpMiddleWare);

class AuthController {
  async login(req: Request, res: Response) {
    const user = await authService.checkCredentials(req.body.login, req.body.password)
    if (user) {
      const token = await jwtUtility.createJWT(user)
      const refreshToken = await jwtUtility.createRefreshJWT(user);

      const payload = await jwtUtility.extractPayloadFromRefreshToken(refreshToken);

      if (payload) {
        const successfullyAddedRefreshToken = await jwtService.addRefreshToken({ ...payload, tokenId: new ObjectId(payload.tokenId) });
        if (successfullyAddedRefreshToken) {
          res.cookie('refreshToken', `Bearer ${refreshToken}`, { httpOnly: true, secure: false });
          res.status(200).send({ accessToken: token });
          return;
        }
      }
    }
    return res.status(401).send({ error: 'in this place' });
  }
  async registration(req: Request, res: Response) {
    const email = req.body.email;
    const login = req.body.login;
    const password = req.body.password;

    await authService.registration(email, login, password);

    res.status(204).send();
  }
  async registrationConfirmation(req: Request, res: Response) {
    const code = new ObjectId(req.body.code);
    const user = await authService.getUserByCode(code);

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
  }
  async emailResending(req: Request, res: Response) {
    const email = req.body.email;
    await authService.resendCode(email);
    res.status(204).send();
  }
  async me(req: Request, res: Response) {
    const user = req.user;
    if (user) {
      const { login, email, _id } = user;
      return res.status(200).send({
        login, email, userId: _id
      });
    }
  }
  async refreshToken(req: Request, res: Response) {
    const user = req.user;
    const tokenId = req.tokenId;

    const deletedOldRefresh = await jwtService.deleteRefreshToken(new ObjectId(tokenId));

    if (deletedOldRefresh && user) {
      const token = await jwtUtility.createJWT(user)
      const refreshToken = await jwtUtility.createRefreshJWT(user);

      const payload = await jwtUtility.extractPayloadFromRefreshToken(refreshToken);
      if (payload) {
        const successfullyAddedRefreshToken = await jwtService.addRefreshToken({ ...payload, tokenId: new ObjectId(payload.tokenId) });
        if (successfullyAddedRefreshToken) {
          res.cookie('refreshToken', `Bearer ${refreshToken}`, { httpOnly: true, secure: false })
          res.status(200).send({ accessToken: token });
          return;
        }
      }
    }
    res.status(401).send();
  }
  async logout(req: Request, res: Response) {
    const tokenId = req.tokenId;

    const deletedOldRefresh = await jwtService.deleteRefreshToken(new ObjectId(tokenId));

    if (deletedOldRefresh) {
      return res.status(204).send();
    }
    res.status(401).send();
  }
}

const authControllerInstance = new AuthController();

authRouter.post('/login', authControllerInstance.login);

authRouter.post('/registration',
  hasUserMiddleware,
  inputValidators.email,
  inputValidators.login,
  inputValidators.password,
  sumErrorsMiddleware,
  authControllerInstance.registration);

authRouter.post('/registration-confirmation',
  inputValidators.code,
  sumErrorsMiddleware,
  authControllerInstance.registrationConfirmation);

authRouter.post('/registration-email-resending',
  isUserAlreadyConfirmedMiddleware,
  inputValidators.email,
  sumErrorsMiddleware,
  authControllerInstance.emailResending);

authRouter.get('/me', userAuthMiddleware, authControllerInstance.me);

authRouter.post('/refresh-token', userRefreshMiddleware,
  authControllerInstance.refreshToken);

authRouter.post('/logout', userRefreshMiddleware, authControllerInstance.logout);
