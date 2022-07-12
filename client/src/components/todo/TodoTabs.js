import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from 'hooks/use-actions';

import classes from 'styles/todo/TodoTabs.module.scss';
import { useCallback } from 'react';

const TodoTabs = ({ changeCategory }) => {
    const { showAddCategory, removeCategory } = useActions();
    const { items, categories } = useSelector(state => state.todos);
    const [selected, setSelected] = useState('default');
    const [labels, setLabels] = useState(['default']);

    useEffect(() => {
        setLabels(categories);
    }, [categories]);

    useEffect(() => {
        changeCategory(selected);
    }, [selected, changeCategory]);

    function handleChangeTab(name) {
        setSelected(name);
    }

    function handleAddCategory() {
        showAddCategory(true);
    }

    const handleRemoveCategory = useCallback(
        cat => {
            console.log('TRYING TO REMOVE CAT');
            if (!items.some(x => x.category === cat)) {
                removeCategory(cat);
            }
        },
        [items, removeCategory]
    );

    const tabulation = useMemo(
        () =>
            labels.map(tab => (
                <div
                    key={tab}
                    className={[
                        classes.Tab,
                        selected === tab ? classes.Selected : '',
                    ].join(' ')}>
                    {selected === tab && <span className={classes.BorderBG} />}
                    <div
                        className={classes.Border}
                        onClick={handleChangeTab.bind(null, tab)}></div>
                    <p className={classes.Content}>
                        {tab}{' '}
                        {tab !== 'default' && (
                            <span
                                onClick={handleRemoveCategory.bind(null, tab)}>
                                X
                            </span>
                        )}
                    </p>
                </div>
            )),
        [labels, selected, handleRemoveCategory]
    );

    return (
        <div className={classes.TodoTabs}>
            {tabulation}
            <span className={classes.AddTab} onClick={handleAddCategory}>
                &#10010;
            </span>
        </div>
    );
};

export default TodoTabs;
