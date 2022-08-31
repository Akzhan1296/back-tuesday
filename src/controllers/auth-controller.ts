import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { jwtUtility } from "../utils/jwt-utility";

//application
import { JwtService } from "../application/jwt-service";
import { AuthService } from "../application/auth-service";
import { injectable, inject } from "inversify";


@injectable()
export class AuthController {
  constructor(@inject(JwtService) protected jwtService: JwtService, @inject(AuthService) protected authService: AuthService) {}

  async login(req: Request, res: Response) {
    const user = await this.authService.checkCredentials(req.body.login, req.body.password)
    if (user) {
      const token = await jwtUtility.createJWT(user)
      const refreshToken = await jwtUtility.createRefreshJWT(user);

      const payload = await jwtUtility.extractPayloadFromRefreshToken(refreshToken);

      if (payload) {
        const successfullyAddedRefreshToken = await this.jwtService.addRefreshToken({ ...payload, tokenId: new ObjectId(payload.tokenId) });
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

    await this.authService.registration(email, login, password);

    res.status(204).send();
  }
  async registrationConfirmation(req: Request, res: Response) {
    const code = new ObjectId(req.body.code);
    const user = await this.authService.getUserByCode(code);

    if (user && user.isConfirmed) {
      return res.status(400).send({
        errorsMessages: [{
          message: "bad value",
          field: "code"
        }]
      })
    }

    await this.authService.confirmRegistrationCode(code);
    res.status(204).send();
  }
  async emailResending(req: Request, res: Response) {
    const email = req.body.email;
    await this.authService.resendCode(email);
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

    const deletedOldRefresh = await this.jwtService.deleteRefreshToken(new ObjectId(tokenId));

    if (deletedOldRefresh && user) {
      const token = await jwtUtility.createJWT(user)
      const refreshToken = await jwtUtility.createRefreshJWT(user);

      const payload = await jwtUtility.extractPayloadFromRefreshToken(refreshToken);
      if (payload) {
        const successfullyAddedRefreshToken = await this.jwtService.addRefreshToken({ ...payload, tokenId: new ObjectId(payload.tokenId) });
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

    const deletedOldRefresh = await this.jwtService.deleteRefreshToken(new ObjectId(tokenId));

    if (deletedOldRefresh) {
      return res.status(204).send();
    }
    res.status(401).send();
  }
}
