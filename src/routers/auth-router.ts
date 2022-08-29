import { Router } from "express";

//middleware
import { inputValidators, sumErrorsMiddleware } from "../middlewares/input-validator-middleware";
import { hasUserMiddleware, isUserAlreadyConfirmedMiddleware } from "../middlewares/users-middleware";
import { userAuthMiddleware, userRefreshMiddleware } from "../middlewares/auth-middleware";
import { blockIpMiddleWare } from "../middlewares/block-ip-middleware";
import { authControllerInstance } from "../composition-roots/auth-root";


export const authRouter = Router({});
authRouter.use(blockIpMiddleWare);

authRouter.post('/login', authControllerInstance.login.bind(authControllerInstance));

authRouter.post('/registration',
    hasUserMiddleware,
    inputValidators.email,
    inputValidators.login,
    inputValidators.password,
    sumErrorsMiddleware,
    authControllerInstance.registration.bind(authControllerInstance));

authRouter.post('/registration-confirmation',
    inputValidators.code,
    sumErrorsMiddleware,
    authControllerInstance.registrationConfirmation.bind(authControllerInstance));

authRouter.post('/registration-email-resending',
    isUserAlreadyConfirmedMiddleware,
    inputValidators.email,
    sumErrorsMiddleware,
    authControllerInstance.emailResending.bind(authControllerInstance));

authRouter.get('/me', userAuthMiddleware, authControllerInstance.me.bind(authControllerInstance));

authRouter.post('/refresh-token', userRefreshMiddleware,
    authControllerInstance.refreshToken.bind(authControllerInstance));

authRouter.post('/logout', userRefreshMiddleware, authControllerInstance.logout.bind(authControllerInstance));
