import * as React  from 'react';
import {IUser} from "./IFormProps";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";

interface IProps{
    users : Array<IUser>;
    deleteUser :  (id: number) => void;
    editRow :  (user: IUser) => void;
}

const UserTable: React.FunctionComponent<IProps> = props => {
  return(
      <table className="table">
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Sex</th>
                  <th>Actions</th>

              </tr>
          </thead>
          <tbody>
          {props.users.length > 0 ? (
                  props.users.map((user) => (
                  <tr key = {user.id}>
                      <td>{user.name}</td>
                      <td>{user.age}</td>
                      <td>{user.sex}</td>
                      <td>
                        <DefaultButton text={"Edit"} onClick={() => props.editRow(user)}/>
                        <DefaultButton text={"Delete"} onClick={() => props.deleteUser(user.id)}/>
                      </td>
                  </tr>
                  ))
                  ) : (
                      <tr>
                      <td colSpan={3}>No users</td>
                      </tr>
                  )}
          </tbody>
      </table>
  );
                  };

export default UserTable;
