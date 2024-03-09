export interface TRequestCreateUser {
  Body: ICreateUser;
}

export interface ICreateUser {
  name: string;
  dateOfBirth: string;
  password: string;
  email: string;
  phoneNumber: string;
  agreement: boolean;
}
