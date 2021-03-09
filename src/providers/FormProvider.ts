import {sp} from '@pnp/sp'
import  '@pnp/sp/presets/all'

export interface ICountry {
    id : number;
    title : string;
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
    })
  }

    public static loadContries(): Promise<ICountry[]>{
      return sp.web.lists.getByTitle('Country').items
      .select('Id','Title')
      .get()
      .then(data => {
        //return an array of object
        return data.map(item =>{
          // return country object, it means an array of counties after call .map
          const country: ICountry = {
            id: item.Id,
            title: item.Title
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
