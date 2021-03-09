import * as React from 'react';
import { IUser } from './IFormProps';

interface IProps {
  users: Array<IUser>;
}


const UserTable:React.FunctionComponent<IProps> =(props:IProps) =>{

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
                    <button className="button muted-button">Edit</button>
                    <button className="button muted-button">Delete</button>
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
)

}

export default UserTable;
