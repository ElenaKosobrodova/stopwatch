import * as ReactDOM from "react-dom";
import { Component } from "react";

const formattedSeconds = (sec: number) =>
  Math.floor(sec / 60) + ":" + ("0" + (sec % 60)).slice(-2);

interface StopwatchProps {
  initialSeconds: number;
}

class Stopwatch extends Component<StopwatchProps, any> {
  incrementer: any;

  constructor(props: StopwatchProps) {
    super(props);
    this.state = {
      secondsElapsed: props.initialSeconds,
      lastClearedIncrementer: null,
      laps: []
    };
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleLabClick = this.handleLabClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleStartClick() {
    this.incrementer = setInterval(() => {
      this.setState({
        secondsElapsed: this.state.secondsElapsed + 1
      });
    }, 1000);
  }

  handleStopClick() {
    clearInterval(this.incrementer);
    this.setState({
      lastClearedIncrementer: this.incrementer
    });
  }
  handleResetClick() {
    clearInterval(this.incrementer);
    this.setState({ laps: [], secondsElapsed: 0 });
  }
  handleLabClick() {
    this.setState({
      laps: this.state.laps.concat([this.state.secondsElapsed])
    });
    this.forceUpdate();
  }
  handleDeleteClick(index: number) {
    const laps = [...this.state.laps];
    laps.splice(index, 1);
    return () => this.setState({ laps });
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
          {this.state.laps &&
            this.state.laps.map((lap: number, i: number) => (
              <Lap
                key={i}
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
const Lap = (props: { index: number; lap: number; onDelete: any }) => (
  <div key={props.index} className="stopwatch-lap">
    {" "}
    <strong>{props.index}</strong>/ {formattedSeconds(props.lap)}{" "}
    <button onClick={props.onDelete}> X </button>
  </div>
);

ReactDOM.render(
  <Stopwatch initialSeconds={0} />,
  document.getElementById("root")
);
