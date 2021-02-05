import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import TextInputWithLabel from "./TextInputWithLabel";
import {login} from '../../api/api'

const LoginForm = (props) => {
  const {t} = useTranslation();

  const {loginProps} = props;
  const isLogged = loginProps.isLogged;

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  })

  const resetFormValues = () => {
    setFormValues({
      email: "",
      password: "",
    })
  }

  const setValue = (valueObject) => {
    setFormValues({...formValues, ...valueObject})
  }

  const handleLogout = (event) => {
    setFormValues({
      email: "",
      password: "",
    });
    loginProps.handleLogout();
  }

  useEffect(() => {
    if (loginProps.loginError) {
      const timer = setTimeout(() => {
        loginProps.resetLoginError();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loginProps])

  const handleSubmit = (event) => {
    event.preventDefault()
    const user = {
      email: formValues.email,
      password: formValues.password
    }
    let response
    login(user)
    .then(res => {
      response = res
      return res.json()
    })
    .then(
        (data) => {
          resetFormValues();
          if (response.status === 200) {
            if (data.token) {
              loginProps.handleLogin(data)
            }
          } else if (response.status === 401) {
            loginProps.handleLoginError(data.message)
          }
        }
    )
  }

  return (
      <div>
        {
          !isLogged ? (
              <div id="login" className="login-container">
                <form
                    className="login-form"
                    method="post"
                    noValidate
                    onSubmit={handleSubmit}>
                  <div>
                    <TextInputWithLabel
                        id="email"
                        labelText={t('login.emailLabel')}
                        type="email"
                        labelClass="login-form-label"
                        inputClass="login-form-input"
                        formValues={formValues}
                        setValue={setValue}
                        resetError={loginProps.resetLoginError}
                    />
                    <TextInputWithLabel
                        id="password"
                        labelText={t('login.passwordLabel')}
                        type="password"
                        labelClass="login-form-label"
                        inputClass="login-form-input"
                        formValues={formValues}
                        setValue={setValue}
                        resetError={loginProps.resetLoginError}
                    />

                    <input className="login-form-button" type="submit"
                           value={t('login.loginBtn')}/>

                    {/*<input className="register-form-button" type="submit"*/}
                    {/*       value={t('login.registerBtn')}/>*/}
                  </div>
                  {loginProps.loginError ? (
                      <span className="login-errors"
                            id="loginErrors">
                        {t('login.' + loginProps.loginError)}
                      </span>
                  ) : null}
                </form>
              </div>
          ) : (
              <div id="login" className="login-container">
                <span
                    className="logged-in-label">{t('login.loggedInMsg')}</span>
                <span className="logged-in-value">{loginProps.user.firstname
                + ' ' + loginProps.user.lastname}</span>
                <Link className="logout-button" onClick={handleLogout} to={"/"}>
                  {t('login.logoutBtn')}
                </Link>
              </div>
          )}
      </div>
  );
}

export default LoginForm;