import HelloWorld from "../components/HelloWorld";
import * as b3 from "b3-ui";
import "b3-ui/theme.css";
const Homepage = () => {
  const { Button } = b3;
  return (
    <>
      <HelloWorld
        title="Welcome to My Internship Tasks Dashboard"
        description="This React project is a collection of all the tasks I completed during my internship. Use the sidebar to navigate through different pages, each dedicated to a specific task."
      />
      <Button
        variant="primary"
        size="large"
        onClick={() => alert("Button from b3-ui clicked!")}
        disabled
      >
        Click Me
      </Button>

      <Button
        variant="secondary"
        size="large"
        onClick={() => alert("Button from b3-ui clicked!")}
      >
        Click Me
      </Button>
      {/* <Badge text="Success" variant="success" /> */}

      {/* {/* <Badge content="New" variant="success" /> */}
    </>
  );
};

export default Homepage;
