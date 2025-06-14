
import React from 'react';
import { useParams } from 'react-router-dom';
import ViewDataset from './ViewDataset';

function ViewDatasetWrapper() {
  const { fileId } = useParams(); 

  return <ViewDataset fileId={fileId} />;
}

export default ViewDatasetWrapper;
