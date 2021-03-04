import * as React from "react"; //React is not used, so this line is removed.
import * as ReactDOM from "react-dom";
//ClassAttributes is not used, so it is removed from the next line.
import { Component, ClassAttributes } from "react";

const formattedSeconds = (sec: number) =>
  Math.floor(sec / 60) + ":" + ("0" + (sec % 60)).slice(-2);

/* interface StopwatchProps describes the props of Stopwatch component. 
The interface type can extend a class type. This is used when we want the interface
to inherit the members of the class without their implementations. 
I think the use of "extends ClassAttributes<Stopwatch>" is overcomplication, so I removed it. */
interface StopwatchProps extends ClassAttributes<Stopwatch> {
  initialSeconds: number;
}
class Stopwatch extends Component<StopwatchProps, any> {
  //class variables
  incrementer: any;
  laps: any[];
  // constructor uses props: StopwatchProps to be more specific
  constructor(props: StopwatchProps) {
    super(props);
    //initial state
    this.state = {
      secondsElapsed: props.initialSeconds,
      lastClearedIncrementer: null
    };
    /*this binding is missing for handleStartClick, handleStopClick, etc. 
    "this" in onClick={this.handle...Click} will be undefined. We have to add:
       this.handleStartClick = this.handleStartClick.bind(this);
       this.handleStopClick = this.handleStopClick.bind(this);
       this.handleResetClick = this.handleResetClick.bind(this);
       this.handleLabClick = this.handleLabClick.bind(this);
       this.handleDeleteClick = this.handleDeleteClick.bind(this);
    */
    this.laps = [];
  }

  handleStartClick() {
    this.incrementer = setInterval(
      () =>
        this.setState({
          secondsElapsed: this.state.secondsElapsed + 1
        }),
      1000
    );
  }

  handleStopClick() {
    clearInterval(this.incrementer);
    this.setState({
      lastClearedIncrementer: this.incrementer
    });
  }

  //syntax error. (this.laps = []), should be replaced by this.laps=[];
  handleResetClick() {
    clearInterval(this.incrementer);
    (this.laps = []),
      this.setState({
        secondsElapsed: 0
      });
  }
  handleLabClick() {
    this.laps = this.laps.concat([this.state.secondsElapsed]);
    this.forceUpdate();
  }
  handleDeleteClick(index: number) {
    return () => this.laps.splice(index, 1);
  }
  render() {
    const { secondsElapsed, lastClearedIncrementer } = this.state;
    return (
      <div className="stopwatch">
        <h1 className="stopwatch-timer">{formattedSeconds(secondsElapsed)}</h1>{" "}
        {secondsElapsed === 0 || this.incrementer === lastClearedIncrementer ? (
          <button
            type="button"
            className="start-btn"
            onClick={this.handleStartClick}
          >
            start
          </button>
        ) : (
          <button
            type="button"
            className="stop-btn"
            onClick={this.handleStopClick}
          >
            stop
          </button>
        )}
        {secondsElapsed !== 0 && this.incrementer !== lastClearedIncrementer ? (
          <button type="button" onClick={this.handleLabClick}>
            lap
          </button>
        ) : null}
        {secondsElapsed !== 0 && this.incrementer === lastClearedIncrementer ? (
          <button type="button" onClick={this.handleResetClick}>
            reset
          </button>
        ) : null}
        <div className="stopwatch-laps">
          {this.laps &&
            this.laps.map((lap, i) => (
              <Lap
              //unique key is missing. I added key={i}
                index={i + 1}
                lap={lap}
                onDelete={this.handleDeleteClick(i)}
              />
            ))}{" "}
        </div>
      </div>
    );
  }
}
const Lap = (props: { index: number; lap: number; onDelete: () => {} }) => (
  <div key={props.index} className="stopwatch-lap">
    {" "}
    <strong>{props.index}</strong>/ {formattedSeconds(props.lap)}{" "}
    <button onClick={props.onDelete}> X </button>
  </div>
);
ReactDOM.render(
  <Stopwatch initialSeconds={0} />,
  document.getElementById("content")
);
