
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


let quizzCriado = {
  title:"",
  image:"",
  questions:[],
  levels:[]
}
let question = {
  title:"",
  color:"",
  answers:[]
}
let answer = {
  text:"",
  image:"",
  isCorrectAnswer:false
}
let level = {
  title: "",
	image: "",
	text: "",
	minValue: 0
}

let quantidadeDePerguntas;
let quantidadeDeNiveis;

function validarDadosPg1(estaPagina){
  const tituloQuizz = document.querySelector(".input-titulo-do-quizz").value;
  const enderecoImagem = document.querySelector(".input-endereco-da-imagem").value;
  quantidadeDePerguntas = parseInt(document.querySelector(".input-quantidade-de-perguntas").value);
  quantidadeDeNiveis = parseInt(document.querySelector(".input-quantidade-de-niveis").value);

  //verificando validações
  // if(tituloQuizz.length>20 || tituloQuizz.length<6){
  //   document.querySelector(".info-basica-do-quizz .erro").innerHTML="O título precisa ter de 6 à 20 caracteres!";
  //   document.querySelector(".input-titulo-do-quizz").value="";
  //   return;
  // }
  // if(!validURL(enderecoImagem)){
  //   document.querySelector(".info-basica-do-quizz .erro").innerHTML="Endereço de imagem inválido!";
  //   document.querySelector(".input-endereco-da-imagem").value="";
  //   return;
  // }
  // if(quantidadeDePerguntas<3 || isNaN(quantidadeDePerguntas)){
  //   document.querySelector(".info-basica-do-quizz .erro").innerHTML="O número de perguntas precisa ser um número maior ou igual a 3";
  //   document.querySelector(".input-quantidade-de-perguntas").value="";
  //   return;
  // }
  // if(quantidadeDeNiveis<2 || isNaN(quantidadeDeNiveis)){
  //   document.querySelector(".info-basica-do-quizz .erro").innerHTML="O quantidade de níveis precisa ser um número maior ou igual a 2";
  //   document.querySelector(".input-quantidade-de-niveis").value="";
  //   return;
  // }

  //Salvando as variaveis no objeto de envio
  quizzCriado.title = tituloQuizz;
  quizzCriado.image = enderecoImagem;

  //removendo e adicionando "esconde" para ir para proxima pagina
  estaPagina.parentNode.classList.add("esconde")
  document.querySelector(".perguntas-do-quizz").classList.remove("esconde")

  //chamando as funcoes que criam as proximas paginas
  gerarPaginaDePerguntasDoQuizz(quantidadeDePerguntas);
  gerarPaginaDeNiveisDoQuizz(quantidadeDeNiveis);
  //gerarPaginaFinalDeCriacao(tituloQuizz,enderecoImagem);
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
}

function gerarPaginaFinalDeCriacao(titulo,imagem){

}
quantidadeDePerguntas=3
gerarPaginaDePerguntasDoQuizz(3);
function validarDadosPg2(estaPagina){
  for (let i = 0; i < quantidadeDePerguntas; i++) {
    const perguntaSendoVerificada = document.querySelector(".pergunta"+(i+1));
    const textoPergunta = perguntaSendoVerificada.querySelector(".input-pergunta").value;
    const corDeFundoPergunta = perguntaSendoVerificada.querySelector(".cor-de-fundo").value;
    const respostaCorreta = perguntaSendoVerificada.querySelector(".resposta-correta").value;
    const imagemRespostaCorreta = perguntaSendoVerificada.querySelector(".imagem-resposta-correta").value;
    
    // if(textoPergunta.length<20){
    //   document.querySelector(".perguntas-do-quizz .erro").innerHTML=`PERGUNTA ${i+1}: A pergunta precisa ter 20 ou mais caracteres!`;
    //   perguntaSendoVerificada.querySelector(".input-pergunta").value="";
    //   return
    // }
    // if(corDeFundoPergunta!=="#"){
    //   document.querySelector(".perguntas-do-quizz .erro").innerHTML=`PERGUNTA ${i+1}: Cor inválida! (Formato da cor: #xxxxxx)`;
    //   perguntaSendoVerificada.querySelector(".cor-de-fundo").value="";
    //   return
    // }
    // if(respostaCorreta!=="#"){
    //   document.querySelector(".perguntas-do-quizz .erro").innerHTML=`PERGUNTA ${i+1}: É necessario ter uma resposta correta!`;
    //   perguntaSendoVerificada.querySelector(".resposta-correta").value="";
    //   return
    // }
    // if(imagemRespostaCorreta!=="#"){//validURL(imagemRespostaCorreta)){ //VALIDAR COM URL
    //   document.querySelector(".perguntas-do-quizz .erro").innerHTML=`PERGUNTA ${i+1}: Endereço de imagem inválido!`;
    //   perguntaSendoVerificada.querySelector(".imagem-resposta-correta").value="";
    //   return
    // }
    // if(perguntaSendoVerificada.querySelector(".resposta-incorreta-1").value==="" && perguntaSendoVerificada.querySelector(".resposta-incorreta-2").value==="" && perguntaSendoVerificada.querySelector(".resposta-incorreta-3").value===""){
    //   document.querySelector(".perguntas-do-quizz .erro").innerHTML=`PERGUNTA ${i+1}: É necessário preencher ao menos uma resposta incorreta!`;
    //   return
    // }
    let posicaoDaRespostaNoArray=0;
    for(let j=0;j<3;j++){
      const respostaIncorreta = perguntaSendoVerificada.querySelector(".resposta-incorreta-"+(j+1)).value;
      const imagemRespostaIncorreta = perguntaSendoVerificada.querySelector(".imagem-incorreta-"+(j+1)).value;
      // if(perguntaSendoVerificada.querySelector(".resposta-incorreta-"+(j+1)).value!==""){
      //   if(imagemRespostaIncorreta!=="#"){//VALIDAR COM URL
      //     document.querySelector(".perguntas-do-quizz .erro").innerHTML=`PERGUNTA ${i+1}: Resposta Incorreta ${j+1}: Endereço de imagem inválido!`;
      //     perguntaSendoVerificada.querySelector(".imagem-incorreta-"+(j+1)).value="";
      //     return
      //   }
        question.answers[posicaoDaRespostaNoArray] = {text: respostaIncorreta,image: imagemRespostaIncorreta, isCorrectAnswer: false}
        posicaoDaRespostaNoArray++;
      //}
    }
    question.title=textoPergunta
    question.color=corDeFundoPergunta
    quizzCriado.questions[i]=question

  }
  console.log(quizzCriado)

  estaPagina.parentNode.classList.add("esconde")
  document.querySelector(".niveis-do-quizz").classList.remove("esconde")
  console.log("ir para p3")
}

