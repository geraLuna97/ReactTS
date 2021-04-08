export interface IFormProps {
  description: string;
}

export interface IUser{
    key?: string | number | string[] | number[];
    id:number;
    name: string;
    lastName : string;
    age: number | string;
    sex : string;
    country : string;
    countryId : number;
}

// export interface IUser2 extends IUser{
//     length: number;
// }

// export interface ReadonlyIUser{
//   readonly id:number;
//   readonly name: string;
//   readonly age: number | string;
//   readonly sex : string;
// }
