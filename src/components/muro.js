import { logOut, auth } from '../lib/firebaseAuth.js';
import { addPost, getPosts, updatePost } from '../lib/firebaseStore.js';

export const muro = (navigateTo) => {
  const section = document.createElement('section');
  const logoMuro = document.createElement('img');
  logoMuro.src = './recursos/LogoSinLetras.png';
  logoMuro.classList.add('logo-muro');
  // Publicacion
  const publicacion = document.createElement('div');
  publicacion.classList.add('publicacion');
  const areaText = document.createElement('textarea');
  areaText.textContent = 'Comparte aquí...';
  const botonCompartir = document.createElement('button');
  botonCompartir.classList.add('boton-compartir');
  botonCompartir.textContent = 'Compartir';

  // *************Contenedor para los posts*************
  const postsContainer = document.createElement('div');
  postsContainer.classList.add('posts-container');

  // Actualizar la lista de publicaciones
  const updatePostsList = async () => {
    try {
      const posts = await getPosts();
      postsContainer.innerHTML = '';

      // *************Evento click del botón Compartir*************
      botonCompartir.addEventListener('click', async () => {
        if (areaText.value.trim() !== '') {
          try {
            const user = auth.currentUser;
            if (user) {
              const userId = user.email;
              console.log(userId);
              const postId = await addPost(userId, areaText.value.trim());
              if (postId) {
                areaText.value = '';
                // Llamada a la función aquí después de agregar la publicación
                await updatePostsList();
              } else {
                console.log('Error al agregar la publicación');
              }
            } else {
              console.log('Usuario no autenticado');
            }
          } catch (error) {
            console.error('Error al agregar la publicación:', error);
          }
        }
      });
      publicacion.append(areaText, botonCompartir);

      // *************Boton de cierre de sesión*************
      const logOutButton = document.createElement('button');
      logOutButton.classList.add('logOut-button');
      logOutButton.textContent = 'Cerrar sesion';
      logOutButton.addEventListener('click', () => {
        const logOutAlert = (valid) => {
          if (valid === true) {
            navigateTo('/');
          }
        };

        logOut(logOutAlert);
      });
      publicacion.append(areaText, botonCompartir);

      section.append(logoMuro, publicacion, postsContainer, logOutButton);

      // *************Mostrar los posts en el contenedor*************
      posts.forEach((post) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const contentElement = document.createElement('p');
        contentElement.classList.add('user-post');
        contentElement.textContent = post.content;

        const getLikes = document.createElement('div');
        getLikes.classList.add('likes');
        getLikes.innerHTML += '<button class="like-button">Like</button><span> <strong>0</strong> Likes</span>';

        const user = auth.currentUser;
        const userEmail = user.email;
        const userElement = document.createElement('h6');
        userElement.textContent = `Publicado por: ${userEmail}`;

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar 🧁';
        editButton.addEventListener('click', async () => {
          const newContent = prompt('Editar Contenido', contentElement.textContent);
          if (newContent !== null && newContent.trim() !== '') {
            await updatePost(post.email, newContent);
            updatePostsList();
          }
        });

        postElement.append(userElement, contentElement, getLikes, editButton);

        postsContainer.append(postElement);
      });
    } catch (error) {
      console.error('Error al obtener las publicaciones:', error);
    }
  };

  // Llamar a la función para actualizar la lista de publicaciones al cargar la página inicialmente

  updatePostsList();
  return section;
};
