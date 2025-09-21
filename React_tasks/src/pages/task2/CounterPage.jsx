import Counter from "../../components/Counter";
import CounterClass from "../../components/CounterClass";
import HelloWorld from "../../components/HelloWorld";
const CounterPage = () => {
  return (
    <>
      <HelloWorld
        title="Task 2: Counter using both functional and class component"
        description=""
      />
      <br />
      <br />

      <Counter />
      <CounterClass />
    </>
  );
};

export default CounterPage;
