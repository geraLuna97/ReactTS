import {sp} from '@pnp/sp';
import  '@pnp/sp/presets/all';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IItemAddResult } from "@pnp/sp/items";
import {IUser} from "../webparts/form/components/IFormProps";
import { Dropdown,IDropdownOption} from 'office-ui-fabric-react/lib/Dropdown';
export interface ICountry {
    id : number;
    title : string;
}

export class PersonsProvider{
    public static setup(context): void {
      sp.setup({
        spfxContext: context
      });
  }

  public static async loadPersons() : Promise<IUser[]>{
    const data = await sp.web.lists.getById("804a4d92-982b-4411-a127-14a6f9a95e28").items
      .select('Id', 'Title','LastName' , 'Age', 'Sex',"Country/Title","CountryId").expand("Country")
      .get();
    return data.map(item => {
      const person: IUser = {
        id: item.Id,
        name: item.Title,
        lastName:item.LastName,
        age: item.Age,
        sex: item.Sex,
        country:item.Country.Title,
        // Pending
        countryId:item.CountryId,
      };
      return person;
    });
  }


  public static addPersons(user:IUser) : Promise <void> {

    return sp.web.lists.getById("804a4d92-982b-4411-a127-14a6f9a95e28").items
      .add({
        Title: user.name,
        LastName:user.lastName,
        Age:user.age,
        Sex: user.sex,
        CountryId:user.countryId
      }
      ).catch(result =>{
        return Promise.reject(result);
      })
      ;
  }
  public static updatePersons(user:IUser) : Promise <void> {

    return sp.web.lists.getById("804a4d92-982b-4411-a127-14a6f9a95e28").items
      .getById(user.id)
      .update({
        Title: user.name,
        LastName:user.lastName,
        Age:user.age,
        Sex: user.sex,
        CountryId:user.countryId
      }
      ).catch(result =>{
        return Promise.reject(result);
      })
      ;
  }


  public static daletePerson(user:IUser) : Promise <void>{
    return sp.web.lists.getById("804a4d92-982b-4411-a127-14a6f9a95e28")
    .items.getById(user.id).delete()
    .catch(result => {
      return Promise.reject(result);
    });

  }
}


export class FormProvider {

  public static test(): Promise<void> {
    return fetch("")
    .then(response => response.json())
    .then(data => {
    });
  }

  public static setup(context): void {
    sp.setup({
      spfxContext: context
    });
  }

    public static loadContries(): Promise<IDropdownOption[]>{
      return sp.web.lists.getByTitle('Country').items
      .select('Id','Title')
      .get()
      .then(data => {
        //return an array of object
        return data.map(item =>{
          // return country object, it means an array of counties after call .map
          const country: IDropdownOption = {
            key: item.Id,
            text: item.Title
          };
          return country;
        });
      });
    }


    public static updateContries(country: ICountry): Promise<ICountry>{

      return sp.web.lists.getByTitle('Country').items.getById(country.id).update({ Title: country.title })
      .then(data => {
        return country;
      });
    }

}
