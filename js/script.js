let arrayListaQuizzes = []
let acertos
let questaoAtual
let quizzAtual
let quizzSelecionado = []
let teste;
let posicaoDoQuizzASerDeletado;
let estaEditando = false;
let posicaoDoQuizzSendoEditado;

//ADICIONEI
let arrayDeQuizzes = []
verificarSeExisteDataStorage();
let quantidadeDePerguntas;
let quizzEmQuestao;
let quantidadeDeNiveis;
let quizzCriado = {
    title:"",
    image:"",
    questions:[],
    levels:[]
}


function verificarSeExisteDataStorage(){
    if(JSON.parse(window.localStorage.getItem('Quizzes do Usuário'))===null||JSON.parse(window.localStorage.getItem('Quizzes do Usuário')).length===0){
      window.localStorage.setItem('Quizzes do Usuário', JSON.stringify(arrayDeQuizzes));
    }else{
      arrayDeQuizzes = JSON.parse(window.localStorage.getItem('Quizzes do Usuário'))
      document.querySelector(".criar-quizz").classList.add("esconde")
      document.querySelector(".quizzes-do-usuario").classList.remove("esconde")
    }
}

//essa linha abaixo eh usada quando precisa limpar o storage
//window.localStorage.setItem('Quizzes do Usuário', JSON.stringify([]))
console.log(arrayDeQuizzes)

function removerQuizz(posicaoDoQuizzNoDataStorage){
    posicaoDoQuizzASerDeletado = posicaoDoQuizzNoDataStorage
    let deletar = axios.delete("https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes/"+arrayDeQuizzes[posicaoDoQuizzNoDataStorage].data.id, {headers:{ "Secret-Key": arrayDeQuizzes[posicaoDoQuizzNoDataStorage].data.key}})
    console.log("apos axios")
    console.log(arrayDeQuizzes)
    deletar.then(deletou);
    deletar.catch(ocorreuErro);
}

function deletou(resposta){
    console.log("em resp")
    console.log(arrayDeQuizzes)
    console.log(resposta)
    arrayDeQuizzes.splice(posicaoDoQuizzASerDeletado,1)
    window.localStorage.setItem('Quizzes do Usuário', JSON.stringify(arrayDeQuizzes));
    console.log("em resp")
    console.log(arrayDeQuizzes)
    document.querySelector(".criar-quizz").classList.remove("esconde")
      document.querySelector(".quizzes-do-usuario").classList.add("esconde")
    verificarSeExisteDataStorage()
    solicitarListaQuizzes()
}

function ocorreuErro(resposta){
    console.log(resposta)
}

function editarQuizz(posicaoDoQuizzNoDataStorage){
    posicaoDoQuizzSendoEditado=posicaoDoQuizzNoDataStorage;
    estaEditando = true;
    renderizarTelaCriarQuizz()
}

solicitarListaQuizzes()

function solicitarListaQuizzes(){
    let solicitaListaQuizz = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes")
    solicitaListaQuizz.then(renderizarQuizzes)
}

function renderizarQuizzes(respostaComListaDeQuizzes){
    console.log(respostaComListaDeQuizzes)
    arrayListaQuizzes = respostaComListaDeQuizzes
    let listaQuizzes = document.querySelector(".todos-os-quizzes .lista-quizzes")
    listaQuizzes.innerHTML = ""
    for(let i = 0; i< respostaComListaDeQuizzes.data.length; i++){
        if(!arrayDeQuizzes.includes(respostaComListaDeQuizzes.data[i].id)){
            listaQuizzes.innerHTML +=`
                <li class="quizz" onclick="solicitarQuizzSelecionado('${respostaComListaDeQuizzes.data[i].id}')">
                    <img src="${respostaComListaDeQuizzes.data[i].image}" alt="">
                    <div class="gradiente"></div>
                    <h2>${respostaComListaDeQuizzes.data[i].title}</h2>
                </li>
            `
        }
    }
    renderizarQuizzesDoUsuario(respostaComListaDeQuizzes,arrayDeQuizzes)
}

