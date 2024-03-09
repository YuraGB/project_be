import { type IUserService, type User } from "./types";
import he from "he";
import { createUser } from "../../model/user/createUser";
import { findUserByEmail } from "../../model/user/findUser/findUserByEmail";
import { findUserById } from "../../model/user/findUser/findUserById";
import { findUsers } from "../../model/user/findUser/findUsers";
import { type ICreateUser } from "../../routes/userController/createUser/types";

class UserService implements IUserService {
  async createUser(user: ICreateUser) {
    if (!user) return null;

    // todo: validate user
    return await createUser(user);
  }

  async getUserByEmail(email: string) {
    if (!email) {
      return null;
    }

    const decodedEmail = he.decode(email);

    return await findUserByEmail(decodedEmail);
  }

  async getUserById(id: number) {
    if (!id) return null;
    return await findUserById(id);
  }

  async updateUser(user: User) {
    return user;
  }

  async deleteUser(id: number) {
    console.log(id);
    await Promise.resolve();
  }

  async getUsers() {
    return await findUsers();
  }
}

export default new UserService();
