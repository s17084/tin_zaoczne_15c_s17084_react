import React from "react"
import {useTranslation} from 'react-i18next';
import NavigationElement from "./NavigationElement";

const Navigation = () => {
  const {t} = useTranslation();

  return (
      <nav>
        <ul>
          <NavigationElement
              navTitle={t("pageTitles.mainPage")}
              to="/"
              key={0}/>
          <NavigationElement
              navTitle={t("pageTitles.players")}
              to="/players"
              key={1}/>
          <NavigationElement
              navTitle={t("pageTitles.tournaments")}
              to="/tournaments"
              key={2}/>
          <NavigationElement
              navTitle={t("pageTitles.participations")}
              to="/participations"
              key={3}/>
        </ul>
      </nav>
  )
}

export default Navigation;