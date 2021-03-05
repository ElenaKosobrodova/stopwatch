import React, { useState, useEffect, useRef } from "react";

const formattedSeconds = (sec: number) =>
  Math.floor(sec / 60) + ":" + ("0" + (sec % 60)).slice(-2);

interface StopwatchProps {
  initialSeconds: number;
}

const StopwatchHooks: React.FunctionComponent<StopwatchProps> = props => {
  let initial = props.initialSeconds;
  const [secondsElapsed, setSecondsElapsed] = useState(initial);
  const [lastClearedIncrementer, setLastClearedIncrementer] = useState<any>();
  const [laps, setLaps] = useState<any[]>([]);
  const [incrementer, setIncrementer] = useState<any>();

  function handleStartClick() {
    setIncrementer(
      setInterval(() => {
        setSecondsElapsed(secondsElapsed => secondsElapsed + 1);
      }, 1000)
    );
  }

  function handleStopClick() {
    clearInterval(incrementer);
    setLastClearedIncrementer(incrementer);
  }

  function handleResetClick() {
    clearInterval(incrementer);
    setSecondsElapsed(initial);
  }

  function handleLabClick() {
    setLaps(laps.concat([secondsElapsed]));
  }

  function handleDeleteClick(index: number) {
    return () => laps.splice(index, 1);
  }

  function Lap(props: { index: number; lap: number; onDelete: () => {} }) {
    return (
      <div key={props.index} className="stopwatch-lap">
        {" "}
        <strong>{props.index}</strong>/ {formattedSeconds(props.lap)}{" "}
        <button onClick={props.onDelete}> X </button>
      </div>
    );
  }

    useEffect(() => {
      let incr = setInterval(() => {
        setIncrementer(incrementer + 1);
      }, 1000);
      return () => clearInterval(incr);
    }, []);


  return (
    <div className="stopwatch">
      <h1 className="stopwatch-timer">{formattedSeconds(secondsElapsed)}</h1>{" "}
      {secondsElapsed === 0 || incrementer === lastClearedIncrementer ? (
        <button type="button" className="start-btn" onClick={handleStartClick}>
          start
        </button>
      ) : (
        <button type="button" className="stop-btn" onClick={handleStopClick}>
          stop
        </button>
      )}
      {secondsElapsed !== 0 && incrementer !== lastClearedIncrementer ? (
        <button type="button" onClick={handleLabClick}>
          lap
        </button>
      ) : null}
      {secondsElapsed !== 0 && incrementer === lastClearedIncrementer ? (
        <button type="button" onClick={handleResetClick}>
          reset
        </button>
      ) : null}
      <div className="stopwatch-laps">
        {laps &&
          laps.map((lap, i) => (
            <Lap
              key={i}
              index={i + 1}
              lap={lap}
              onDelete={handleDeleteClick(i)}
            />
          ))}{" "}
      </div>
    </div>
  );
};

export default StopwatchHooks;
