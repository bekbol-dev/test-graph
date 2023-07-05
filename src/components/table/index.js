import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import {DEFAULT_BG_CELL, lastActualDays, URL_API} from "../../helpers/constants";
import CornerSvg from "../svg/cornerSvg";

const TableCell = ({cell, isHover, setHover}) => {
  const [day, level] = cell
  const  options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC'
  };
  const dayRu = new Date(day).toLocaleString("ru", options)

  const bgColor = (lv) => {
    if (!lv) {
      return DEFAULT_BG_CELL[0]
    } else if (lv >= 1 && lv < 10) {
      return DEFAULT_BG_CELL[1]
    } else if (lv >= 10 && lv < 20) {
      return DEFAULT_BG_CELL[2]
    } else if (lv >= 20 && lv < 30) {
      return DEFAULT_BG_CELL[3]
    } else if (lv >= 30) {
      return DEFAULT_BG_CELL[4]
    }
  }


  return (
    <div
      className='cell'
      style={{background: bgColor(level)}}
      onClick={() => setHover(day)}
    >
      {isHover === day && <div>
        <div className='corner-svg'>
          <div className='hover-board'>
            <h1 className='hover-board--title'>{level} contributions</h1>
            <h1 className='hover-board--date'>{dayRu}</h1>
          </div>
          <CornerSvg/>
        </div>

      </div>}
    </div>
  );
};


const Table = ({localData}) => {
  const [isHover, setHover] = useState(false)
  const [data, setData] = useState([])
  const getData = async () => {
    try {
      const res = await axios(URL_API)
      const joined = {...localData, ...res.data}
      const result = Object.entries(joined).sort().slice(lastActualDays)
      setData(result)
    } catch (e) {
      new Error(e.message)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  document.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('cell')){
      setHover(false)
    }
  })

  return (
    <div className='table'>
      {data.map((cell, idx) =>
        <TableCell
          key={idx}
          cell={cell}
          isHover={isHover}
          setHover={setHover}
        />)}
    </div>
  );
};


export default Table;