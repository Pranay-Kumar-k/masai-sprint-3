const search = document.getElementById('search'),
submit = document.getElementById('submit'),
random = document.getElementById('random'),
mealsEl = document.getElementById('meals'),
resultHeading = document.getElementById('result-heading'),
single_meal = document.getElementById('single-meal');
var category = document.getElementById('categories')

window.onload = () => {
    
    var xhr = new XMLHttpRequest()
    xhr.open('GET',"https://www.themealdb.com/api/json/v1/1/categories.php")
    xhr.send()
    
    xhr.onload = () => {
        if(xhr.status === 200) {
            var response = JSON.parse(xhr.response)
            console.log(response.categories)
            displayCategories(response.categories)
        }
    }
    

    const displayCategories = (item) => {
        var items = []
        for(var i=0;i<item.length;i++) {
            items.push(item[i].strCategory)
        }
        
        console.log(items)
        
        category.innerHTML = `<ul>
        ${items.map(ing => `<li><a>${ing}</a></li>`).join(" ")}
        </ul>`
        
        
    }
    
    var form = document.querySelector('form')
    form.addEventListener('submit', function() {
        event.preventDefault()
        
        const term = search.value;
        
        var xhr = new XMLHttpRequest()
        xhr.open('GET',`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        xhr.send()
        
        xhr.onload = () => {
            if(xhr.status === 200) {
                var data =  JSON.parse(xhr.response)
                console.log(data)
                
                if(!search.value) {
                    mealsEl.innerHTML = data.meals.map(meal => `
                    <div class='meal'> 
                    <img src = "${meal.strMealThumb}" alt="${meal.strMeal}" />
                    <div class ="meal-info" data-mealID="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                    </div>
                    </div> `)
                    .join('');
                }                     
                resultHeading.innerHTML = `<h2>Search results for '${term}'</h2>`

                if(data.meals === null) {
                    resultHeading.innerHTML = `<p> There are no search results. Try again</p>`;                                
                }
                else {
                    mealsEl.innerHTML = data.meals.map(meal => `
                    <div class='meal'> 
                        <img src = "${meal.strMealThumb}" alt="${meal.strMeal}" />
                        <div class ="meal-info" data-mealID="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                        </div>
                        </div> `)
                        .join('');
                    }
                    search.value=""
            }
        }
    })
}



mealsEl.addEventListener('click', e => {
    single_meal.innerHTML="";
    const mealInfo = e.path.find(item => {
        if(item.classList) {
            return item.classList.contains('meal-info')
        }
        else {
            return false
        }
    })

    if(mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealID');
        getMealById(mealID)
    }
})


function getMealById(mealID) {
    var xhr = new XMLHttpRequest() 
    xhr.open('GET',`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    xhr.send()
    
    xhr.onload = () => {
        if(xhr.status === 200) {
            var data =  JSON.parse(xhr.response).meals[0]
            console.log(data)
            addMealToDOM(data)
        }
    }
} 

function addMealToDOM(meal) {
        const ingredients = []
    
    for(let i=1;i<=20;i++) {
        if(meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        }
        else {
            break;
        }
    }
    // var url = meal.strYoutube +"/override-http-headers-default-settings-x-frame-options";

    single_meal.innerHTML = `
    <div class="single-meal"> 
        <h1>${meal.strMeal}</h1> 
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    
    <div class="single-meal-info">
        ${meal.strCategory ? `<p> ${meal.strCategory}</p>` : ""}
        ${meal.strCategory ? `<p>${meal.strArea}</p>` : ""}
    </div>
    <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
        ${ingredients.map(ing => `<li>${ing}</li>`).join("")}
        </ul>
    </div>
    <div>
    <h2>Eager to know how to Prepare. Watch the video given below</h2>
    <iframe width="420" height="315" src="${meal.strYoutube}">
    </iframe>
    <p>If the video doesn't work.<a href="${meal.strYoutube}" target=_blank> Click here </a></p>
    </div>
    </div>
    `
}
