let arrayListaQuizzes = []

let solicitaListaQuizz = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes")
    solicitaListaQuizz.then(renderizarQuizzes)


function renderizarQuizzes(respostaComListaDeQuizzes){
    arrayListaQuizzes = respostaComListaDeQuizzes
   let listaQuizzes = document.querySelector(".lista-quizzes")
   listaQuizzes.innerHTML = ""
   for(let i = 0; i< respostaComListaDeQuizzes.data.length; i++){
       listaQuizzes.innerHTML +=`
       <li class="quizz" onclick="renderizarQuizzSelecionado('${respostaComListaDeQuizzes.data[i].id}')">
            <img src="${respostaComListaDeQuizzes.data[i].image}" alt="">
            <div class="gradiente"></div>
            <h2>${respostaComListaDeQuizzes.data[i].title}</h2>
        </li>
       `
   }
}

function renderizarQuizzSelecionado(id){
    const ocultar = document.querySelector(".tela-inicial-desktop")
    ocultar.classList.add("esconde")
    const renderizar = document.querySelector(".tela-de-quizz")
    renderizar.classList.remove("esconde")
    renderizar.innerHTML = ""
    for(let i = 0; i < arrayListaQuizzes.data.length; i++){
        if(id === `${arrayListaQuizzes.data[i].id}`){
            renderizarTituloQuizz(i)       
            renderizarQuestoes(i) 
        }
    }
}

function renderizarTituloQuizz(indice){
    const renderizarTitulo = document.querySelector(".tela-de-quizz")
    renderizarTitulo.innerHTML += `
    <div class="titulo-quizz">
        <img src="${arrayListaQuizzes.data[indice].image}" alt="">
        <div class="gradiente"></div>
        <h2>${arrayListaQuizzes.data[indice].title}</h2>
      </div>
    `
}

function renderizarQuestoes(indice){
    const renderizarQuestao = document.querySelector(".tela-de-quizz")
    for(let i = 0; i < arrayListaQuizzes.data[indice].questions.length; i++){
        console.log(i)
    }
}