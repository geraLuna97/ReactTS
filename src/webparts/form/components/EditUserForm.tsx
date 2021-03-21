import * as React  from 'react';
import { useState } from 'react';
import {IUser} from "./IFormProps";

interface IProps{
  updateUser : (id:number, updatedUser:IUser) => void;
  setEditing : (bool:boolean) => void;
  currentUser : IUser;
}

export const EditUserForm:React.FunctionComponent<IProps> = (props) => {

    const [user, setUser] = useState(props.currentUser);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> /*{ target: { name: any; value: any; }; }*/) => {
        const { name, value } = event.target;

        setUser({ ...user, [name]: value });
      };
    return (
        <div>
          <form
            onSubmit={(event) => {
                event.preventDefault();
                props.updateUser(user.id, user);
            }}
          >
        <label>Name</label>
        <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
        />
        <label>Age</label>
            <input
                type="text"
                name="age"
                value={user.age}
                onChange={handleInputChange}/>
            <label>Sex</label>
            <select value={user.sex} onChange={handleInputChange}>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
            </select>
        <button>Update user</button>
        <button
            onClick={() => props.setEditing(false)}
            className="button muted-button"
        >
            Cancel
        </button>
        </form>
        </div>
    );
};

export default EditUserForm;
