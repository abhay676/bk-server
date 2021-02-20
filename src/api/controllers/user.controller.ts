import { NextFunction, Request, Response } from 'express';
import useragent from 'useragent';
import ip from 'ip';
import { StatusCodes } from 'http-status-codes';
import Validation from '../../helpers/Validations';
import GenerateResponse from '../../helpers/Response';
import UserService, { UserLoginResult } from '../services/user.service';

async function userSignUp(res: Response, params: { [key: string]: string }) {
  try {
    const fields = ['email', 'name', 'password', 'companyName', 'country'];
    const isValid = Validation.validate(fields, params);
    if (isValid.invalid) {
      const response = new GenerateResponse(res, 403, 'Validation Failed', isValid.fields);
      return response.apiResponse();
    }
    const userParams = {
      name: params.name,
      email: params.email,
      password: params.password,
      companyName: params.companyName,
      country: params.country,
      activeToken: null,
      userAgent: params.userAgent.toString(),
      ip: params.ip,
    };
    const result = await UserService.newUser(userParams);
    // @ts-ignore
    const response = new GenerateResponse(res, StatusCodes.CREATED, 'Success', result);
    return response.apiResponse();
  } catch (e) {
    return e;
  }
}

async function userLogin(res: Response, params: { [key: string]: string }, next: NextFunction) {
  try {
    const fields = ['email', 'password'];
    const isValid = Validation.validate(fields, params);
    if (isValid.invalid) {
      const response = new GenerateResponse(res, StatusCodes.NOT_FOUND, 'Validation Failed', isValid.fields);
      return response.apiResponse();
    }
    const userParams = {
      email: params.email,
      password: params.password,
    };
    const result = <UserLoginResult>await UserService.login(userParams);
    console.log(result);
    if (!result.isValid) {
      console.log('invalid');
      const response = new GenerateResponse(res, StatusCodes.NOT_FOUND, 'Error', {
        message: 'User Credentials does not match',
        data: null,
      });
      return response.apiResponse();
    }
    const response = new GenerateResponse(res, StatusCodes.OK, 'Success', result.data);
    return response.apiResponse();
  } catch (e) {
    next(e);
  }
}

class UserController {
  signup(req: Request, res: Response) {
    return new Promise((resolve, reject) => {
      const params = req.body ? req.body : null;
      params.userAgent = useragent.parse(req.headers['user-agent']);
      params.ip = ip.address();
      userSignUp(res, params)
        .then((data) => {
          resolve(data);
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  }
  login(req: Request, res: Response, next: NextFunction) {
    return new Promise((resolve, reject) => {
      const params = req.body ? req.body : null;
      userLogin(res, params, next)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
}

export default new UserController();
