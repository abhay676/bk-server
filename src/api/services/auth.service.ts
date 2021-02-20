import bcrypt from 'bcrypt';

class AuthService {
  async validatePwd(userPwd: string, pwd: string): Promise<boolean> {
    return await bcrypt.compare(pwd, userPwd);
  }
}

export default new AuthService();
