import React from 'react'
import style from './Streak.module.css'

function Streak({streak}) {
  return (
    <div className={style['streak']}>
      <h1>Макс. Серия: </h1>
      <h6>Серия: {streak}</h6>
    </div>
  )
}

export default Streak