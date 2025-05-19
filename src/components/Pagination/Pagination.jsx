import React from 'react';
import style from './Pagination.module.css'

const Pagination = ({id, setId}) => {
    return (
        <nav className={style['pagination']}>
            <div
                className={style['left']}
                onClick={() => setId(id - 1)}
            >
                PREV
            </div>
            <div className={style['page']}>
                <input type="text" onChange={(e) => setId(e.currentTarget.value ? Number(e.currentTarget.value) - 1 : 0)} />
            </div>
            <div
                className={style['right']}
                onClick={() => setId(id + 1)}
            >
                NEXT
            </div>
        </nav>
    );
};

export default Pagination;