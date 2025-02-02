// Este es el punto de entrada de tu aplicación

import { onAuthStateChanged } from 'firebase/auth';
import { home } from './components/home.js';
import { login } from './components/login.js';
import { register } from './components/register.js';
import { register2 } from './components/register2.js';
import { error } from './components/error.js';
import { muro } from './components/muro.js';
import { resetPassword } from './components/resetpassword.js';
import { auth } from './lib/firebaseAuth.js';

// Llamamos a la función home y la agregamos al DOM

const root = document.getElementById('root');

const routes = [
  { path: '/', components: home },
  { path: '/login', components: login },
  { path: '/register', components: register },
  { path: '/register2', components: register2 },
  { path: '/error', components: error },
  { path: '/muro', components: muro },
  { path: '/resetpassword', components: resetPassword },
];

const defaultRoute = '/';

function navigateTo(hash) {
  const route = routes.find((routeFind) => routeFind.path === hash);
  if (route && route.components) {
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path,
    );
    if (root.firstChild) {
      root.removeChild(root.firstChild);
    }

    root.appendChild(route.components(navigateTo));
  } else {
    navigateTo('/error');
  }
}

window.onpopstate = () => {
  navigateTo(window.location.pathname);
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    navigateTo('/muro');
  } else if (window.location.pathname === '/muro' && !user) {
    navigateTo(defaultRoute);
  }
  navigateTo(window.location.pathname);
});
