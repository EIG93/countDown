import { useEffect } from 'react';
import { useState } from 'react';
import './CountDown.css';
import background from '../assets/background.jpg';

export default function CountDown() {

  
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(30)
  const [isCounting, setIsCounting] = useState(false)


  const initialTime = hour * 3600 + minute * 60 + second;
  const [time, setTime] = useState(initialTime) //default time is 3600 

  useEffect(() => {
    console.log("useEffect--" + isCounting + "---time=" + initialTime);

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
       
        setHour(0);
        setMinute(0);
        setSecond(30);
        setIsCounting(false)
      }
    }else {
      setTime(initialTime)
    }
    
    // else {
    
  }, [isCounting, time])

  const foramtText = (e, type) => {
    console.log(e.target.value);
    let value = e.target.value.replace("/e|E/g", "")

    console.log(value);
    switch(type) {
      case 0 :
        setHour(parseInt(value))
        setTime(parseInt(value) * 3600 + minute * 60 + second)
      break

      case 1:
        setMinute(parseInt(value))
        setTime(hour * 3600 + parseInt(value) * 60 + second)
      break

      case 2:
        setSecond(parseInt(value))
        setTime(hour * 3600 + minute * 60 + parseInt(value))
      break
    }
    
  }


  const addPreZero = (number) => {
    if (number >= 10) {
      return `${number}`
    } else {
      return `0${number}`
    }
  }


  function startCountDown() {

    let time = hour * 3600 + minute * 60 + second

    console.log('startCountDown--minute--' + time);
    console.log('startCountDown--' + time);


    setIsCounting(!isCounting);
    // if (isCounting) {
    //   //to stop
    //   if (time > 0) {
    //     setIsCounting(false);
    //   }
    // } else {
    //   // if (time <= 0) {
    //   //   setTime(time);
    //   // }
    //   // if (time === initTime) {
    //   //   setTime(time - 1);
    //   // }

    //   setIsCounting(true);

    // }
    console.log("startCountDown--" + isCounting + "--time = " + time);

  }

  function reset() {
    setHour(0);
    setMinute(0);
    setSecond(30);
    setTime(30)
    setIsCounting(false)
  }


  return (
    <div id='countDown-container'>
      <div className='time-container'>
        {/* <div id='year'></div>
        <div id='month'></div>
        <div id='day'></div> */}

        <div id='hour' className='time' >
          <input className='time-input' type='number' value={hour} onChange={(e) => 
            foramtText(e, 0)
          }  onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}  />
          <span className='time-line'></span>
          <label className='time-label'>Hour</label>
          {/* {addPreZero(hour)}  */}
        
        </div>
        <div className='semicolon'>
          <div >:</div>
        </div>

        <div id='minute' className='time'>
          <input className='time-input' type='number' value={minute} onChange={(e) => 
            foramtText(e, 1)
          } onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}/>
          <span className='time-line'></span>
          <label className='time-label'>Minute</label>

          {/* {addPreZero(minute)} */}
        </div>
        <div className='semicolon'>
          <c>:</c>
        </div>
        <div id='second' className='time'>
        <input className='time-input' type='number'  value={second} onChange={(e) => 
            foramtText(e, 2)
          } onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}/>
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
