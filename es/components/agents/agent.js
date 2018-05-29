import React from "react";

function Agent(props) {
  var agent = props.agent;


  return React.createElement(
    "div",
    null,
    React.createElement(
      "h3",
      null,
      agent.name,
      " ",
      agent.surname
    ),
    React.createElement(
      "h4",
      null,
      "\u041A\u043E\u0440\u043F\u043E\u0440\u0430\u0446\u0438\u044F: ",
      agent.corporation
    )
  );
}

export default Agent;