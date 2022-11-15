
    var img = document.getElementById('imgs')

    var lstProdutos = new Array()

    var lstCarrinho = new Array()

    var lstUsers = new Array()

    var carrinho = document.getElementById('valorcarrinho')

    let valorCarrinho = 0

    var logado = false


        $(document).ready(function(){

        $("#imglupa").click(function(){
            var text = $('#pesquisar').val()
            var apaga = false
            for(var i = 0; i< lstProdutos.length; i++){
                if(lstProdutos[i].descricao.toUpperCase().trim().includes(text.toUpperCase().trim()) && text != ""){    
                    if(!apaga){
                        img.innerHTML = ''
                        apaga = true
                    }
                    var strprod = ` <div>  <div class="card" style="width: 18rem;">  <img class="card-img-top" src="${lstProdutos[i].imagem}" alt="Imagem de capa do card"> <div class="card-body"> <h5 class="list-group-item">${lstProdutos[i].descricao}</h5> <ul class="list-group list-group-flush"> <li class="list-group-item">R$ ${lstProdutos[i].valor}</li>   <li class="list-group-item">${lstProdutos[i].estoque} itens no estoque</li><li class="btn btn-light" 
                    onclick="adicionacarrinho(${lstProdutos[i].codigo})">Adicionar ao carrinho</li></ul></div>`

                    if(lstProdutos[i].estoque == 0){
                        $(".btn").css("background-color", "yellow");
                    }

                    img.innerHTML += strprod
                }
            }
        });
        $("#menorpmaior").click(function(){
            img.innerHTML = ''

            lstProdutos.sort((a,b) => a.valor - b.valor);

            for(let i = 0; i<lstProdutos.length; i++){

                if(lstProdutos[i].vitrine){
        
                    var strprod = ` <div>  <div class="card" style="width: 18rem;">  <img class="card-img-top" src="${lstProdutos[i].imagem}" alt="Imagem de capa do card"> <div class="card-body"> <h5 class="list-group-item">${lstProdutos[i].descricao}</h5> <ul class="list-group list-group-flush"> <li class="list-group-item">R$ ${lstProdutos[i].valor}</li>   <li class="list-group-item">${lstProdutos[i].estoque} itens no estoque</li><li class="btn btn-light"  onclick="adicionacarrinho(${lstProdutos[i].codigo})">Adicionar ao carrinho</li></ul></div>`
        
                    img.innerHTML += strprod
                }
               }
        });
        $("#maiorpmenor").click(function(){
            img.innerHTML = ''

           lstProdutos.sort((a,b) => b.valor - a.valor);

            for(let i = 0; i<lstProdutos.length; i++){

                if(lstProdutos[i].vitrine){
        
                    var strprod = ` <div>  <div class="card" style="width: 18rem;">  <img class="card-img-top" src="${lstProdutos[i].imagem}" alt="Imagem de capa do card"> <div class="card-body"> <h5 class="list-group-item">${lstProdutos[i].descricao}</h5> <ul class="list-group list-group-flush"> <li class="list-group-item">R$ ${lstProdutos[i].valor}</li>   <li class="list-group-item">${lstProdutos[i].estoque} itens no estoque</li><li class="btn btn-light"  onclick="adicionacarrinho(${lstProdutos[i].codigo})">Adicionar ao carrinho</li></ul></div>`
        
                    img.innerHTML += strprod
                }
               }
        });
        $('#btcarrinho').click(function(){
           if(lstCarrinho.length == 0){
            alert('Seu carrinho esta vazio!')
           }else{
           }
        });

        $('#btLogin').click(function(){
            $("#imgs").css("display", "none");
            $("#pgLogin").css("display", "block");
            $("#pgCadastroProdutos").css('display', 'none')
            $("#pgCadastroUsers").css('display', 'none')

        });
        $('#btEntrar').click(function(){
           
            for(let i = 0; i < lstUsers.length; i++){
                if(lstUsers[i].user == $('#txtUser').val() && lstUsers[i].senha == $('#txtSenha').val()){
                    $("#imgs").css("display", "flex");
                    $("#pgLogin").css("display", "none");
                    logado = true

                    var idbtt = document.getElementsByClassName('btn-light')
                    for (let i = 0; i < idbtt.length; i++) {
                     idbtt[i].addEventListener('mouseenter', (e) => {
                         idbtt[i].style.cursor = 'pointer'
                     });
                    
                 }
                    
                    $('.doisDois').html(`Ola, ${lstUsers[i].nome}`)
                    valorCarrinho = 0
                    carrinho.innerHTML = valorCarrinho

                    if(lstUsers[0].user == $('#txtUser').val() && lstUsers[0].senha == $('#txtSenha').val()){
                        $('.logo').css('display', 'flex')
                    }else{
                        $('.logo').css('display', 'none')
                    }
                  
                }

            }
        });
        $('.forgotpass').click(function(){
            alert('Que pena...')
        });
        $('#btCadUser').click(function(){
           $("#pgCadastroUsers").css('display', 'block')
           $("#pgLogin").css("display", "none");
           $("#pgCadastroProdutos").css('display', 'none')
           $("#imgs").css("display", "none");
           $('#txtCodUser').val(lstUsers.length + 1);

        });
        

        $('#btCadastrarUser').click(function(){


            if($('#txtNomeUser').val() == "" || $('#txtNovoUsuario').val() == "" 
            || $('#txtSenhaNova').val() == "" ){
                alert('Prencha todos os campos!')
            }else{
                var newUser = new Usuario($('#txtCodUser').val(), $('#txtNomeUser').val(),
                 $('#txtNovoUsuario').val(), $('#txtSenhaNova').val() )
                 lstUsers.push(newUser)

                 $('#txtCodUser').val(lstUsers.length + 1);
                 $('#txtNomeUser').val("")
                 $('#txtNovoUsuario').val("")
                 $('#txtSenhaNova').val("")
            }
        });
        $('#btCadProd').click(function(){
            $("#pgCadastroProdutos").css('display', 'block')
            $("#pgCadastroUsers").css('display', 'none')
            $("#pgLogin").css("display", "none");
            $("#imgs").css("display", "none");
 
         });

         $('#btCadastrarProduto').click(function(){
            var input = document.getElementById("inputGroupFile01");
            var fReader = new FileReader();
            fReader.readAsDataURL(input.files[0]);
            fReader.onloadend = function(event){
                var img = document.getElementById("imgg");
                img.src = event.target.result;
            }
 
         });

         $('#txtProdutos').click(function(){
            $("#pgCadastroProdutos").css('display', 'none')
            $("#pgCadastroUsers").css('display', 'none')
            $("#pgLogin").css("display", "none");
            $("#imgs").css("display", "flex");



        });
       
        });

        
