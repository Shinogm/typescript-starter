window.onload = function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const ui = SwaggerUIBundle({
    url: '/docs-json',
    dom_id: '#swagger-ui',
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
    layout: 'StandaloneLayout',
    onComplete: function () {
      // Agrega el botón de autenticación personalizada aquí
      const authButton = document.createElement('button');
      authButton.innerHTML = 'Custom Auth';
      authButton.onclick = function () {
        // Aquí puedes manejar la lógica de autenticación personalizada
        alert('Custom auth button clicked!');
      };
      // Agrega el botón a la barra de herramientas
      const header = document.querySelector('.topbar-wrapper');
      if (header) {
        header.appendChild(authButton);
      }
    },
  });
};
