export enum Gender {
  female = "female",
  male = "male",
}

export interface RandomUser {
  key: React.Key;
  username: string;
  name: string;
  email: string;
  gender: Gender;
  registered: string;
}
