window.onload = () => {
    var xhr = new XMLHttpRequest()
    xhr.open('GET','https://www.themealdb.com/api/json/v1/1/categories.php')
    xhr.send()

    xhr.onload = () => {
        if(xhr.status === 200) {
            var response =  JSON.parse(xhr.response).categories
            console.log(response)
            displayItems(response)
        }
    }
}
var cont = document.getElementById('cont')

const displayItems = (response) => {
    for(var i=0;i<response.length;i++) {
        var div = document.createElement('div')
        div.style.float = "left"
        div.style.margin = "5px"
        // div.style.border = "2px solid gray"
        div.style.width = "32%"
        div.style.height = "300px"

        var item_name = document.createElement('h3')
        var img = document.createElement('img')
        var description = document.createElement('para')
        

        img.src = response[i].strCategoryThumb
        img.style.width= "40%"

        item_name.textContent = 'Category : '+ response[i].strCategory
        description.textContent = 'Description : '+ response[i].strCategoryDescription
        
        div.append(img)
        div.append(item_name)
        div.append(description)
        cont.append(div)
    }
}