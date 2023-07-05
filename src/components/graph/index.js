import React, {useEffect, useState} from 'react';
import Table from "../table";
import moment from 'https://cdn.skypack.dev/moment?min'
import {toJson} from "../../helpers/toJson";
import {lastActualDays} from "../../helpers/constants";

const Weeks = () => {
  const weekCount = 7
  const weekDays = {
    0: 'Пн',
    2: 'Ср',
    4: 'Пт',
  }
  return (
    <div className='graph--row--weeks'>
      {Array.from(new Array(weekCount)).map((_, index) => (
        <span key={index}>{weekDays[index]}</span>
      ))}
    </div>
  )
}


const Month = () => {
  return (
    <div className="graph--month"></div>
  )
}


const Graph = () => {
  const getOneYear = () => {
    let obj = {}
    for (let i = lastActualDays; i < 1; i++){
      const range = [moment().add(i, 'days'), moment()]
      const key = toJson(range[0]['_d'])
      obj = {...obj, [key]: 0}
    }
    return obj
  }
  return (
    <div className='graph'>
      <Month/>
      <div className='graph--row'>
        <Weeks/>
        <Table localData={getOneYear()}/>
      </div>
    </div>
  );
};

export default Graph;