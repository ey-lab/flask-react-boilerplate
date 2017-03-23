import React from 'react';

import TextField from 'material-ui/TextField';

const TextInput = ({meta: { touched, error}, input: {...input}, ...props }) => {
  return (
    <TextField
      errorText={touched && error}
      fullWidth
      {...input}
      {...props}
    />
  );
};

export default TextInput