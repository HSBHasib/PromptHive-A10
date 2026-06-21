import React from 'react';
import DeleteDialogContent from './DeleteDialogContent';
import { deletePrompt } from '@/lib/action/prompts';

const DeleteDialogContainer = ({ promptId, promptTitle, onDeleteSuccess }) => {
  return (
    <DeleteDialogContent 
      typeName="prompt"
      id={promptId} 
      title={promptTitle}
      onDeleteSuccess={onDeleteSuccess} 
      deletePromptAction={deletePrompt} 
    />
  );
};

export default DeleteDialogContainer;
