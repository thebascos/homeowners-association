export class EditUserDTO {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly houseCode: HouseCode;
}
export enum HouseCode {
  HOUSE_1 = 'House 1',
  HOUSE_2 = 'House 2',
  HOUSE_3 = 'House 3',
}
