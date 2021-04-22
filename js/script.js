let arrayListaQuizzes = []
let acertos
let questaoAtual
let quizzAtual

solicitarListaQuizzes()

function solicitarListaQuizzes(){
    let solicitaListaQuizz = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes")
    solicitaListaQuizz.then(renderizarQuizzes)
}

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
    quizzAtual = id-1
    acertos = 0
    questaoAtual = 0
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
    setTimeout(scrollarParaProximaQuestao, 1000)
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
    if(resposta === true){
        acertos ++
    }
    let questao = respostaEscolhida.parentNode
    let todasRespostas = questao.querySelectorAll(".opcao-resposta")
    for(let i = 0; i < todasRespostas.length; i++){
        todasRespostas[i].classList.remove("ocultar-cor")
        todasRespostas[i].classList.add("nao-escolhida")
        todasRespostas[i].removeAttribute("onclick")
    }
    
    const listaDeQuestoesParaScrollar = document.querySelectorAll(".caixa-de-questao")
    respostaEscolhida.classList.remove("nao-escolhida")
    if(questaoAtual <  listaDeQuestoesParaScrollar.length){
        setTimeout(scrollarParaProximaQuestao, 2000)
    }else{
        renderizarResultadoQuizz()
        setTimeout(scrollParaResultado, 2000)
    }
}

function scrollarParaProximaQuestao(){
    const listaDeQuestoesParaScrollar = document.querySelectorAll(".caixa-de-questao")
    listaDeQuestoesParaScrollar[questaoAtual].scrollIntoView()
}

function scrollParaResultado(){
    const scrollarParaResultadp = document.querySelector(".caixa-de-resultado")
    scrollarParaResultadp.scrollIntoView();
}

function renderizarResultadoQuizz(){
    const arrayListaNiveis = arrayListaQuizzes.data[quizzAtual].levels
    const acertosUsuario = (acertos / arrayListaQuizzes.data[quizzAtual].questions.length) * 100
    const renderizarResultado = document.querySelector(".tela-de-quizz")
    let maior = 0
    console.log(arrayListaNiveis)
    for(let i = 0; i < arrayListaNiveis.length; i++){
        if(acertosUsuario >= arrayListaNiveis[i].minValue && maior <= arrayListaNiveis[i].minValue){
                maior = i  
        }
    }
    console.log(maior)
    renderizarResultado.innerHTML += `
            <div class="caixa-de-resultado">
                <div class="titulo-resultado">${acertosUsuario.toFixed(0)}% de acertos: ${arrayListaNiveis[maior].title}</div>
                <div class="imagem-resultado">
                <img src="${arrayListaNiveis[maior].image}" alt="">
                </div>
                <div class="texto-resultado">
                <p>${arrayListaNiveis[maior].text}</p>
                </div>
            </div>
                <button class="reiniciar-quizz" onclick="renderizarQuizzSelecionado('${quizzAtual + 1}')">
                Reiniciar Quizz
                </button>
                <button class="voltar-home" onclick="renderizarHome()">
                Voltar para Home
                </button>
            `
}

function renderizarHome(){
    const selecionarHome = document.querySelector(".tela-inicial-desktop")
    selecionarHome.classList.remove("esconde")
    const selecionaTelaDeQuizz = document.querySelector(".tela-de-quizz")
    selecionaTelaDeQuizz.classList.add("esconde")
}
function comparador(){
    return Math.random() - 0.5;
}