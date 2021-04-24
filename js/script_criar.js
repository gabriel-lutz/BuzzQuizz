
function adicionandoQuizzEmDataStorage(novoQuizz){
  arrayDeQuizzes.push(novoQuizz)
  window.localStorage.setItem('Quizzes do Usuário', JSON.stringify(arrayDeQuizzes));
}

function estenderPergunta(pergunta){
  if(document.querySelector(".perguntas-do-quizz .esconde")!== null){
    document.querySelector(".perguntas-do-quizz .conteudo-para-preencher .esconde").parentNode.classList.add("colapsed")
    document.querySelector(".perguntas-do-quizz .conteudo-para-preencher .esconde").classList.remove("esconde")
  }
  pergunta.parentNode.classList.remove("colapsed")
  pergunta.classList.add("esconde")
  pergunta.parentNode.scrollIntoView(true);
  window.scrollBy(0, -100);
}

function estenderNivel(pergunta){
  if(document.querySelector(".niveis-do-quizz .esconde")!== null){
    document.querySelector(".niveis-do-quizz .conteudo-para-preencher .esconde").parentNode.classList.add("colapsed")
    document.querySelector(".niveis-do-quizz .conteudo-para-preencher .esconde").classList.remove("esconde")
  }
  pergunta.parentNode.classList.remove("colapsed")
  pergunta.classList.add("esconde")
  pergunta.parentNode.scrollIntoView(true);
  window.scrollBy(0, -100);
}


function renderizarTelaCriarQuizz(){
  document.querySelector(".tela-inicial-desktop").classList.add("esconde")
  document.querySelector(".info-basica-do-quizz").classList.remove("esconde")
  if(estaEditando){
    colocarDadosPg1();
  }
}
function colocarDadosPg1(){
  document.querySelector(".input-titulo-do-quizz").value=arrayDeQuizzes[posicaoDoQuizzSendoEditado].data.title
  document.querySelector(".input-endereco-da-imagem").value=arrayDeQuizzes[posicaoDoQuizzSendoEditado].data.image
  document.querySelector(".input-quantidade-de-perguntas").value=arrayDeQuizzes[posicaoDoQuizzSendoEditado].data.questions.length
  document.querySelector(".input-quantidade-de-niveis").value=arrayDeQuizzes[posicaoDoQuizzSendoEditado].data.levels.length
}
function colocarDadosPg2(){
  for (let i = 0;i < arrayDeQuizzes[posicaoDoQuizzSendoEditado].data.questions.length; i++) {
    const perguntaSendoVerificada = document.querySelector(".pergunta"+(i+1));
    perguntaSendoVerificada.querySelector(".input-pergunta").value =arrayDeQuizzes[posicaoDoQuizzSendoEditado].data.questions[i].title
    perguntaSendoVerificada.querySelector(".cor-de-fundo").value = arrayDeQuizzes[posicaoDoQuizzSendoEditado].data.questions[i].color
    perguntaSendoVerificada.querySelector(".resposta-correta").value = arrayDeQuizzes[posicaoDoQuizzSendoEditado].data.questions[i].answers[0].text
    perguntaSendoVerificada.querySelector(".imagem-resposta-correta").value = arrayDeQuizzes[posicaoDoQuizzSendoEditado].data.questions[i].answers[0].image
    for(let j=1;j<arrayDeQuizzes[posicaoDoQuizzSendoEditado].data.questions[i].answers.length;j++){
      perguntaSendoVerificada.querySelector(".resposta-incorreta-"+(j)).value=arrayDeQuizzes[posicaoDoQuizzSendoEditado].data.questions[i].answers[j].text
      perguntaSendoVerificada.querySelector(".imagem-incorreta-"+(j)).value=arrayDeQuizzes[posicaoDoQuizzSendoEditado].data.questions[i].answers[j].image
    }
  }
}
    
