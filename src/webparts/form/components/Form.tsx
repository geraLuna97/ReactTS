import * as React  from 'react';
import { useState } from 'react';
import UserTable from './UserTable';
import AddUserForm from './AddUserForm';
import EditUserForm from './EditUserForm';
import AddandEditUserForm from './AddandEditUserForm';
import styles from "./Form.module.scss";
import {IFormProps, IUser} from "./IFormProps";
import { FormProvider, PersonsProvider } from '../../../providers/FormProvider';
import { Item } from '@pnp/sp/items';




const App =  () => {
    //Estado iniciado
    const initialFormState:Readonly<IUser> = {id : null , name: '', lastName:'', age:'' , sex:'', country:'',countryId:0};

    // const usersData: Array<IUser> = [
    //   {id :1, name: 'Gera', lastName:'Luna', age:23, sex:'Hombre',country:'Mexico'},
    //   {id :2, name: 'Abraham',lastName:'Galindo', age:30, sex:'Hombre',country:'Mexico'},
    //   {id :3, name: 'Rafa', lastName:'Quintero', age:27, sex:'Hombre',country:'Mexico'},
    //   {id :4, name: 'Elyas',lastName:'Alday', age:35, sex:'Hombre',country:'Mexico'},
    //     ];

  // Hooks para settear el State
  const [users, setUsers] =  useState<IUser[]> ([]);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialFormState);


  const getPersons = () =>{
    PersonsProvider.loadPersons().then(persons =>{
    console.log("Persons", persons);
    //Estamos agarando el set Users para actualizar el State con persons
    setUsers(persons);
    });
  };

  React.useEffect(() =>{
    //Se ejecuta una sola ves cuando se renderiza el componente
    getPersons();
  },[]);

  // const hadnleAdd = () =>{
  //     setUsers([...users,{id :5, name: 'Perro', age:35, sex:'hombre'}])
  // }

  // CRUDE

  // const addUser = (user:IUser) =>{
  //     user.id = users.length + 1;
  //     setUsers([...users,user]);
  // };

  const addUser = (user:IUser) =>{
    // Destructuring assignment
    setUsers([...users,user]);
  };

  const deleteUser = (id:number) => {
      setEditing(false);
      setUsers(users.filter((user) => user.id !== id));
  };

  const updateUser = (id:number, updatedUser:IUser) => {
      setEditing(false);
      setUsers(users.map((user => (user.id === id ? updatedUser : user))));
  };

  const editRow = (user:IUser) =>{
      setEditing(true);
      setCurrentUser({id:user.id , name:user.name, lastName:user.lastName ,age:user.age, sex:user.sex, country:user.country,countryId:user.countryId});
    };

  return(
      <div className = {styles.form}>
          {/* <button onClick={hadnleAdd}>Agrega</button> */}
          <h1>Form whit hooks</h1>
              <div className = "flex-row">
                  <div className = "flex-large">
                    {
                      <>
                      <h2>Add/Edit user</h2>
                      <AddandEditUserForm
                          addUser={addUser}
                          updateUser={updateUser}
                          editing={editing}
                          currentUser={currentUser}
                          setEditing={setEditing}
                      />
                      </>
                    }
                      {/* {editing ? (
                          <>
                              <h2>Edit user</h2>
                                  <EditUserForm
                                          setEditing={setEditing}
                                          currentUser={currentUser}
                                          updateUser={updateUser}
                                      />
                          </>) :(
                              <>
                                  <h2>Add Usuario</h2>
                                  <AddUserForm addUser={addUser}/>
                              </>
                          )
                    } */}
                  </div>
                  <div className = "flex-large">
                      <h2>Ver Users</h2>
                      <UserTable
                      users = {users}
                      editRow = {editRow}
                      deleteUser ={deleteUser}/>
                  </div>
              </div>
      </div>
  );
};

export default App;
