function startWaiting(query) {
    
    $(query).append(
            '<span class="waiting">' +
                '<img src="images/loadingBar.gif"/>' +
                '<label>Espere...</label>' +
            '</span>'
        );
}

function stopWaiting(query, callback) {
    $(query).find(".waiting").remove();
    
    if (callback) {
        callback();
    }
}