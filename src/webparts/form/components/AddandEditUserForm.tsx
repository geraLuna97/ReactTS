import * as React  from 'react';
import { useState, } from 'react';
import {IUser} from "./IFormProps";
import styles from "./Form.module.scss";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Dropdown,IDropdownOption} from 'office-ui-fabric-react/lib/Dropdown';
import { FormProvider, PersonsProvider } from '../../../providers/FormProvider';

interface IProps{
  addUser: (user: IUser) => void;
  updateUser : (id:number, updatedUser:IUser) => void;
  setEditing : (bool:boolean) => void;
  editing : boolean;
  currentUser : IUser;
}

const AddandEditUserForm:React.FunctionComponent<IProps> = (props) => {

  const initialFormState:IUser = {id :null, name: '', lastName:'', age:'' , sex:'', country:'',countryId:0};
  const [user, setUser] =  useState(props.currentUser);
  const [countries, setCountries] = useState<IDropdownOption[]> ([]);
  const [sex, setSex] = useState<IDropdownOption[]> ([]);

  React.useEffect(() =>{
    setUser(props.currentUser);
    FormProvider.loadContries().then(country =>{
      setCountries(country);
      console.log(country);});
    FormProvider.loadSex().then(data =>{
      console.log(data);
      setSex(data);
      });
  },[props.currentUser]);


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
    const NewUserCopy:IUser = {...user,country:(selectedOption.text as string), countryId:(selectedOption.key as number)};
    setUser(NewUserCopy);
  };

  return(
      <form>
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
              options={sex}
              selectedKey = {user.sex}
              onChange={handleInputChangeDropDownSex}
            />
            <Dropdown
              label="Country"
              options={countries}
              selectedKey = {user.countryId}
              onChange={handleInputChangeDropDownCountry}
            />
            { props.editing ? (
            <>
            <PrimaryButton text={"Update user"} onClick={(event) => {
              PersonsProvider.updatePersons(user).then(()=>{
                props.updateUser(user.id, user);
                event.preventDefault();
                });
              }
            }/>
            <PrimaryButton text={"Cancel"} onClick={() => { props.setEditing(false);
            setUser(initialFormState);
            }}/>
            </>
              ):(
            <>
            <PrimaryButton text={"Add new user"} onClick={() => {
                if(!user.name || !user.age)
                  return;
                  PersonsProvider.addPersons(user).then(()=>{
                    props.addUser(user);
                    setUser(initialFormState);
                    });
                  }
                }/>
            </>
              )
            }
      </form>
  );
};


export default AddandEditUserForm;


