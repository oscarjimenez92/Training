function prueba(){
    fetch('http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=API_KEY')
    .then(response => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                response.status);
                return;
            }

            // Examine the text in the response
            response.json().then(function(data) {
                console.log(data);
            });
        }
    )
    .catch(function(err) {
        console.log('error ocurrido', err);
    });
}
prueba()