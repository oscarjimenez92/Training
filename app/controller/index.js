/**
 * 
 * @param {element alert} e
 * Hide alert
 */
function closeAlert(e){
    e.style.display = 'none'
}

const invalidInfo = element => element.style.color = 'red';

/**
 * 
 * @param {modal open} id 
 * @param {generated event} ev 
 */
function validateForm(id, ev){
    let regExpEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/);
    let regExpNumber = new RegExp(/^[0-9]{10}$/);
    let message = "";
    let containerMessageModal = document.getElementById('messageModal');
    ev.preventDefault();
    let form = document.forms['form']; 
    const obj = {
        firstname: "",
        lastname: "",
        email: "",
        phonenumber: "",
        comments: ""
    }
    if(!!!form.elements[0].value.trim()){
        invalidInfo(form.elements[0])
        message+= `<strong>Firtsname</strong> \n`
    }if(!!!form.elements[1].value.trim()){
        invalidInfo(form.elements[1])
        message+= `<strong>Lastname</strong> \n`
    }if(!regExpEmail.test(form.elements[2].value)){
        invalidInfo(form.elements[2])
        message+= `<strong>Email</strong> \n`
    }if(!regExpNumber.test(form.elements[3].value)){
        invalidInfo(form.elements[3])
        message+= `<strong>Phone number "Min 10 digits</strong> \n`
    }if(!!!form.elements[4].value.trim()){
        invalidInfo(form.elements[4])
        message+= `<strong>Comments</strong>`
    }
    if(!message){
        const obj = {
            firstname: form.elements[0].value,
            lastname: form.elements[1].value ,
            email: form.elements[2].value,
            phonenumber: form.elements[3].value,
            comments: form.elements[4].value
        }
        containerMessageModal.innerHTML = `
        <div>
            <h4 class='text-success-info'>Info user</h4>
        </div>
        <div>
            <span><b>Firsname:</b></span>
            <span title="${obj.firstname}"> ${obj.firstname}</span>
        </div>
        <div>
            <span><b>Lastname: </b></span>
            <span title="${obj.lastname}">${obj.lastname}</span>
        </div>
        <div>
            <span><b>Email: </b></span>
            <span title="${obj.email}">${obj.email}</span>
        </div>
        <div>
            <span><b>Phone number: </b></span>
            <span title="${obj.phonenumber}">${obj.phonenumber}</span>
        </div>
        <div>
            <span><b>Comments: </b></span>
            <span title="${obj.comments}">${obj.comments}</span>
        </div>
        <div>
            <span><b>Send emails: </b></span>
            <span title="${document.getElementById("checkboxForm").checked ? 'Yes' : 'Not'}">${document.getElementById("checkboxForm").checked ? 'Yes' : 'Not'}</span>
        </div>
      `
    }else{
        console.log("Formulario con errores")
        containerMessageModal.innerHTML = `
        Debes completar todos los campos para visualizar la información, <b >campos con error:</b>: 
        <p>
            ${message}
        </p>
        `
    }
    window.location.href = `#${id}`
    
}



