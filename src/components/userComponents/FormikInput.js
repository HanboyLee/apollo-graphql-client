import React from 'react';
import { Field, ErrorMessage } from 'formik';
import * as MTL from '@material-ui/core';

const FormikInput = ({ name, label, placeholder, type, ...props }) => {
    //Error Component
    const Custom = ({ children }) => (
        <MTL.Typography variant="subtitle2" color="error" className="error">
            {children}
        </MTL.Typography>
    );

    return (
        <Field name={name} label={label}>
            {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
            }) => {
                return (
                    <>
                        <MTL.TextField
                            type={type}
                            variant="standard"
                            fullWidth
                            placeholder={placeholder}
                            label={label}
                            color="secondary"
                            size="small"
                            {...field}
                            {...props}
                            value={field.value || ''}
                        />
                        <ErrorMessage name={name} component={Custom} />
                    </>
                );
            }}
        </Field>
    );
};

export default FormikInput;
