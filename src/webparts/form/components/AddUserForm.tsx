import * as React  from 'react';
import { useState } from 'react';
import {IUser} from "./IFormProps";
import styles from "./Form.module.scss";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Dropdown,IDropdownOption} from 'office-ui-fabric-react/lib/Dropdown';
import { FormProvider, PersonsProvider } from '../../../providers/FormProvider';
interface IProps{
  addUser: (user: IUser) => void;
}
const AddUserForm:React.FunctionComponent<IProps> = props => {

  const initialFormState:IUser = {id :null, name: '', lastName:'', age:'' , sex:'', country:'',countryId:0};
  const [user, setUser] =  useState(initialFormState);
  const [countries, setCountries] = useState<IDropdownOption[]> ([]);

  React.useEffect(() =>{
    FormProvider.loadContries().then(country =>{
      setCountries(country);
    });
  },[]);

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



  const handleInputTextFieldName = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) =>{

    const NewUserCopy = {...user,name:newValue};
    //Assignment without declaration
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
    const NewUserCopy:IUser = {...user,country:(selectedOption.text as string), countryId:(selectedOption.key as number)};
    setUser(NewUserCopy);
  };

  const optionsSex:IDropdownOption[] = [
    { key: 'Hombre', text: 'Hombre'},
    { key: 'Mujer', text: 'Mujer'},
    ];

  // const optionsCountry:IDropdownOption[] =[
  //   { key:'Mexico', text: 'Mexico'},
  //   { key:'Germany',text: 'Germany'},
  //   { key:'Japan', text: 'Japan'},
  //   ];


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
              //Ambos eran texto por eso jalaban, kay es numerico y ahora es string
              onChange={handleInputChangeDropDownCountry}
            />
          {/*<select name="sex" value={user.sex} onChange={handleInputChange}>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
            </select>*/}
          <PrimaryButton text={"Add new user"} onClick={() => {
            if(!user.name || !user.age)
              return;
              PersonsProvider.addPersons(user).then(()=>{
                //Tipo promesa . then es que se resolvio correctamnete
                //Primero se ejecutan la promesa y espera la respuesta
                props.addUser(user);
                setUser(initialFormState);
              });
          }}/>
      </form>
  );

};


export default AddUserForm;



