import React from "react"

function Agent(props) {

const {agent} = props


return (
  <div>
    <h3>{agent.name} {agent.surname}</h3>
    <h4>Корпорация: {agent.corporation}</h4>
  </div>
)
}

export default Agent
