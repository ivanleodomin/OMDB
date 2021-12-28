import React from "react";

export default function useData() {
  const [data, setData] = React.useState("");

  const onChange = (e) => {
    setData(e.target.value);
  };

  return { data, onChange };
}
