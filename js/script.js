let arrayListaQuizzes = []
let acertos = 0
let questaoAtual
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
    acertos = 0
    questaoAtual = 0
    setTimeout(scrollarParaProximaQuestao, 2000)
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
    const questoes = arrayListaQuizzes.data[indice].questions
    
    for(let i = 0; i < questoes.length; i++){
        const repostasEmbralhadas = embaralhaRespostas(questoes, i)
        renderizarQuestao.innerHTML += `
        <div class="caixa-de-questao">
          <div class="titulo-da-questao" style="background: ${questoes[i].color}">${questoes[i].title}</div>
          <div class="respostas">
        ${repostasEmbralhadas.join("")}
          </div>
        </div>
        `
    }
}


function embaralhaRespostas(questoes, i){
    let respostasEmbaralhadas =[]
    for(let j = 0; j < questoes[i].answers.length; j++){
        if(questoes[i].answers[j].isCorrectAnswer === true){
            respostasEmbaralhadas.push(`
                <div class="opcao-resposta correta ocultar-cor" onclick="escolherResposta(${questoes[i].answers[j].isCorrectAnswer}, this)">
                    <img src="${questoes[i].answers[j].image}" alt="">
                    <p>${questoes[i].answers[j].text}</p>
                </div>
            `)
        }else{
            respostasEmbaralhadas.push(`
                <div class="opcao-resposta errada ocultar-cor" onclick="escolherResposta(${questoes[i].answers[j].isCorrectAnswer}, this)">
                    <img src="${questoes[i].answers[j].image}" alt="">
                    <p>${questoes[i].answers[j].text}</p>
                </div>
        `)
        }
    }
   return respostasEmbaralhadas.sort(comparador)
}


function escolherResposta(resposta, respostaEscolhida){
    questaoAtual ++
    let questao = respostaEscolhida.parentNode
    let todasRespostas = questao.querySelectorAll(".opcao-resposta")
    console.log(todasRespostas)
    for(let i = 0; i < todasRespostas.length; i++){
        todasRespostas[i].classList.remove("ocultar-cor")
        todasRespostas[i].classList.add("nao-escolhida")
        todasRespostas[i].removeAttribute("onclick")
    }
    respostaEscolhida.classList.remove("nao-escolhida")
    setTimeout(scrollarParaProximaQuestao, 2000)
}

function scrollarParaProximaQuestao(){
    const listaDeQuestoesParaScrollar = document.querySelectorAll(".caixa-de-questao")
    listaDeQuestoesParaScrollar[questaoAtual].scrollIntoView()



}
function comparador(){
    return Math.random() - 0.5;
}