function colocarDadosPg3(){
  for (let i = 0;i<arrayDeQuizzes[posicaoDoQuizzSendoEditado].data.levels.length; i++) {
    const nivelASerVerificado = document.querySelector(".nivel"+(i+1));
    nivelASerVerificado.querySelector(".titulo-do-nivel").value = arrayDeQuizzes[posicaoDoQuizzSendoEditado].data.levels[i].title
    nivelASerVerificado.querySelector(".porcentagem-do-nivel").value = arrayDeQuizzes[posicaoDoQuizzSendoEditado].data.levels[i].minValue
    nivelASerVerificado.querySelector(".imagem-do-nivel").value = arrayDeQuizzes[posicaoDoQuizzSendoEditado].data.levels[i].image
    nivelASerVerificado.querySelector(".descricao-do-nivel").value = arrayDeQuizzes[posicaoDoQuizzSendoEditado].data.levels[i].text
  }
}

function validarDadosPg1(estaPagina){
  const tituloQuizz = document.querySelector(".input-titulo-do-quizz").value;
  const enderecoImagem = document.querySelector(".input-endereco-da-imagem").value;
  quantidadeDePerguntas = parseInt(document.querySelector(".input-quantidade-de-perguntas").value);
  quantidadeDeNiveis = parseInt(document.querySelector(".input-quantidade-de-niveis").value);

  if(tituloQuizz.length<20 || tituloQuizz.length>65){
    document.querySelector(".info-basica-do-quizz .erro").innerHTML="O título precisa ter de 20 à 65 caracteres!";
    document.querySelector(".input-titulo-do-quizz").value="";
    return;
  }
  if(!validURL(enderecoImagem)){
    document.querySelector(".info-basica-do-quizz .erro").innerHTML="Endereço de imagem inválido!";
    document.querySelector(".input-endereco-da-imagem").value="";
    return;
  }
  if(quantidadeDePerguntas<3 || isNaN(quantidadeDePerguntas)){
    document.querySelector(".info-basica-do-quizz .erro").innerHTML="O número de perguntas precisa ser um número maior ou igual a 3";
    document.querySelector(".input-quantidade-de-perguntas").value="";
    return;
  }
  if(quantidadeDeNiveis<2 || isNaN(quantidadeDeNiveis)){
    document.querySelector(".info-basica-do-quizz .erro").innerHTML="O quantidade de níveis precisa ser um número maior ou igual a 2";
    document.querySelector(".input-quantidade-de-niveis").value="";
    return;
  }

  quizzCriado.title = tituloQuizz;
  quizzCriado.image = enderecoImagem;

  estaPagina.parentNode.classList.add("esconde")
  document.querySelector(".perguntas-do-quizz").classList.remove("esconde")
  

  gerarPaginaDePerguntasDoQuizz(quantidadeDePerguntas);
  gerarPaginaDeNiveisDoQuizz(quantidadeDeNiveis);
  gerarPaginaFinalDeCriacao(tituloQuizz,enderecoImagem);

  document.querySelector(".input-titulo-do-quizz").value=""
  document.querySelector(".input-endereco-da-imagem").value=""
  document.querySelector(".input-quantidade-de-perguntas").value=""
  document.querySelector(".input-quantidade-de-niveis").value=""
 
}

function gerarPaginaDePerguntasDoQuizz(numeroDePerguntas){
  document.querySelector(".perguntas-do-quizz").innerHTML=`
    <div class="orientacoes-de-preenchimento">Crie suas perguntas</div>
    <div class="erro"></div>`;
  for(let i=0;i<numeroDePerguntas;i++){
    document.querySelector(".perguntas-do-quizz").innerHTML+=`<div class="conteudo-para-preencher pergunta${i+1} colapsed">
    <p onclick="esconde(this)">Pergunta ${i+1}</p>
    <input class="input-pergunta caixa-de-input" placeholder="Titulo da pergunta"></input>
    <input class="cor-de-fundo caixa-de-input" placeholder="Cor de fundo da pergunta"></input>
    <p>Resposta correta</p>
    <input class="resposta-correta caixa-de-input" placeholder="Resposta correta"></input>
    <input class="imagem-resposta-correta caixa-de-input" placeholder="URL da imagem"></input>
    <p>Respostas incorretas</p>
    <input class="resposta-incorreta-1 caixa-de-input" placeholder="Resposta incorreta 1"></input>
    <input class="imagem-incorreta-1 caixa-de-input" placeholder="URL da imagem 1"></input>
    <input class="resposta-incorreta-2 caixa-de-input" placeholder="Resposta incorreta 2"></input>
    <input class="imagem-incorreta-2 caixa-de-input" placeholder="URL da imagem 2"></input>
    <input class="resposta-incorreta-3 caixa-de-input" placeholder="Resposta incorreta 3"></input>
    <input class="imagem-incorreta-3 caixa-de-input" placeholder="URL da imagem 3"></input>
    <ion-icon name="document-outline" onclick="estenderPergunta(this)"></ion-icon>
  </div>`
  }
  document.querySelector(".perguntas-do-quizz").innerHTML+=`<div class="botao-para-prosseguir" onclick="validarDadosPg2(this)">Prosseguir para criar níveis</div>`
  document.querySelector(".perguntas-do-quizz ion-icon").click()
  if(estaEditando){
    colocarDadosPg2();
  }
}

