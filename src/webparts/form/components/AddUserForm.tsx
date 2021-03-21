import * as React  from 'react';
import { useState } from 'react';
import {IUser} from "./IFormProps";
import styles from "./Form.module.scss";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";

interface IProps{
  addUser: (user: IUser) => void;
}
const AddUserForm:React.FunctionComponent<IProps> = props => {

  const initialFormState:IUser = {id :null, name: '', age:'' , sex:'Hombre'};
  const [user, setUser] =  useState(initialFormState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      // const name = e.target.name, value = e.target.value;
      const newUser = {
          ...user,
          [name]: value
      }; // ...
      // const newUser = user;
      //newUser[name] = value;
      //newUser["sex"] = value;
      //newUser.sex = value;
      setUser(newUser);
  };
  console.log(user.id);

  return(
      <form onSubmit={ (event:React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        if(!user.name || !user.age)
        return;
        props.addUser(user);
        setUser(initialFormState);
      }
      }>
          <label>Name</label>
          <input type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}/>
          <label>Age</label>
          <input
              name="age"
              type="text"
              value={user.age}
              onChange={handleInputChange}/>
          <label>Sex</label>
          <select name="sex" value={user.sex} onChange={handleInputChange}>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
          </select>
          <button className={styles.btn_add}>Add new user</button>
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



