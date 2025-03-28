/* eslint-disable no-unused-vars */
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navigation from "./components/Navigation";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Navigation />
    </>
  );
}

export default App;
