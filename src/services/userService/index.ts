import { type IUserService, type User } from "./types";
import { createUser } from "../../model/user/createUser";

const dummyUser: User = {
  id: 1,
  name: "John Doe",
  dateOfBirth: "01/01/1970",
  email: "",
  phoneNumber: "",
  agreement: true,
  createdAt: new Date(),
};

class UserService implements IUserService {
  async createUser(user: User) {
    // todo: validate user
    return await createUser(user);
  }

  async getUser(id: number) {
    return {
      id,
      name: "John Doe",
      dateOfBirth: "01/01/1970",
      email: "",
      phoneNumber: "",
      agreement: true,
      createdAt: new Date(),
    };
  }

  async updateUser(user: User) {
    return user;
  }

  async deleteUser(id: number) {
    console.log(id);
    await Promise.resolve();
  }

  async getUsers() {
    return [dummyUser];
  }
}

export default new UserService();
