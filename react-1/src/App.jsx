import HelloWorld from "./components/HelloWorld";
import Counter from "./components/Counter";
import "./App.css";
import CounterClass from "./components/CounterClass";

function App() {
  return (
    <div className="app">
      <HelloWorld />
      <Counter />
      <CounterClass />
    </div>
  );
}

export default App;
