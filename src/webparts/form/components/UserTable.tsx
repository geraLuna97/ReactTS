import * as React  from 'react';
import {IUser} from "./IFormProps";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  IDetailsFooterProps,
  DetailsRow,
  SelectionMode,
  DetailsRowCheck,
  IDetailsRowBaseProps,
  IDetailsRowCheckStyles,
} from 'office-ui-fabric-react/lib/DetailsList';


interface IProps{
    users : Array<IUser>;
    deleteUser :  (id: number) => void;
    editRow :  (user: IUser) => void;
}

export interface IDetailsListCustom{
  users : Array<IUser>;
  deleteUser :  (id: number) => void;
  editRow :  (user: IUser) => void;
  columns : IColumn[];
}

const UserTable: React.FunctionComponent<IProps> = props => {

  let items = [props.users];
  console.log(items);


  let columns:IColumn[] = [
    {key: 'column1', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 100, isResizable: true },
    {key: 'column2', name: 'Age', fieldName: 'age', minWidth: 100, maxWidth: 100, isResizable: true },
    {key: 'column3', name: 'Sex', fieldName: 'sex', minWidth: 100, maxWidth: 100, isResizable: true },
    {key: 'column4', name: 'Actions', onRender: (user) => {
      return (
          <>
                <td>
                  <DefaultButton text={"Edit"} onClick={() => props.editRow(user)} />
                  <DefaultButton text={"Delete"} onClick={() => props.deleteUser(user.id)} />
                </td>
          </>
      );
    }, minWidth: 100, maxWidth: 200, isResizable: true },
  ];

  return(
    <>
    { <DetailsList
        items={props.users}
        columns={columns}
        setKey="set"
        layoutMode={DetailsListLayoutMode.justified}
        selectionPreservedOnEmptyClick={true}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
      /> }
      {/* <table className="table">
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
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.sex}</td>
                <td>
                  <DefaultButton text={"Edit"} onClick={() => props.editRow(user)} />
                  <DefaultButton text={"Delete"} onClick={() => props.deleteUser(user.id)} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No users</td>
            </tr>
          )}
        </tbody>
      </table> */}
      </>
  );
                  };

export default UserTable;
