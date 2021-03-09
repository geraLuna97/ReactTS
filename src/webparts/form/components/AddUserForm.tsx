import * as React  from 'react';
import { useState } from 'react';
import { IBaseUser } from './IFormProps';

interface IProps{
  setUsers : (user:IBaseUser) => void;
}


const AddUserForm:React.FunctionComponent<IProps> = (props:IProps) => {

  const initialFormState = {id :5, name: '', age:'' , sex:'hombre'};
  const [user, setUser] =  useState(initialFormState);

  const handleInputChange = (e:React.ChangeEvent<HTMLFormElement>) =>{
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const hundleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setUsers(users =>[...users,user])
    console.log(user);
  }

  return (
    <form onSubmit={hundleSubmit}>
    <label>Name</label>
    <input type="text"
        name="name"
        value={user.name}
        onChange={handleInputChange}/>
    <label>Age</label>
    <input
        name="age"
        value={user.age}
        onChange={handleInputChange}/>
    <label>Sex</label>
    <select value={user.sex} onChange={handleInputChange}>
        <option value="Hombre">Hombre</option>
        <option value="Mujer">Mujer</option>
    </select>
    <button onClick = {hundleSubmit}>Add new user</button>
</form>
  )
}

export  default AddUserForm;
