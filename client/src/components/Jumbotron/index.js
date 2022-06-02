import React from "react";

function Jumbotron({ children }) {
  return (
    <section
      style={{ height: 560, clear: "both", paddingTop: 120, textAlign: "center" }}
    >
      {children}
    </section>
  );
}

export default Jumbotron;
