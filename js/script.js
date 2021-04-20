let solicitaListaQuizz = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes")
    solicitaListaQuizz.then(renderizarQuizzes)


function renderizarQuizzes(respostaComListaDeQuizzes){
   let listaQuizzes = document.querySelector(".lista-quizzes")
   
   
   for(let i = 0; i< respostaComListaDeQuizzes.data.length; i++){
       listaQuizzes.innerHTML +=`
       <li class="quizz">
            <img src="${respostaComListaDeQuizzes.data[i].image}" alt="">
            <div class="gradiente"></div>
            <h2>${respostaComListaDeQuizzes.data[i].title}</h2>
        </li>
       `
   }
}