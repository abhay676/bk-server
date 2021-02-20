import uniqid from 'uniqid';
import { Document } from 'mongoose';
import UserModel from '../models/User.model';
import { IUser } from '../../interfaces/IUser';
import AuthService from './auth.service';
import DateTimeFormat = Intl.DateTimeFormat;

class UserService {
  newUser(params: IUser) {
    return new Promise((resolve, reject) => {
      params.userId = uniqid();
      const user = new UserModel(params);
      user
        .save()
        .then((res: Document) => resolve(res))
        .catch((err: Error) => reject(err));
    });
  }
  login(params: UserLogin) {
    return new Promise(async (resolve, reject) => {
      const userExists = await UserModel.findOne({ email: params.email });
      let result: UserLoginResult = { isValid: false, data: [] };
      if (userExists) {
        const isValid = await AuthService.validatePwd(userExists.password, params.password);
        if (isValid) {
          result.isValid = true;
          result.data = {
            name: userExists.name,
            email: userExists.email,
            userId: userExists.userId,
            joinedAt: userExists.createdAt,
            companyName: userExists.companyName,
          };
          resolve(result);
        } else {
          resolve(result);
        }
      } else {
        reject(result);
      }
    });
  }
}

type UserLogin = {
  email: string;
  password: string;
};

export type UserLoginResult = {
  isValid: boolean;
  data: DataObj | [];
};

type DataObj = {
  name: string;
  email: string;
  companyName: string;
  userId: string;
  joinedAt: DateTimeFormat;
};
export default new UserService();
