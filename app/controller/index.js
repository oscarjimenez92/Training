const urlService = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=5AAMG971G6GEX04HYE8Jhqw0qu5ITQho';
const urlImages = 'https://static01.nyt.com/images/';
let arr_data = [];
function prueba(){
    fetch(urlService)
    .then(response => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                response.status);
                return;
            }

            // Examine the text in the response
            response.json().then(data => {
                console.log(data);
                arr_data = data
            });
        }
    )
    .catch(function(err) {
        console.log('error ocurrido', err);
    });
}
prueba()



