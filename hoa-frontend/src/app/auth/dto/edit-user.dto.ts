export interface EditUserDTO {
  name: string;
  email: string;
  password: string;
  houseCode: HouseCode | null;
}

export enum HouseCode {
  HOUSE_1 = 'House 1',
  HOUSE_2 = 'House 2',
  HOUSE_3 = 'House 3',
}
