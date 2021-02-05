import React from "react";
import {Link, useRouteMatch} from 'react-router-dom'

const NavigationElement = (props) => {
  const {navTitle, to} = props;
  const match = useRouteMatch({
    path: to,
    strict: true
  });

  return (
      <li>
        <Link
            className={match?.isExact || (to !== "/" && match) ? 'nav-active'
                : ''}
            to={to}>
          {navTitle}
        </Link>
      </li>
  )
}

export default NavigationElement;