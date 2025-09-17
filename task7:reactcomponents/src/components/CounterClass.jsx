import React from "react";
export default class CounterClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <div className="counter">
        <h2>Counter using class component: {this.state.count}</h2>
        <div className="buttons">
          <button
            onClick={() => this.setState({ count: this.state.count + 1 })}
          >
            Increment
          </button>
          <button
            onClick={() => this.setState({ count: this.state.count - 1 })}
          >
            Decrement
          </button>
        </div>
      </div>
    );
  }
}
