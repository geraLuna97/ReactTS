import * as React  from 'react';
import { useState } from 'react';
import {IUser} from "./IFormProps";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Dropdown,IDropdownOption} from 'office-ui-fabric-react/lib/Dropdown';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
interface IProps{
  updateUser : (id:number, updatedUser:IUser) => void;
  setEditing : (bool:boolean) => void;
  currentUser : IUser;
}

export const EditUserForm:React.FunctionComponent<IProps> = (props) => {

    const [user, setUser] = useState(props.currentUser);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> /*{ target: { name: any; value: any; }; }*/) => {
        const { name, value } = event.target;


        setUser({ ...user, [name]: value });
      };

      const handleInputChangeDropDown = (e, selectedOption:IDropdownOption) =>{
        const NewUserCopy = {...user,sex:(selectedOption.key as string)};
        setUser(NewUserCopy);
      };

      const handleInputTextFieldName = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) =>{
        const NewUserCopy = {...user,name:newValue};
        setUser(NewUserCopy);
      };

      const handleInputTextFieldAge = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) =>{
        const NewUserCopy = {...user,age:newValue};
        setUser(NewUserCopy);
      };
      const options:IDropdownOption[] = [
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
              label="Age"
              name="age"
              value={user.age}
              onChange={handleInputTextFieldAge}/>
          <Dropdown
              label="Sex"
              options={options}
              selectedKey = {user.sex}
              onChange={handleInputChangeDropDown}
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
            event.preventDefault();
            props.updateUser(user.id, user);
          }
        }/>
        <PrimaryButton text={"Cancel"} onClick={() =>  props.setEditing(false)}/>
        </>
    );
};

export default EditUserForm;
