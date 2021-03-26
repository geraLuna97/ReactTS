import * as React  from 'react';
import { useState } from 'react';
import {IUser} from "./IFormProps";
import styles from "./Form.module.scss";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Dropdown,IDropdownOption} from 'office-ui-fabric-react/lib/Dropdown';

interface IProps{
  addUser: (user: IUser) => void;
}
const AddUserForm:React.FunctionComponent<IProps> = props => {

  const initialFormState:IUser = {id :null, name: '', age:'' , sex:''};
  const [user, setUser] =  useState(initialFormState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

      const { name, value } = e.target;
      // const name = e.target.name, value = e.target.value;
      const newUser = {
          ...user,
          [name]: value
      }; // ... crea una copia
      // const newUser = user;
      //newUser[name] = value;
      //newUser["sex"] = value;
      //newUser.sex = value;
      setUser(newUser);
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
  return(
      <form onSubmit={ (event:React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        if(!user.name || !user.age)
        return;
        props.addUser(user);
        setUser(initialFormState);
      }
      }
      >
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
          {/*<select name="sex" value={user.sex} onChange={handleInputChange}>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
            </select>*/}
          <PrimaryButton text={"Add new user"} onClick={() => {
            if(!user.name || !user.age)
              return;
              props.addUser(user);
              setUser(initialFormState);
          }}/>
      </form>
  );

};


export default AddUserForm;



