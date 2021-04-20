
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

let quantidadeDePerguntas;
let quantidadeDeNiveis;

function validarDadosPg1(){
  const tituloQuizz = document.querySelector(".input-titulo-do-quizz").value;
  const enderecoImagem = document.querySelector(".input-endereco-da-imagem").value;
  const quantidadeDePerguntas = parseInt(document.querySelector(".input-quantidade-de-perguntas").value);
  const quantidadeDeNiveis = parseInt(document.querySelector(".input-quantidade-de-niveis").value);
  console.log(tituloQuizz)
  console.log(enderecoImagem)
  console.log(quantidadeDePerguntas)
  console.log(quantidadeDeNiveis)
  console.log("ir para p2")
}
function validarDadosPg2(){
  console.log("ir para p3")
}
function validarDadosPg3(){
  console.log("ir para p4")
}
function acessarQuizz(){
  console.log("acessar quizz")
}
function voltarParaHome(){
  console.log("voltar para home")
}