import React, { useState } from 'react';
import { useActions } from 'hooks/use-actions';

import Input from 'components/ui/Input';
import Button from 'components/ui/Button';
import classes from 'styles/modals/AddTab.module.scss';

const AddTab = ({ onClose }) => {
    const { addCategory } = useActions();
    const [category, setCategory] = useState('');

    function handleChangeCategory(e) {
        setCategory(e.target.value);
    }

    function handleAddCategory() {
        if (category.trim() !== '') {
            addCategory(category);
            onClose();
        }
    }

    return (
        <div className={classes.AddTab}>
            <div className={classes.Title}>Create A New Category?</div>
            <div className={classes.FormGroup}>
                <Input handleChange={handleChangeCategory} value={category} />
            </div>
            <div className={classes.FormActions}>
                <Button theme='secondary' label='Cancel' clicked={onClose} />
                <Button
                    theme='primary'
                    label='Save'
                    clicked={handleAddCategory}
                />
            </div>
        </div>
    );
};

export default AddTab;
