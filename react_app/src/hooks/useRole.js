import React from "react";
import Roles from "./Roles";

const jwt = require('jsonwebtoken')

export const useRole = () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwt.decode(token)
  console.log(decodedToken)
  let role = '';
  let tokenExpired = true;
  let loggedUserId = null;
  if(token) {
    role = decodedToken.role
    const date = new Date(0);
    tokenExpired = date.setUTCSeconds(decodedToken.exp) < new Date();
    loggedUserId = decodedToken.userId;
  }

  return {
    isAdmin: role === Roles.ADMIN,
    isPlayer: role === Roles.PLAYER,
    loggedUserId: loggedUserId,
    tokenExpired: tokenExpired
  }
}