function gerarPaginaDeNiveisDoQuizz(numeroDeNiveis){
  document.querySelector(".niveis-do-quizz").innerHTML = `
  <div class="orientacoes-de-preenchimento">Agora, decida os níveis</div>
  <div class="erro"></div>`;
  for(let i=0;i<numeroDeNiveis;i++){
    document.querySelector(".niveis-do-quizz").innerHTML +=`<div class="conteudo-para-preencher nivel${i+1} colapsed" >
    <p>Nível ${i+1}</p>
    <input class="titulo-do-nivel caixa-de-input" placeholder="Titulo do nível"></input>
    <input class="porcentagem-do-nivel caixa-de-input" placeholder="% de acerto mínima"></input>
    <input class="imagem-do-nivel caixa-de-input" placeholder="URL da imagem do nível"></input>
    <input class="descricao-do-nivel caixa-de-input" placeholder="Descrição do nível"></input>
    <ion-icon name="document-outline" onclick="estenderNivel(this)"></ion-icon>
  </div>`
  }
  document.querySelector(".niveis-do-quizz").innerHTML +=`<div class="botao-para-prosseguir" onclick="validarDadosPg3(this)">Finalizar quizz</div>`
  document.querySelector(".niveis-do-quizz ion-icon").click()
}

function gerarPaginaFinalDeCriacao(titulo,imagem){
  document.querySelector(".sucesso-do-quizz .conteudo-para-preencher").innerHTML=`
    <img src=${imagem} alt="">
    <div class="gradiente-titulo" onclick="acessarQuizz(this)"></div>
    <div class="nomeDoQuiz">${titulo}</div>`
}

