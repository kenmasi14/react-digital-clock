import { useState, useEffect } from "react";

const App = () =>  {
  const [clock, setClock] = useState(new Date());
  const [is12HoursFormat, setItis24HoursFormat] = useState(true);
  const [showSeconds, getShowSeconds] = useState(true);
  const [showAMPM, getAMPM] = useState(true);

  useEffect(() =>{
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  }, []);

  const tick = () =>{
    setClock(new Date());
  };

  const formatTime = () => {
    let hours = clock.getHours();
    let minutes = clock.getMinutes();
    let seconds = clock.getSeconds();
    let ampm = '';
    if (is12HoursFormat){
      ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
    }

    hours = padZero(hours);
    minutes = padZero(minutes);
    seconds = padZero(seconds);

    if (!showSeconds) {
      return `${hours}:${minutes} ${ampm}`;
    }

    if (!showAMPM && !showSeconds) {
      return `${hours}:${minutes}`;
    }

    if(!showAMPM){
      return `${hours}:${minutes}:${seconds}`;
    }

    return `${hours}:${minutes}:${seconds} ${ampm}`;
  };
  

  const padZero = (num) =>{
    return num.toString().padStart(2, '0');
  }
  const handleFormatChange = (event) => {
    setItis24HoursFormat(event.target.checked);
  };

  const handleSecondToggle = (event) => {
    getShowSeconds(event.target.checked);
  };
  const showAMPMToggle = (event) =>{
    getAMPM(event.target.checked);
  }
  return (
    <>
      <h1>{formatTime()}</h1>
      <input type="checkbox" checked={is12HoursFormat} value={clock} onChange={handleFormatChange}></input>
      <span></span>
      <input type="checkbox" checked={showSeconds} onChange={handleSecondToggle}></input>
      {is12HoursFormat &&(
        <input type="checkbox" checked={showAMPM} onChange={showAMPMToggle}></input>
      )}
    </>
  );
}

export default App;
