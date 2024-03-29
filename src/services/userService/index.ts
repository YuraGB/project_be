import { type IUserService, type User } from "./types";
import he from "he";
import { createUser } from "../../model/user/createUser";
import { findUserByEmail } from "../../model/user/findUser/findUserByEmail";
import { findUserById } from "../../model/user/findUser/findUserById";
import { findUsers } from "../../model/user/findUser/findUsers";
import { type ICreateUser } from "../../routes/userController/createUser/types";
import { passwordHashing } from "../util/passwordHashing";
import { type TRequestUpdateUser } from "../../routes/userController/updateUser/types";
import { userUpdate } from "../../model/user/updateUser";
import { type TDeleteUser, userDelete } from "../../model/user/deleteUser";

class UserService implements IUserService {
  /**
   * Create user
   * @param user
   */
  public async createUser(user: ICreateUser) {
    if (!user) return null;

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

    return await createUser(newUser);
  }

  /**
   * Get user by email
   * @param email
   */
  public async getUserByEmail(email: string): Promise<User | null> {
    if (!email) {
      return null;
    }

    const decodedEmail = he.decode(email);

    return await findUserByEmail(decodedEmail);
  }

  /**
   * Get user by id
   * @param id
   */
  public async getUserById(id: number): Promise<User | null> {
    if (!id) return null;
    return await findUserById(id);
  }

  /**
   * Update user
   * @param user
   */
  public async updateUser(user: TRequestUpdateUser): Promise<User | null> {
    if (!user) return null;

    const existingUser = await this.getUserById(user.id);
    if (!existingUser) return null;

    const updatedUser = userUpdate(user);
    return await updatedUser;
  }

  /**
   * Delete user
   * @param id
   */
  public async deleteUser(id: number): TDeleteUser {
    if (!id) return null;

    return await userDelete(id);
  }

  /** Get users */
  public async getUsers(): Promise<User[] | null> {
    return await findUsers();
  }
}

export default new UserService();
