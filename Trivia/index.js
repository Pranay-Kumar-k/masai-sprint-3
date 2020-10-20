var arr;
window.onload = () => {
    var xhr = new XMLHttpRequest() 
    xhr.open('GET','https://opentdb.com/api.php?amount=15&category=18&type=multiple')
    xhr.send()

    xhr.onload = () => {
        if(xhr.status === 200) {
            var response = JSON.parse(xhr.response).results
            console.log(response)
            arr = response
            displayData(response)
        }
    }

}


var cont = document.getElementById('cont')

const displayData = (response) => {
    for(var i=0;i<response.length;i++) {

        var category = document.createElement('p')
        var difficulty = document.createElement('p')
        var question = document.createElement('h3')
        var hr = document.createElement('hr')

        
        category.innerHTML = `Category :${response[i].category}`
        difficulty.innerHTML = `Difficulty : ${response[i].difficulty}`
        question.innerHTML = `Question :${response[i].question}`
        
        cont.append(category)
        cont.append(difficulty)
        cont.append(question)
        
        var div = document.createElement('div')

        var correct = document.createElement('button')
        for(var j=0;j<response[i].incorrect_answers.length;j++) {
            var button = document.createElement('button')
            button.textContent = response[i].incorrect_answers[j]
            button.style.float = "left"
            div.append(button)
        }
        correct.textContent = response[i].correct_answer
        div.append(correct)
        div.append(hr)
        // console.log(correct,response[i].incorrect_answers.length)
        cont.append(div)
    }
}

var Answer = document.getElementById('cont')
Answer.onclick = () => {
    const{textContent} = event.target

        var ans = false
        for(var i=0;i<arr.length;i++) {
            if(textContent === arr[i].correct_answer) {
               alert('Correct Answer')
               break;
            }
            else {
                alert('Wrong Anwer') 
                break;
            }
        }
}