function validarDadosPg2(estaPagina){
  const arrayDeQuestoesObj = [];

  for (let i = 0; i < quantidadeDePerguntas; i++) {
    const perguntaSendoVerificada = document.querySelector(".pergunta"+(i+1));
    const textoPergunta = perguntaSendoVerificada.querySelector(".input-pergunta").value;
    const corDeFundoPergunta = perguntaSendoVerificada.querySelector(".cor-de-fundo").value;
    const respostaCorreta = perguntaSendoVerificada.querySelector(".resposta-correta").value;
    const imagemRespostaCorreta = perguntaSendoVerificada.querySelector(".imagem-resposta-correta").value;
    const arrayRespostasObj = []
    if(textoPergunta.length<20){
      document.querySelector(".perguntas-do-quizz .erro").innerHTML=`PERGUNTA ${i+1}: A pergunta precisa ter 20 ou mais caracteres!`;
      perguntaSendoVerificada.querySelector(".input-pergunta").value="";
      estaPagina.parentNode.scrollIntoView(true);
      return
    }
    if(!validarHexadecimal(corDeFundoPergunta)){
      document.querySelector(".perguntas-do-quizz .erro").innerHTML=`PERGUNTA ${i+1}: Cor inválida! (Formato da cor: #xxxxxx)`;
      perguntaSendoVerificada.querySelector(".cor-de-fundo").value="";
      estaPagina.parentNode.scrollIntoView(true);
      return
    }
    if(respostaCorreta===""){
      document.querySelector(".perguntas-do-quizz .erro").innerHTML=`PERGUNTA ${i+1}: É necessario ter uma resposta correta!`;
      perguntaSendoVerificada.querySelector(".resposta-correta").value="";
      estaPagina.parentNode.scrollIntoView(true);
      return
    }
    if(!validURL(imagemRespostaCorreta)){
      document.querySelector(".perguntas-do-quizz .erro").innerHTML=`PERGUNTA ${i+1}: Endereço de imagem inválido!`;
      perguntaSendoVerificada.querySelector(".imagem-resposta-correta").value="";
      estaPagina.parentNode.scrollIntoView(true);
      return
    }
    if(perguntaSendoVerificada.querySelector(".resposta-incorreta-1").value==="" && perguntaSendoVerificada.querySelector(".resposta-incorreta-2").value==="" && perguntaSendoVerificada.querySelector(".resposta-incorreta-3").value===""){
      document.querySelector(".perguntas-do-quizz .erro").innerHTML=`PERGUNTA ${i+1}: É necessário preencher ao menos uma resposta incorreta!`;
      estaPagina.parentNode.scrollIntoView(true);
      return
    }
    
    arrayRespostasObj.push({text: respostaCorreta,image: imagemRespostaCorreta, isCorrectAnswer: true})
    
    for(let j=0;j<3;j++){
      const respostaIncorreta = perguntaSendoVerificada.querySelector(".resposta-incorreta-"+(j+1)).value;
      const imagemRespostaIncorreta = perguntaSendoVerificada.querySelector(".imagem-incorreta-"+(j+1)).value;
      if(perguntaSendoVerificada.querySelector(".resposta-incorreta-"+(j+1)).value!==""){
        if(!validURL(imagemRespostaIncorreta)){
          document.querySelector(".perguntas-do-quizz .erro").innerHTML=`PERGUNTA ${i+1}: Resposta Incorreta ${j+1}: Endereço de imagem inválido!`;
          perguntaSendoVerificada.querySelector(".imagem-incorreta-"+(j+1)).value="";
          estaPagina.parentNode.scrollIntoView(true);
          return
        }
        arrayRespostasObj.push({text: respostaIncorreta,image: imagemRespostaIncorreta, isCorrectAnswer: false})
      }
    }
    arrayDeQuestoesObj.push({title: textoPergunta,color: corDeFundoPergunta, answers: arrayRespostasObj})
  }
  quizzCriado.questions = arrayDeQuestoesObj


  estaPagina.parentNode.classList.add("esconde")
  document.querySelector(".niveis-do-quizz").classList.remove("esconde")
  if(estaEditando){
    colocarDadosPg3();
  }
}

