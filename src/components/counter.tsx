import { useState } from "react";

export default function Counter({
  initialCount = 0,
  label = "Count",
}: {
  initialCount?: number;
  label?: string;
}) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      <h1>
        {label}: {count}
      </h1>
      <button onClick={() => setCount(count + 1)}>Increment: {count}</button>
    </>
  );
}
