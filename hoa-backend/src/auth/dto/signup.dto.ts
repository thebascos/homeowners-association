export enum HouseCode {
  HOUSE_1 = 'House 1',
  HOUSE_2 = 'House 2',
  HOUSE_3 = 'House 3',
}

export interface SignUpDTO {
  email: string;
  password: string;
  name: string;
  houseCode: HouseCode;
}
