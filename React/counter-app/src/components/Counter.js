import { useState } from "react";

function Counter() {
  let [count, setCount] = useState(0);

  let incCount = () => {
    count = count + 1;
    setCount(count);
  };

  let decCount = () => {
    count = count - 1;
    setCount(count);
  };

  return (
    <>
      <h1>{count}</h1>

      <button className="btn-dec" onClick={decCount}>
        DEC
      </button>
      <button className="btn" onClick={incCount}>
        INC
      </button>
    </>
  );
}

export default Counter;
