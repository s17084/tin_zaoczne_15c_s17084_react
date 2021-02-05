import React from "react";
import {handleLanguageChange} from '../i18n.js'
import {useTranslation} from 'react-i18next';
import LoginForm from "./other/LoginForm";

function Header(props) {
  const {t} = useTranslation();

  const {loginProps} = props;

  return (
      <>
        <div className="language-buttons">
          <button className="language-button" onClick={() => {
            handleLanguageChange('pl')
          }}>PL
          </button>
          <button className="language-button" onClick={() => {
            handleLanguageChange('en')
          }}>EN
          </button>
        </div>
        <header>
          <img src="/img/logo.png"
               alt="Squash Tournament Management System logo"/>
          <h1>{t('appName')}</h1>
          <img src="/img/logo.png"
               alt="Squash Tournament Management System logo"/>
        </header>
        <LoginForm loginProps={loginProps}/>
      </>
  )
}

export default Header;