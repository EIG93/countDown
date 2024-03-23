import { useEffect } from 'react';
import { useState } from 'react';
import './CountDown.css';
import background from '../assets/background.jpg';

export default function CountDown() {

  const initTime = 3600;
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)
  const [isCounting, setIsCounting] = useState(false)

  const [time, setTime] = useState(initTime) //default time is 3600 
  useEffect(() => {
    console.log("useEffect--" + isCounting + "---time=" + time);

    if (isCounting) {
      if (time >= 0) {
        const interval = setInterval(() => {

          console.log("setInterval触发" + time);
          const calHour = Math.floor(time / 3600);
          const calMinute = Math.floor((time / 60) % 60);
          const calSecond = time % 60;

          setHour(calHour);
          setMinute(calMinute);
          setSecond(calSecond);
          setTime(time - 1);
        }, 1000)

        return () => clearInterval(interval);
      } else {
        setTime(20)
        setIsCounting(false)
      }
    }

  }, [isCounting, time])

  const foramtText = (e, type) => {
    console.log(e.target.value);
    let value = e.target.value.replace("/e|E/g", "")

    console.log(value);
    switch(type) {
      case 0 :
        setHour(value)
      break

      case 1:
        setMinute(value)
      break

      case 2:
        setSecond(value)
      break
    }
  }

  const keyPress = (e) => {

  }
  const addPreZero = (number) => {
    if (number >= 10) {
      return `${number}`
    } else {
      return `0${number}`
    }
  }


  function startCountDown() {
    if (isCounting) {
      //to stop
      if (time > 0) {
        setIsCounting(false);
      }
    } else {
      if (time <= 0) {
        setTime(initTime);
      }
      if (time === initTime) {
        setTime(time - 1);
      }

      setIsCounting(true);

    }
    console.log("startCountDown--" + isCounting + "--time = " + time);

  }

  function reset() {
    setHour(0);
    setMinute(0);
    setSecond(0);
    setTime(initTime)
    setIsCounting(false)
  }


  return (
    <div id='countDown-container'>
      <div className='time-container'>
        {/* <div id='year'></div>
        <div id='month'></div>
        <div id='day'></div> */}

        <div id='hour' className='time' >
          <input className='time-input' type='number'  onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}  />
          <span className='time-line'></span>
          <label className='time-label'>Hour</label>
          {/* {addPreZero(hour)}  */}
        
        </div>
        <div className='semicolon'>
          <div >:</div>
        </div>

        <div id='minute' className='time'>
          <input className='time-input' type='number'  onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}/>
          <span className='time-line'></span>
          <label className='time-label'>Minute</label>

          {/* {addPreZero(minute)} */}
        </div>
        <div className='semicolon'>
          <c>:</c>
        </div>
        <div id='second' className='time'>
        <input className='time-input' type='number' onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}/>
        <span className='time-line'></span>
          <label className='time-label'>Second</label>
          {/* {addPreZero(second)} */}
          </div>
      </div>

      <div id='btn-container'>
        <button className='time-btn' onClick={reset}>Reset</button>
        <button className='time-btn' onClick={startCountDown}>{isCounting ? "Stop" : "Start"}</button>
      </div>
    </div>
  )
}