function validarDadosPg3(estaPagina){
  const arrayPorcentagens = []
  const arrayDeNiveis=[]
  let temZero = false;

  for (let i = 0; i < quantidadeDeNiveis; i++) {
    const nivelASerVerificado = document.querySelector(".nivel"+(i+1));
    const tituloNivel = nivelASerVerificado.querySelector(".titulo-do-nivel").value;
    const porcentagemNivel = nivelASerVerificado.querySelector(".porcentagem-do-nivel").value;
    arrayPorcentagens.push(porcentagemNivel);
    const imagemNivel = nivelASerVerificado.querySelector(".imagem-do-nivel").value;
    const descricaoNivel = nivelASerVerificado.querySelector(".descricao-do-nivel").value;
    if(tituloNivel.length<10){
      document.querySelector(".niveis-do-quizz .erro").innerHTML=`NIVEL ${i+1}: O titulo precisa ter 10 caracteres ou mais!`;
      nivelASerVerificado.querySelector(".titulo-do-nivel").value="";
      estaPagina.parentNode.scrollIntoView(true);
      return
    }
    if(porcentagemNivel>100 || porcentagemNivel<0 || nivelASerVerificado.querySelector(".porcentagem-do-nivel").value ===""||isNaN(porcentagemNivel)){
      document.querySelector(".niveis-do-quizz .erro").innerHTML=`NIVEL ${i+1}: A porcentagem precisa ser um valor de 0 a 100!`;
      nivelASerVerificado.querySelector(".porcentagem-do-nivel").value="";
      estaPagina.parentNode.scrollIntoView(true);
      return
    }
    if(!validURL(imagemNivel)){
      document.querySelector(".niveis-do-quizz .erro").innerHTML=`NIVEL ${i+1}: Endereco de imagem inválido!`;
      nivelASerVerificado.querySelector(".imagem-do-nivel").value="";
      estaPagina.parentNode.scrollIntoView(true);
      return
    }
    if(descricaoNivel.length<30){
      document.querySelector(".niveis-do-quizz .erro").innerHTML=`NIVEL ${i+1}: A descrição precisa ter 30 caracteres ou mais!`;
      nivelASerVerificado.querySelector(".descricao-do-nivel").value="";
      estaPagina.parentNode.scrollIntoView(true);
      return
    }
    arrayDeNiveis.push({title: tituloNivel,image: imagemNivel,text: descricaoNivel,minValue: parseInt(porcentagemNivel)})
  }
  for (let i = 0; i < quantidadeDeNiveis; i++){
    if(arrayPorcentagens[i]==="0"){
      temZero=true
    }
  }
  if(temZero==false){
    document.querySelector(".niveis-do-quizz .erro").innerHTML=`Ao menos uma das porcentagens precisa ser zero!`;
    estaPagina.parentNode.scrollIntoView(true);
    return
  }
  quizzCriado.levels =arrayDeNiveis;
  estaPagina.parentNode.classList.add("esconde")
  document.querySelector(".loading-geral").classList.remove("esconde")
  if(estaEditando){
    enviarQuizzEditado();
  }else{
    enviarNovoQuizz()
  }
  estaEditando = false;
}

function enviarQuizzEditado(){
  const promisse = axios.put("https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes/"+arrayDeQuizzes[posicaoDoQuizzSendoEditado].data.id,quizzCriado,{headers:{ "Secret-Key": arrayDeQuizzes[posicaoDoQuizzSendoEditado].data.key}})
  promisse.then(enviandoEdicao)
  promisse.catch(ocorreuErro)
}

function enviandoEdicao(resposta){
  document.querySelector(".loading-geral").classList.add("esconde")
  document.querySelector(".sucesso-do-quizz").classList.remove("esconde") 
  arrayDeQuizzes[posicaoDoQuizzSendoEditado]=resposta;
  quizzEmQuestao = resposta.data.id;
  window.localStorage.setItem('Quizzes do Usuário', JSON.stringify(arrayDeQuizzes));
}
function enviarNovoQuizz(){
  const promisse = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes",quizzCriado)
  promisse.then(enviado)
  promisse.catch(ocorreuErro)
}

function enviado(resposta){
  document.querySelector(".loading-geral").classList.add("esconde")
  document.querySelector(".sucesso-do-quizz").classList.remove("esconde") 
  adicionandoQuizzEmDataStorage(resposta)
  quizzEmQuestao = resposta.data.id;
}

function ocorreuErro(erro){
  alert('Ocorreu um erro ao enviar o seu Quizz. Tente novamente.')
}

function acessarQuizz(estaPagina){
  
  document.querySelector(".criar-quizz").classList.add("esconde")
  solicitarQuizzSelecionado(quizzEmQuestao)
  estaPagina.parentNode.classList.add("esconde")
}

function voltarParaHome(estaPagina){
  solicitarListaQuizzes()
  document.querySelector(".criar-quizz").classList.add("esconde")
  document.querySelector(".quizzes-do-usuario").classList.remove("esconde")
  estaPagina.parentNode.classList.add("esconde")
}

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
    '((\\d{1,3}\\.){3}\\d{1,3}))'+
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
    '(\\?[;&a-z\\d%_.~+=-]*)?'+
    '(\\#[-a-z\\d_]*)?$','i');
  return !!pattern.test(str);
}

function validarHexadecimal(str){
  if(!/^#[a-fA-F0-9]{6}$/i.test(str)){
    return false
  }
  return true
}