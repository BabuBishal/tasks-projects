import HelloWorld from "./components/HelloWorld";
import Counter from "./components/Counter";
import "./App.css";
import CounterClass from "./components/CounterClass";
import ReusableButton from "./components/ReusableButton";
import ReusableInput from "./components/ReusableInput";

function App() {
  return (
    <div className="app">
      {/* <HelloWorld />
      <Counter />
      <CounterClass /> */}
      <ReusableInput
        label="First Name"
        placeholder="Enter your first name here..."
      />
      <ReusableInput
        label="Last Name"
        placeholder="Enter your last name here..."
      />
      <ReusableButton variant="primary" buttonText="Submit" />
      <ReusableButton variant="secondary" />
    </div>
  );
}

export default App;
