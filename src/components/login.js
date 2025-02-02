import { logInUser } from '../lib/firebaseAuth.js';
import logoSinLetras from '../recursos/LogoSinLetras.png';
import backButtonIcon from '../recursos/arrow-left-solid.svg';

export const login = (navigateTo) => {
  const section = document.createElement('section');
  const logo = document.createElement('img');
  logo.src = logoSinLetras;
  const title = document.createElement('h2');
  title.classList.add('inicio-sesion');
  const inputEmail = document.createElement('input');
  inputEmail.classList.add('email');
  const inputPass = document.createElement('input');
  inputPass.classList.add('pass');
  inputPass.type = 'password';

  const logInInvalidPassMessage = document.createElement('span');
  logInInvalidPassMessage.classList.add('login-error');

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('botones-inicio-sesion');

  const backButton = document.createElement('img');
  backButton.classList.add('back-button');
  backButton.src = backButtonIcon;
  backButton.alt = 'back button';
  backButton.addEventListener('click', () => {
    navigateTo('/');
  });

  const buttonLog = document.createElement('button');
  title.textContent = 'Inicio de sesion';
  buttonLog.textContent = 'Iniciar sesion';
  buttonLog.classList.add('login-button');
  buttonLog.addEventListener('click', () => {
    const email = inputEmail.value;
    const password = inputPass.value;
    const logInAlert = (valid) => {
      if (valid === true) {
        navigateTo('/muro');
      }
    };
    logInUser(email, password, logInAlert);
  });

  inputEmail.placeholder = 'Escribe tu Email';
  inputPass.placeholder = 'Contraseña';

  const passwordReset = document.createElement('a');
  passwordReset.textContent = '¿Olvidaste tu contraseña?';
  passwordReset.id = 'password-reset';
  passwordReset.addEventListener('click', () => {
    navigateTo('/resetpassword');
  });

  buttonContainer.append(buttonLog);
  section.append(
    backButton,
    logo,
    title,
    inputEmail,
    inputPass,
    logInInvalidPassMessage,
    buttonContainer,
    passwordReset,
  );

  return section;
};
