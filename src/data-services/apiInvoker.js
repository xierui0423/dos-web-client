export default

(url, method, transformInvokingData) => ({
    dataSource: data =>
        $.ajax({
            url,
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

