import { type IUserService, type User } from "./types";
import he from "he";
import { createUser } from "../../model/user/createUser";
import { findUserByEmail } from "../../model/user/findUser/findUserByEmail";
import { findUserById } from "../../model/user/findUser/findUserById";
import { findUsers } from "../../model/user/findUser/findUsers";
import { type ICreateUser } from "../../routes/userController/createUser/types";
import { passwordHashing } from "../util/passwordHashing";

class UserService implements IUserService {
  async createUser(user: ICreateUser) {
    if (!user) return null;
    console.log(user, 13);
    const hashPassword = await passwordHashing(user.password);
    if (!hashPassword) return null;

    const newUser: ICreateUser = {
      email: he.decode(user.email),
      password: hashPassword,
      agreement: user.agreement,
      name: he.decode(user.name),
      dateOfBirth: user.dateOfBirth,
      phoneNumber: user.phoneNumber,
    };

    // todo: validate user
    return await createUser(newUser);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    if (!email) {
      return null;
    }

    const decodedEmail = he.decode(email);

    return await findUserByEmail(decodedEmail);
  }

  async getUserById(id: number): Promise<User | null> {
    if (!id) return null;
    return await findUserById(id);
  }

  async updateUser(user: User): Promise<User> {
    return user;
  }

  // todo: implement
  async deleteUser(id: number): Promise<void> {
    console.log(id);
    await Promise.resolve();
  }

  async getUsers(): Promise<User[] | null> {
    return await findUsers();
  }
}

export default new UserService();
