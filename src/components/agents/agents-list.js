import React from 'react'
import Agent from "./agent";


export default function AgentsList({ agents}) {
  const agentElements = agents.map(agent =>
    <section key={agent.id}> >
      <Agent agent={agent}></Agent>
  </section>
  )
  return (
    <ul>
      {agentElements}
    </ul>
  )
}