function validarDadosPg3(estaPagina){
  const arrayPorcentagens = []
  for (let i = 0; i < quantidadeDeNiveis; i++) {
    const nivelASerVerificado = document.querySelector(".nivel"+(i+1));
    const tituloNivel = nivelASerVerificado.querySelector(".titulo-do-nivel").value;
    const porcentagemNivel = nivelASerVerificado.querySelector(".porcentagem-do-nivel").value;
    arrayPorcentagens.push(porcentagemNivel);
    const imagemNivel = nivelASerVerificado.querySelector(".imagem-do-nivel").value;
    const descricaoNivel = nivelASerVerificado.querySelector(".descricao-do-nivel").value;
    // if(tituloNivel.length<10){
    //   document.querySelector(".niveis-do-quizz .erro").innerHTML=`NIVEL ${i+1}: O titulo precisa ter 10 caracteres ou mais!`;
    //   nivelASerVerificado.querySelector(".titulo-do-nivel").value="";
    //   return
    // }
    // if(porcentagemNivel>100 || porcentagemNivel<0 || nivelASerVerificado.querySelector(".porcentagem-do-nivel").value ===""||isNaN(porcentagemNivel)){
    //   document.querySelector(".niveis-do-quizz .erro").innerHTML=`NIVEL ${i+1}: A porcentagem precisa ser um valor de 0 a 100!`;
    //   nivelASerVerificado.querySelector(".porcentagem-do-nivel").value="";
    //   return
    // }
    // if(imagemNivel!=="#"){
    //   document.querySelector(".niveis-do-quizz .erro").innerHTML=`NIVEL ${i+1}: Endereco de imagem inválido!`;
    //   nivelASerVerificado.querySelector(".imagem-do-nivel").value="";
    //   return
    // }
    // if(descricaoNivel.length<30){
    //   document.querySelector(".niveis-do-quizz .erro").innerHTML=`NIVEL ${i+1}: A descrição precisa ter 30 caracteres ou mais!`;
    //   nivelASerVerificado.querySelector(".descricao-do-nivel").value="";
    //   return
    // }
    level.title = tituloNivel
    level.image = imagemNivel
    level.text = descricaoNivel
    level.minValue = porcentagemNivel
    quizzCriado.levels[i]=level

  }
  console.log(quizzCriado)
  //enviarNovoQuizz()
  estaPagina.parentNode.classList.add("esconde")
  document.querySelector(".sucesso-do-quizz").classList.remove("esconde")  
  console.log("ir para p4")
}
function enviarNovoQuizz(){
  axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes")
}
function acessarQuizz(estaPagina){

  estaPagina.parentNode.classList.add("esconde")
  //document.querySelector(".perguntas-do-quizz").classList.remove("esconde")
  console.log("acessar quizz")
}

function voltarParaHome(estaPagina){

  estaPagina.parentNode.classList.add("esconde")
  //document.querySelector(".perguntas-do-quizz").classList.remove("esconde")
  console.log("voltar para home")
}

// Não entendi nada mas funcionou para validar a URL
function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}