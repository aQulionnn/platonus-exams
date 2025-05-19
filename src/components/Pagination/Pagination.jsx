import React from 'react';
import style from './Pagination.module.css'

const Pagination = ({id, setId}) => {
    return (
        <nav className={style['pagination']}>
            <div
                className={style['left']}
                onClick={() => setId(id - 1)}
            >
                LEFT
            </div>
            <div className={style['page']}>
                <input type="text" onChange={(e) => setId(Number(e.currentTarget.value) - 1)} />
            </div>
            <div
                className={style['right']}
                onClick={() => setId(id + 1)}
            >
                RIGHT
            </div>
        </nav>
    );
};

export default Pagination;