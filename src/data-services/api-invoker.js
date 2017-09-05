import config from '../config';

export default

(url, method, transformInvokingData) => ({
  dataSource: data =>
        $.ajax({
          url: config.webServer.apiRoot + url,
          method,
          contentType: 'application/json',
          dataType: 'json',
          data,
          xhrFields: {
            withCredentials: true,
          },
        }).then(response => response),

  transformInvokingData,
});

