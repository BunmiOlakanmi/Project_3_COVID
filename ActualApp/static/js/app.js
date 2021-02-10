(function () {
    const BUNDLE_PARAM = 'bundle=';

    fetchResource('/api_covid_infection.json')
      .then(loadBundle)
      .catch((error) => {
        const errorMessage = document.createTextNode(
          'MongoDB Charts can not be loaded, please try again later.\n\n' +
            error
        );
        document.body.appendChild(errorMessage);
      });

    function fetchResource(url) {
      return fetch(url).then((res) =>
        res.ok ? res.json() : Promise.reject(res.statusText)
      );
    }

    function loadBundle(app) {
      const clientAppId = location.pathname.split('/')[1];
      // redirect to /charts if clientAppId isn't included, will retrieve the correct charts app or activation page (if not activated)
      if (!clientAppId) {
        return location.replace(`${app.cloudBaseUrl}/charts`);
      }

      return getBundleId(app, clientAppId).then((bundleId) => {
        if (!bundleId) {
          return Promise.reject('Invalid clientAppId');
        }
        const appChunk = getAppChunk();
        loadStyle('vendor', bundleId);
        loadStyle(appChunk, bundleId);
        return loadScript('vendor', bundleId).then(() =>
          loadScript(appChunk, bundleId)
        );
      });
    }

    function getBundleId(app, clientAppId) {
      const bIdx = location.search.indexOf(BUNDLE_PARAM);
      if (bIdx >= 0) {
        const bundleId = location.search.substr(bIdx + BUNDLE_PARAM.length);
        if (bundleId) {
          return Promise.resolve(bundleId);
        }
      }
      return fetchResource(
        `${app.stitchWebhookBaseUrl}/api/client/v2.0/app/${clientAppId}/service/http/incoming_webhook/bundle-id`
      );
    }

    function getAppChunk() {
      const isEmbedding = /^\/[^\/.]+\/embed\/charts$/;
      const isDashboard = /^\/[^\/.]+\/public\/dashboards/;
      if (isEmbedding.test(location.pathname)) return 'embedding';
      if (isDashboard.test(location.pathname)) return 'dashboard-shared';
      return 'index';
    }

    function loadStyle(css, version) {
      const link = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.type = 'text/css';
      link.href = `/bundles/${version}/${css}.css`;
      document.head.appendChild(link);
    }

    function loadScript(js, version) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `/bundles/${version}/${js}.js`;
        script.onload = () => resolve();
        script.onerror = () => reject();
        document.head.appendChild(script);
      });
    }
  })();