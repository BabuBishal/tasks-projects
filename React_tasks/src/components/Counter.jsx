import { useState } from "react";
import "../styles/component/counter.css";

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="counter">
      <h2>Counter using functional component: {count}</h2>
      <div className="buttons">
        <button onClick={() => setCount(count + 1)}>Increment</button>
        {/* <button onClick={() => setCount(count + 1)}>Increment</button> */}
        <button onClick={() => setCount(count - 1)}>Decrement</button>
      </div>
    </div>
  );
};

export default Counter;
