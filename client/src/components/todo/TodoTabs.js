import React, { useEffect, useState, useMemo } from 'react';

import classes from 'styles/todo/TodoTabs.module.scss';

const TodoTabs = ({ changeCategory, categories }) => {
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
        const name = prompt('Enter a new category: ');
        if (name.trim() !== '') {
            setLabels(st => [...st, name]);
        }
    }

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
                    <p className={classes.Content}>{tab}</p>
                </div>
            )),
        [labels, selected]
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
