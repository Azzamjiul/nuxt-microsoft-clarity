const plugin = ({ app: { context } }) => {
  const runtimeConfig = context.$config && context.$config.microsoftClarity || {}
  const moduleOptions = <%= serialize(options) %>
  const options = {...moduleOptions, ...runtimeConfig}

  const scriptID = 'nuxt-microsoft-clarity';

  // Abort if no ID
  if (!options.id) {
    console.error('[nuxt-microsoft-clarity]: No tracking ID set');
    return;
  }

  // Abort if we already added script to head
  if (document.getElementById(scriptID)) {
    return;
  }

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.id = scriptID;
  script.defer = true;
  script.innerHTML = `
  if (!window.location.host.includes("localhost") || ${options.debug}) {
    (function (c, l, a, r, i, t, y) {
      if (window.location.host.includes("localhost"))
        c[a] =
          c[a] ||
          function () {
            (c[a].q = c[a].q || []).push(arguments);
          };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", "${options.id}");
  }  
  `
  document.head.appendChild(script);
};

export default plugin;
