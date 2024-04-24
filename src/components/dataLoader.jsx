// withLoader.js

import React from 'react';
import { useSelector } from 'react-redux';
import ProgressLoading from './spinner';

const DataLoader = (WrappedComponent) => {
  const DataLoaderComponent = (props) => {
    const isLoading = useSelector((state) => state.api.loading);
    console.log(isLoading)
    if (isLoading) {
      // Render your spinner component here
      return <ProgressLoading/>;
    }

    return <WrappedComponent {...props} />;
  };

  return DataLoaderComponent;
};

export default DataLoader;
