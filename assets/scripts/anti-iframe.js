(function () {
    // 1. Verificar si la página está dentro de un iframe
    if (window.self !== window.top) {
        
        // Función interna para extraer el hostname de forma segura
        function obtenerDominioPadre() {
            // Método 1: Compatible con navegadores basados en Chromium (Chrome, Edge, Opera)
            if (window.location.ancestorOrigins && window.location.ancestorOrigins.length > 0) {
                try {
                    const url = new URL(window.location.ancestorOrigins[0]);
                    return url.hostname;
                } catch(e) {}
            }
            // Método 2: Compatible con Firefox y Safari usando el Referrer de HTTP
            if (document.referrer) {
                try {
                    const url = new URL(document.referrer);
                    return url.hostname;
                } catch(e) {}
            }
            // Si el navegador bloquea ambos por completo, devolvemos vacío para activar bloqueo por seguridad
            return "";
        }

        const hostname = obtenerDominioPadre();

        // 2. Definir los dominios de la LISTA BLANCA (Permitidos)
        const isLocalhost = hostname === '127.0.0.1' || hostname === 'localhost';
        const isOfficialHub = hostname.startsWith('hub16x.');
        const isPanasSeven = hostname === 'panas-seven.vercel.app';

        // 3. Si NO cumple ninguna de las excepciones permitidas, se bloquea la pantalla
        if (!isLocalhost && !isOfficialHub && !isPanasSeven) {
            mostrarPantallaError();
        }
    }

    // Función para renderizar el mensaje de error
    function mostrarPantallaError() {
        document.documentElement.innerHTML = `
<style>
  body {
    background-color: #111;
    color: #fff;
    font-family: Inter-SemiBold, monospace, "Segoe UI", -system-ui, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    text-align: center;
    padding: 20px;
    box-sizing: border-box;
  }

  .container {
    max-width: 500px;
    padding: 30px;
    border-radius: 8px;
    background: #222;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  }

  h1 { color: #ffffff; margin-top: 0; }
  p { line-height: 1.6; font-size: 1.1em; color: #ffffff; }
  a { color: #ffffff; text-decoration: none; font-weight: bold; }
</style>
<div class="container">
  <h1>Oops, wrong address!</h1>
  <p>It looks like you are accessing Hub 16x via a non-official URL. <br><br>
    <a href="https://github.io" target="_parent">Click here to play!</a>
  </p>
</div>
        `;
    }
})();
