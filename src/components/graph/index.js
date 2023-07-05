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
  const months = {
    0: 'Янв.',
    1: 'Февр.',
    2: 'Март',
    3: 'Апр.',
    4: 'Май',
    5: 'Июнь',
    6: 'Июль',
    7: 'Авг.',
    8: 'Сент.',
    9: 'Окт.',
    10: 'Нояб.',
    11: 'Дек.',
  }
  const firstMonth = [moment().add(lastActualDays, 'days'), moment()][0]['_d'].getMonth()
  const array = Object.keys(months)
  const result = [...array.slice(firstMonth), ...array.slice(0, firstMonth)]

  return (
    <div className="graph--month">
      {result.map((m, idx) => (
        <div key={idx} className='graph--month--item'>{months[m]}</div>
      ))}
    </div>
  )
}


const Graph = () => {
  const getOneYear = () => {
    let obj = {}
    for (let i = lastActualDays; i < 1; i++) {
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