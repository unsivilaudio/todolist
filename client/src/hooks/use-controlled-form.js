import { useState } from 'react';

/**
 * React hook to register all fields as controlled inputs.
 * @param {object} -- @param "fields" - Array of input fields in form
 * @returns values      -- object of current field values
 *          onChange    -- fn(@param event) for changing current
 *                         field value, must match input name attr
 *          reset       -- fn() to reset all fields
 */
export const useForm = ({ fields }) => {
    const [values, setValues] = useState(
        fields.reduce((a, b) => {
            a[b] = '';
            return a;
        }, {})
    );

    function onChange(e) {
        const { name, value } = e.target;
        setValues(st => ({ ...st, [name]: value }));
    }

    function reset() {
        setValues(
            fields.reduce((a, b) => {
                a[b] = '';
                return a;
            }, {})
        );
    }

    return { values, onChange, reset };
};
