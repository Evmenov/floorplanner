import React from 'react'
import Agent from "./agent";


export default function AgentsList({ agents}) {
  const agentElements = agents.map(agent =>
    <li> key={agent.id}>
      <Agent agent={agent}></Agent>
  </li>
  )
  return (
    <ul>
      {agentElements}
    </ul>
  )
}
