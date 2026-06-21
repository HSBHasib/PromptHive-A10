import React from "react";
import { deleteUser } from "@/lib/action/user";
import DeleteDialogContent from "../../promptContent/DeleteDialogContent";

const UserDeleteDialog = ({ userId, userName, onDeleteSuccess }) => {
  return (
    <DeleteDialogContent
      typeName="user"
      id={userId}
      title={userName}
      onDeleteSuccess={onDeleteSuccess}
      deletePromptAction={deleteUser}
    />
  );
};

export default UserDeleteDialog;
