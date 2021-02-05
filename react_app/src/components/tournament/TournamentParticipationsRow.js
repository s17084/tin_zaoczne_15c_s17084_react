import React from "react";

const TournamentParticipationsRow = (props) => {
  const {participation} = props;

  return (
      <tr>
        <td>
          {participation.player.firstname + ' ' + participation.player.lastname}
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

export default TournamentParticipationsRow;