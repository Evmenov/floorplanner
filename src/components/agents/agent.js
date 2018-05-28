import React from "react"

function Agent(props) {

  const {agent} = props
  const body = <section>{agent.name}</section>

  return (
    <div>
      <h2>{agent.surname}</h2>
      {body}
      <h2>{agent.corporation}</h2>
    </div>
  )
}

export default Agent
