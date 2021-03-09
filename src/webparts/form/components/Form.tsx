import * as React  from 'react';
import { useState } from 'react';
import styles from './Form.module.scss';
import { IFormProps } from './IFormProps';
import { IUser } from './IFormProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { FormProvider } from '../../../providers/FormProvider';
import UserTable from './UserTable';
import AddUserForm from './AddUserForm';



const Form:React.FunctionComponent = () =>{


  const usersData: Array<IUser>  = [
    {id :1, name: 'Gera', age:23, sex:'hombre'},
    {id :2, name: 'Abraham', age:30, sex:'hombre'},
    {id :3, name: 'Rafa', age:27, sex:'hombre'},
    {id :4, name: 'Elyas', age:35, sex:'hombre'},
]

    const [users, setUsers] = useState(usersData)




  // const getCountries = () => {
  //   FormProvider.loadContries().then(countries => {
  //     console.log("Countries", countries);
  //   })
  // };

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
        <h2>Add Usuario</h2>
        <AddUserForm setUsers={setUsers}/>
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users = {users}/>
        </div>
      </div>
    </div>
  );
}

export default Form;


