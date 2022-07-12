import React from 'react';

import Input from 'components/ui/Input';
import Button from 'components/ui/Button';
import classes from 'styles/modals/AddTab.module.scss';

const AddTab = ({ onClose }) => {
    return (
        <div className={classes.AddTab}>
            <div className={classes.Title}>Create A New Category?</div>
            <div className={classes.FormGroup}>
                <Input />
            </div>
            <div className={classes.FormActions}>
                <Button theme='secondary' label='Cancel' clicked={onClose} />
                <Button theme='primary' label='Save' />
            </div>
        </div>
    );
};

export default AddTab;
