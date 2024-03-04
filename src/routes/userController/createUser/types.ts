export interface TRequestCreateUser {
  Body: {
    name: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
    agreement: boolean;
  };
}
