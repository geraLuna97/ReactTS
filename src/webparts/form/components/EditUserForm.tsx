import * as React  from 'react';
import { useState } from 'react';
import {IUser} from "./IFormProps";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Dropdown,IDropdownOption} from 'office-ui-fabric-react/lib/Dropdown';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { FormProvider, PersonsProvider } from '../../../providers/FormProvider';
interface IProps{
  updateUser : (id:number, updatedUser:IUser) => void;
  setEditing : (bool:boolean) => void;
  currentUser : IUser;
}

export const EditUserForm:React.FunctionComponent<IProps> = (props) => {

    const [user, setUser] = useState(props.currentUser);
    const [countries, setCountries] = useState<IDropdownOption[]> ([]);

    React.useEffect(() =>{
      FormProvider.loadContries().then(country =>{
        setCountries(country);
      });
    },[]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> /*{ target: { name: any; value: any; }; }*/) => {
        const { name, value } = event.target;


        setUser({ ...user, [name]: value });
      };

      const handleInputTextFieldName = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) =>{
        const NewUserCopy = {...user,name:newValue};
        setUser(NewUserCopy);
      };

      const handleInputTextFieldAge = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) =>{
        const NewUserCopy = {...user,age:newValue};
        setUser(NewUserCopy);
      };

      const handleInputTextFieldlastName = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) =>{
        const NewUserCopy = {...user,lastName:newValue};
        setUser(NewUserCopy);
      };

      const handleInputChangeDropDownSex = (e, selectedOption:IDropdownOption) =>{
        const NewUserCopy = {...user,sex:(selectedOption.text as string)};
        setUser(NewUserCopy);
      };

      const handleInputChangeDropDownCountry = (e, selectedOption:IDropdownOption) =>{
        const NewUserCopy = {...user,country:(selectedOption.text as string),countryId:(selectedOption.key as number)};
        setUser(NewUserCopy);
      };

      const optionsSex:IDropdownOption[] = [
        { key: 'Hombre', text: 'Hombre'},
        { key: 'Mujer', text: 'Mujer'},
        ];

    return (
        <>
          <TextField type="text"
              label="Name"
              name="name"
              value={user.name}
              onChange={handleInputTextFieldName}/>
          <TextField type="text"
              label="Last Name"
              name="lastName"
              value={user.lastName}
              onChange={handleInputTextFieldlastName}/>
          <TextField type="text"
              label="Age"
              name="age"
              value={user.age}
              onChange={handleInputTextFieldAge}/>
          <Dropdown
              label="Sex"
              options={optionsSex}
              selectedKey = {user.sex}
              onChange={handleInputChangeDropDownSex}
            />
            <Dropdown
              label="Country"
              options={countries}
              selectedKey = {user.countryId}
              onChange={handleInputChangeDropDownCountry}
            />
        {/* <form
            onSubmit={(event) => {
                event.preventDefault();
                props.updateUser(user.id, user);
            }
          }
          >
        <Label>Name</Label>
        <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
        />
        <Label>Age</Label>
            <input
                type="text"
                name="age"
                value={user.age}
                onChange={handleInputChange}/>
            <label>Sex</label>
            <select name="sex" value={user.sex} onChange={handleInputChange}>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
            </select>
          </form> */}
        <PrimaryButton text={"Update user"} onClick={(event) =>
          {
            PersonsProvider.updatePersons(user).then(()=>{
              props.updateUser(user.id, user);
              event.preventDefault();
            });

          }
        }/>
        <PrimaryButton text={"Cancel"} onClick={() =>  props.setEditing(false)}/>
        </>
    );
};

export default EditUserForm;