/*
* Window loading to access DOM
*/
window.addEventListener('load', () => {
    const urlService = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=5AAMG971G6GEX04HYE8Jhqw0qu5ITQho';
    const urlImages = 'https://static01.nyt.com/';
    let arr_data = [], itemsPerSection = 4, currentItems = 0, countItemsDropdown = 0, icons = ["address-book", "address-book-o", "address-card", "address-card-o", "bandcamp", "bath", "bathtub", "drivers-license", "drivers-license-o", "eercast", "envelope-open", "envelope-open-o"];
    const parent_top_news = document.getElementById("top-news-dinamic"); 
    const parent_dropdown_navbar = document.getElementById("dropdown"); 
        parent_dropdown_navbar.focus();
    const loader = document.getElementById("loader");
    
    /**
     * Rest API query
     */
    const getData = () => {
        return new Promise((resolve, reject) => {
            try {
                fetch(urlService)
                .then(response => {
                        if (response.status !== 200) {
                            console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                            return;
                        }
                        // Examine the text in the response
                        response.json().then(data => {
                            if(data){
                                if(data.response.hasOwnProperty('docs')){
                                    arr_data = data.response.docs
                                }else if(data.hasOwnProperty('response')){
                                    arr_data = data.response
                                }else{
                                    arr_data = data
                                }
                            }else{
                                arr_data = []
                            }
                            loader.style.display = "none"
                            resolve("Success: Data obtenida correctamente")
                            console.log(data);
                        });
                    }
                )
                .catch(function(err) {
                    console.log('error ocurrido', err);
                    reject("Error: Generado al obtener información de articulos")
                });
            } catch (error) {
                location.reload()   
            }
        })
    }
    /**
     * 
     * @param {array filter data} array 
     * Render items on screen in news section
     * 
     */
    const renderNewsitems = (array) => {
        console.log(array)

        try {
            for(let i = 0, n = array.length; i < n; i++){
                /**
                 * create list dropdown navbar
                 */
                countItemsDropdown++
                let item = document.createElement('a')
                    item.setAttribute("href", `#target_${countItemsDropdown}`)
                    item.setAttribute("target", "_self")
                        let text_item = document.createTextNode(`Noticia #${countItemsDropdown}`)
                        let icon = document.createElement('i')
                            icon.setAttribute('class', `fa fa-${icons[Math.floor(Math.random()*(icons.length))]}`)
                    item.appendChild(text_item)
                    item.appendChild(icon)
                parent_dropdown_navbar.appendChild(item)

                /**
                 * create cards top news
                 */
                let parent_card = document.createElement('div')
                    parent_card.setAttribute("class", "container-card-new")
                    parent_card.setAttribute("id", `target_${countItemsDropdown}`)
                        let container_img = document.createElement('div')
                            container_img.setAttribute("class", "container-img")
                            container_img.setAttribute("title", "Abrir noticia en una nueva pestaña")
                            container_img.addEventListener('click', () => {
                                window.open(array[i].web_url, "_blank")
                            })
                            let img = document.createElement("img")
                                img.setAttribute("src", `${urlImages}${returnRandomImg(array[i].multimedia)}`)
                                img.addEventListener('error', (target) => {
                                    this.setAttribute("src", "https://markateur.com/wp-content/uploads/2017/04/articles.jpg")
                                })
                        container_img.appendChild(img)
                    parent_card.appendChild(container_img)
                        let container_text_one = document.createElement('div')
                            container_text_one.setAttribute("class", "text-one")
                            let span_text_one = document.createElement('span')
                            let text_one = document.createTextNode(array[i].snippet)
                                span_text_one.setAttribute('title', array[i].snippet)
                                span_text_one.appendChild(text_one)
                            container_text_one.appendChild(span_text_one)
                    parent_card.appendChild(container_text_one)
                            let container_text_two = document.createElement('div')
                            container_text_two.setAttribute("class", "text-two")
                                let span_text_two = document.createElement('span')
                                    let text_two = document.createTextNode(array[i].lead_paragraph)
                                    span_text_two.setAttribute('title', array[i].lead_paragraph)
                                    span_text_two.appendChild(text_two)
                            container_text_two.appendChild(span_text_two)
                    parent_card.appendChild(container_text_two)
                parent_top_news.appendChild(parent_card)
                loader.style.display = "none"
            }
        } catch (error) {
            console.error("Error: Ha ocurrido al renderizar los items")
            console.log(error)
        }
    }   


    /**
     * Button home see more items
     */
    const clickButtonMoreItems = () => {
        loader.style.display = "flex"
        try {
            let start = 0, end = 0;
            currentItems += itemsPerSection
            if(currentItems > arr_data.length){
                if(arr_data.length - (currentItems + itemsPerSection) > 0){
                    start = currentItems + itemsPerSection;
                    end = arr_data.length - start
                    renderNewsitems(arr_data.slice(start, end))
                }else{
                    console.info("no hay más elementos para mostrar")
                }
            }else{
                start = currentItems
                end = currentItems + itemsPerSection
                renderNewsitems(arr_data.slice(start, end))
            }
        } catch (error) {
            console.error("Error: Ha ocurrido un error al dar click en el botón ver más items")
            console.log(error)
        }
    }

    const returnRandomImg = (array) => {
        return array[Math.floor(Math.random() * array.length)].url;
    }
    
    const initialicingButtonMoreNews = () => {
        const buttonMore = document.getElementById('buttonMore')
        buttonMore.addEventListener('click', (event) => {
            if(countItemsDropdown === arr_data.length){
                buttonMore.style.cssText = "cursor: not-allowed; background: #e04e4e !important";
                buttonMore.setAttribute("disabled", true)
                buttonMore.innerHTML = "No more articles"
            }else{
                clickButtonMoreItems()
            }
        })
    }

    /**
     * Initializing all functions app
     */
    const init = () =>{
        getData().then(response => {
            if(response.includes("Error")){
                console.log(`Error en promise: ${response}`)
            }else{
                renderNewsitems(arr_data.slice(currentItems, itemsPerSection))
            }
        })

        initialicingButtonMoreNews()
    }


    init()
})

