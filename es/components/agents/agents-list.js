import React from 'react';
import Agent from "./agent";

export default function AgentsList(_ref) {
  var agents = _ref.agents;

  var agentElements = agents.map(function (agent) {
    return React.createElement(
      "section",
      { key: agent.id },
      " >",
      React.createElement(Agent, { agent: agent })
    );
  });
  return React.createElement(
    "ul",
    null,
    agentElements
  );
}