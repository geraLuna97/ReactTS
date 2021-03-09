export interface IFormProps {
   description: string;
 }

export interface IBaseUser{
    name: string;
    age: number | string;
    sex : string;

}

export interface IUser extends IBaseUser{
    id:number;
}

