import React from "react";

const PlayerParticipationsRow = (props) => {
  const {participation} = props;

  console.log(participation)

  return (
      <tr>
        <td>
          {participation.tournament.name}
        </td>
        <td className="centered-cell">
          {participation.finalPosition}
        </td>
        <td className="number-cell">
          {participation.rankPointsGained}
        </td>
        <td className="number-cell">
          {participation.rankPointsOverall}
        </td>
      </tr>
  )
}

export default PlayerParticipationsRow;