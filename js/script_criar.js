
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
let levels = {
  title: "",
	image: "",
	text: "",
	minValue: 0
}

function validarDadosPg1(estaPagina){
  const tituloQuizz = document.querySelector(".input-titulo-do-quizz").value;
  const enderecoImagem = document.querySelector(".input-endereco-da-imagem").value;
  const quantidadeDePerguntas = parseInt(document.querySelector(".input-quantidade-de-perguntas").value);
  const quantidadeDeNiveis = parseInt(document.querySelector(".input-quantidade-de-niveis").value);

  //verificando validações
  if(tituloQuizz.length>20 || tituloQuizz.length<6){
    document.querySelector(".erro").innerHTML="O título precisa ter de 6 à 20 caracteres!";
    document.querySelector(".input-titulo-do-quizz").value="";
    return;
  }
  if(enderecoImagem.length>20 || enderecoImagem.length<6){//FALTA FAZER A VALIDAÇAO DA URL
    document.querySelector(".erro").innerHTML="Endereço de imagem inválido!";
    document.querySelector(".input-endereco-da-imagem").value="";
    return;
  }
  if(quantidadeDePerguntas<3 || isNaN(quantidadeDePerguntas)){
    document.querySelector(".erro").innerHTML="O número de perguntas precisa ser um número maior ou igual a 3";
    document.querySelector(".input-quantidade-de-perguntas").value="";
    return;
  }
  if(quantidadeDeNiveis<2 || isNaN(quantidadeDeNiveis)){
    document.querySelector(".erro").innerHTML="O quantidade de níveis precisa ser um número maior ou igual a 2";
    document.querySelector(".input-quantidade-de-niveis").value="";
    return;
  }

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
  document.querySelector(".perguntas-do-quizz").innerHTML=`<div class="orientacoes-de-preenchimento">Crie suas perguntas</div>`
  for(let i=0;i<numeroDePerguntas;i++){
    document.querySelector(".perguntas-do-quizz").innerHTML+=`<div class="conteudo-para-preencher colapsed">
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
  document.querySelector(".niveis-do-quizz").innerHTML = `<div class="orientacoes-de-preenchimento">Agora, decida os níveis</div>`
  for(let i=0;i<numeroDeNiveis;i++){
    document.querySelector(".niveis-do-quizz").innerHTML +=`<div class="conteudo-para-preencher colapsed" >
    <p>Nível ${i+1}</p>
    <input class="input-titulo-do-quizz caixa-de-input" placeholder="Titulo do nível"></input>
    <input class="input-titulo-do-quizz caixa-de-input" placeholder="% de acerto mínima"></input>
    <input class="input-titulo-do-quizz caixa-de-input" placeholder="URL da imagem do nível"></input>
    <input class="input-titulo-do-quizz caixa-de-input" placeholder="Descrição do nível"></input>
    <ion-icon name="document-outline" onclick="estenderNivel(this)"></ion-icon>
  </div>`
  }
  document.querySelector(".niveis-do-quizz").innerHTML +=`<div class="botao-para-prosseguir" onclick="validarDadosPg3(this)">Finalizar quizz</div>`
}

function gerarPaginaFinalDeCriacao(titulo,imagem){

}

function validarDadosPg2(estaPagina){
  
  console.log(document.querySelector(".niveis-do-quizz p").innerHTML)
  //estaPagina.parentNode.classList.add("esconde")
  //document.querySelector(".niveis-do-quizz").classList.remove("esconde")
  console.log("ir para p3")
}

function validarDadosPg3(estaPagina){
  estaPagina.parentNode.classList.add("esconde")
  document.querySelector(".sucesso-do-quizz").classList.remove("esconde")  
  console.log("ir para p4")
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