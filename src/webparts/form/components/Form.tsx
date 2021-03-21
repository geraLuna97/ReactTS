import * as React  from 'react';
import { useState } from 'react';
import UserTable from './UserTable';
import AddUserForm from './AddUserForm';
import EditUserForm from './EditUserForm';
import styles from "./Form.module.scss";
import {IUser} from "./IFormProps";

const App = () => {

  const usersData: Array<IUser> = [
      {id :1, name: 'Gera', age:23, sex:'Hombre'},
      {id :2, name: 'Abraham', age:30, sex:'Hombre'},
      {id :3, name: 'Rafa', age:27, sex:'Hombre'},
      {id :4, name: 'Elyas', age:35, sex:'Hombre'},
  ];


  //Estado iniciaado
  const initialFormState:Readonly<IUser> = {id : null , name: '', age:'' , sex:''};


  // Hooks para settear el State
  const [users, setUsers] =  useState(usersData);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialFormState);

  // const hadnleAdd = () =>{
  //     setUsers([...users,{id :5, name: 'Perro', age:35, sex:'hombre'}])
  // }

  // const addUser = (user) => {
  //     user.id = user.length + 1
  //     setUsers([...users, user])
  // }

  // CRUDE

  const addUser = (user:IUser) =>{
      user.id = users.length + 1;
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
      setCurrentUser({id:user.id , name:user.name, age:user.age, sex:user.sex});
  };

console.log(users);

  return(
      <div className = {styles.form}>
          {/* <button onClick={hadnleAdd}>Agrega</button> */}
          <h1>Form whit hooks</h1>
              <div className = "flex-row">
                  <div className = "flex-large">
                      {editing ? (
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
                  }
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