function carregaProd(){
   
    gerarProdDefault()

    img.innerHTML = ''


       for(let i = 0; i<lstProdutos.length; i++){


        if(lstProdutos[i].vitrine){


            var strprod = ` <div>  <div class="card" style="width: 18rem;">  <img class="card-img-top" src="${lstProdutos[i].imagem}" alt="Imagem de capa do card"> <div class="card-body"> <h5 class="list-group-item">${lstProdutos[i].descricao}</h5> <ul class="list-group list-group-flush"> <li class="list-group-item">R$ ${lstProdutos[i].valor}</li> <li class="list-group-item estoq" >${lstProdutos[i].estoque} itens no estoque</li><li class="btn btn-light" 
             id="btt" onclick="adicionacarrinho(${lstProdutos[i].codigo})">Adicionar ao carrinho</li></ul></div>`

            img.innerHTML += strprod
        }
       }

        let adm = new Usuario(0, "Administrador", "adm", "123")

        lstUsers.push(adm)

        if(!logado){
            var idbtt = document.getElementsByClassName('btn-light')
            for (let i = 0; i < idbtt.length; i++) {
             idbtt[i].addEventListener('mouseenter', (e) => {
                 idbtt[i].style.cursor = 'not-allowed'
             });
            
         }
        }
        

        
}


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }


function gerarProdDefault(){

        let produto = new Produto(1, "Almofada elfa +18", 500, 'imgs/almofada1.jpeg', 3, true)
        let produto1 = new Produto(2, "Almofada garota +18", 500, 'imgs/almofada2.jpeg', 2, true)
        let produto2 = new Produto(3, "Almofada empregadas", 300, 'imgs/almofada3.jpeg', 5, true)
        let produto3 = new Produto(4, "Almofada garota demonio 1", 250, 'imgs/almofada4.jpeg', 4, true)
        let produto4 = new Produto(5, "Almofada Hatsune Miku 1", 300, 'imgs/almofada5.jpeg', 4, true)
        let produto5 = new Produto(6, "Almofada Hatsune Miku 2", 300, 'imgs/almofada6.jpeg', 2, true)
        let produto6 = new Produto(7, "Almofada garota demonio 2", 300, 'imgs/almofada7.jpeg', 2, true)
        let produto7 = new Produto(8, "Almofada deusa azul", 320, 'imgs/almofada8.jpeg', 2, true)
        let produto8 = new Produto(8, "Almofada garota borboleta", 400, 'imgs/almofada9.jpeg', 3, true)


        lstProdutos.push(produto)
        lstProdutos.push(produto1)
        lstProdutos.push(produto2)
        lstProdutos.push(produto3)
        lstProdutos.push(produto4)
        lstProdutos.push(produto5)
        lstProdutos.push(produto6)
        lstProdutos.push(produto7)
        lstProdutos.push(produto8)


}

function adicionacarrinho(pro){

  //  lstProdutos = new Array()

    if(!logado){
        alert('Voce precisa logar antes')
       
    }else{
        
    achou=false;
    i=0;
    while(achou===false && i<lstProdutos.length){
        if(lstProdutos[i].codigo === pro){
            lstProdutos[i].estoque += -1
            lstCarrinho.push(lstProdutos[i]);
            achou=true;
        }
        else{
            i++;
        }
    }

   // img.innerHTML = ''

    valorCarrinho++

    carrinho.innerHTML = valorCarrinho

    var ex = document.getElementsByClassName('estoq')
    for (let i = 0; i < ex.length; i++) {
        ex[i].innerHTML = (lstProdutos[i].estoque - 1)
    }
    
 }

   // carregaProd()

    
  
}
class Produto{
    constructor(codigo, descricao, valor, imagem, estoque, vitrine){
        this.codigo = codigo;
        this.descricao = descricao;
        this.valor = valor;
        this.imagem = imagem;
        this.estoque = estoque;
        this.vitrine = vitrine;
    }

    
}

class Usuario{
    constructor(codigo, nome, user, senha ){
        this.codigo = codigo;
        this.nome = nome;
        this.user = user;
        this.senha = senha;
    }
}


