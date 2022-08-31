import { Router } from "express";
import { container } from "../composition-roots/container";
import { AuthController } from "../controllers/auth-controller";

//middleware
import { inputValidators, sumErrorsMiddleware } from "../middlewares/input-validator-middleware";
import { hasUserMiddleware, isUserAlreadyConfirmedMiddleware } from "../middlewares/users-middleware";
import { userAuthMiddleware, userRefreshMiddleware } from "../middlewares/auth-middleware";
import { blockIpMiddleWare } from "../middlewares/block-ip-middleware";

export const authRouter = Router({});
const authController = container.resolve(AuthController);

authRouter.use(blockIpMiddleWare);

authRouter.post('/login', authController.login.bind(authController));

authRouter.post('/registration',
    hasUserMiddleware,
    inputValidators.email,
    inputValidators.login,
    inputValidators.password,
    sumErrorsMiddleware,
    authController.registration.bind(authController));

authRouter.post('/registration-confirmation',
    inputValidators.code,
    sumErrorsMiddleware,
    authController.registrationConfirmation.bind(authController));

authRouter.post('/registration-email-resending',
    isUserAlreadyConfirmedMiddleware,
    inputValidators.email,
    sumErrorsMiddleware,
    authController.emailResending.bind(authController));

authRouter.get('/me', userAuthMiddleware, authController.me.bind(authController));

authRouter.post('/refresh-token', userRefreshMiddleware,
    authController.refreshToken.bind(authController));

authRouter.post('/logout', userRefreshMiddleware, authController.logout.bind(authController));