function renderizarQuizzesDoUsuario(respostaComListaDeQuizzes,arrayDeQuizzes){
    let listaQuizzes = document.querySelector(".quizzes-do-usuario .lista-quizzes")
    listaQuizzes.innerHTML = ""
    for(let i = 0; i< arrayListaQuizzes.data.length; i++){
        for(let j=0;j<arrayDeQuizzes.length;j++){
            if(arrayDeQuizzes[j].data.id===respostaComListaDeQuizzes.data[i].id){
                 listaQuizzes.innerHTML +=`
                <li class="quizz meu-quizz">
                    <img src="${respostaComListaDeQuizzes.data[i].image}" alt="">
                    <div class="gradiente" onclick="solicitarQuizzSelecionado('${respostaComListaDeQuizzes.data[i].id}')"></div>
                    <h2 onclick="solicitarQuizzSelecionado('${respostaComListaDeQuizzes.data[i].id}')">${respostaComListaDeQuizzes.data[i].title}</h2>
                    <div class="editar-remover">
                        <ion-icon name="create-outline" onclick="editarQuizz(${j})"></ion-icon>
                        <ion-icon name="trash-outline" onclick="removerQuizz(${j})"></ion-icon>
                    </div>
                </li>
                `
                console.log(respostaComListaDeQuizzes.data[i])
            }
        }
    }
}

function solicitarQuizzSelecionado(id){
    const solicitacao = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes/${id}`)
    
    solicitacao.then(renderizarQuizzSelecionado)
}

function renderizarQuizzSelecionado(respostaComQuizz){
    quizzSelecionado = respostaComQuizz.data
    quizzAtual = respostaComQuizz.id
    acertos = 0
    questaoAtual = 0
    const ocultar = document.querySelector(".tela-inicial-desktop")
    ocultar.classList.add("esconde")
    const renderizar = document.querySelector(".tela-de-quizz")
    renderizar.classList.remove("esconde")
    renderizar.innerHTML = ""
    renderizarTituloQuizz()       
    renderizarQuestoes() 
    setTimeout(scrollarParaProximaQuestao, 1000)
}

function renderizarTituloQuizz(){
    const renderizarTitulo = document.querySelector(".tela-de-quizz")
    renderizarTitulo.innerHTML += `
    <div class="titulo-quizz">
        <img src="${quizzSelecionado.image}" alt="">
        <div class="gradiente"></div>
        <h2>${quizzSelecionado.title}</h2>
      </div>
    `
}

function renderizarQuestoes(){
    const renderizarQuestao = document.querySelector(".tela-de-quizz")
    const questoes = quizzSelecionado.questions
    for(let i = 0; i < questoes.length; i++){
        const repostasEmbralhadas = embaralhaRespostas(questoes, i)
        renderizarQuestao.innerHTML += `
        <div class="caixa-de-questao nao-respondida">
          <div class="titulo-da-questao" style="background: ${questoes[i].color}"><h2>${questoes[i].title}</h2></div>
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
    questao.parentNode.classList.remove("nao-respondida")
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
    const listaDeQuestoesParaScrollar = document.querySelector(".nao-respondida")
    listaDeQuestoesParaScrollar.scrollIntoView({block: "center", behavior: "smooth"})
}

function scrollParaResultado(){
    const scrollarParaResultadp = document.querySelector(".caixa-de-resultado")
    scrollarParaResultadp.scrollIntoView({block: "center", behavior: "smooth"});
}

function renderizarResultadoQuizz(){
    const arrayListaNiveis = quizzSelecionado.levels
    const acertosUsuario = (acertos / quizzSelecionado.questions.length) * 100
    const renderizarResultado = document.querySelector(".tela-de-quizz")
    let maior = 0
    console.log(arrayListaNiveis)
    for(let i = 0; i < arrayListaNiveis.length; i++){
        if(acertosUsuario >= arrayListaNiveis[i].minValue && maior <= arrayListaNiveis[i].minValue){
                maior = i  
        }
    }
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
                <button class="reiniciar-quizz" onclick="solicitarQuizzSelecionado('${quizzSelecionado.id}')">
                Reiniciar Quizz
                </button>
                <button class="voltar-home" onclick="renderizarHome()">
                Voltar para Home
                </button>
            `
}

function renderizarHome(){
    solicitarListaQuizzes()
    const selecionarHome = document.querySelector(".tela-inicial-desktop")
    selecionarHome.classList.remove("esconde")
    selecionarHome.scrollIntoView({block: "start", behavior: "smooth"}) 
    const selecionaTelaDeQuizz = document.querySelector(".tela-de-quizz")
    selecionaTelaDeQuizz.classList.add("esconde")
}

function comparador(){
    return Math.random() - 0.5;
}