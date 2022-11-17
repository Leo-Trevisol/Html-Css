
    var img = document.getElementById('imgs')

    var lstProdutos = new Array()

    var lstCarrinho = new Array()

    var lstUsers = new Array()

    var carrinho = document.getElementById('valorcarrinho')

    let valorCarrinho = 0

    let produtosCarrinho = 0

    var listaCompra = document.getElementsByTagName('ul')

    var cliente = ''

    var entrada = false


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
                    var strprod = ` <div>  <div class="card" style="width: 18rem;">  <img class="card-img-top" src="${lstProdutos[i].imagem}" alt="Imagem de capa do card"> <div class="card-body"> <h5 class="list-group-item descr">${lstProdutos[i].descricao}</h5> <ul class="list-group list-group-flush"> <li class="list-group-item">R$ ${lstProdutos[i].valor}</li>   <li class="list-group-item">${lstProdutos[i].estoque} itens no estoque</li><li class="btn btn-light" 
                    onclick="adicionacarrinho(${lstProdutos[i].codigo})">Adicionar ao carrinho</li></ul></div>`
                 

                    img.innerHTML += strprod

                    var card1 = document.getElementsByClassName('card')
                    card1[i].style.height = '540px'
                    card1[i].style.margin = '0px 10px'
                 
                 
                    var imgcard = document.getElementsByClassName('card-img-top')
                    imgcard[i].style.height = '286px'
                 
                    var descr = document.getElementsByClassName('descr')
                    descr[i].style.height = '74px'
                }
            }
        });
        $("#menorpmaior").click(function(){
            img.innerHTML = ''

            lstProdutos.sort((a,b) => a.valor - b.valor);

         carregaProd()
        });
        $("#maiorpmenor").click(function(){
            img.innerHTML = ''

           lstProdutos.sort((a,b) => b.valor - a.valor);

           carregaProd()
        });

        $('#imgcarrinho').click(function(){
                if(lstCarrinho.length > 0){
                    $("#imgs").css("display", "none");
                    $('#carrinhoResumo').css("display", "flex")
                      mostrarCarrinho()
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

                    // var idbtt = document.getElementsByClassName('btn-light')
                    // for (let i = 0; i < idbtt.length; i++) {
                    //  idbtt[i].addEventListener('mouseenter', (e) => {
                    //      idbtt[i].style.cursor = 'pointer'
                    //  });
                    // 
                //  }
                    
                    $('.doisDois').html(`Ola, ${lstUsers[i].nome}`)
                    $('#cliente').html(`Carrinho do ${lstUsers[i].nome}`)
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
            $('#txtCodProd').val(lstProdutos.length + 1);
 
         });

         $('#btCadastrarProduto').click(function(){
            if($('#txtDescProd').val() == "" || $('#txtValorProd').val() == "" || $('#txtQtdEstoq').val() == ""
            || $('#txtImg').val() == "" ){
                alert('Preencha os campos!')
            }else{
              
                    let prod = new Produto(  $('#txtCodProd').val(), $('#txtDescProd').val(),$('#txtValorProd').val(),
                    $('#txtImg').val(), $('#txtQtdEstoq').val(), true )
                    lstProdutos.push(prod)
                    $('#txtCodProd').val(lstProdutos.length + 1);
                    $('#txtDescProd').val("")
                    $('#txtValorProd').val("")
                    $('#txtQtdEstoq').val("")
                    $('#txtImg').val("")
                   

            }
 
         });

         $('#txtProdutos').click(function(){
            $("#pgCadastroProdutos").css('display', 'none')
            $("#pgCadastroUsers").css('display', 'none')
            $("#pgLogin").css("display", "none");
            $("#imgs").css("display", "flex");
            img.innerHTML = ''
            carregaProd()

        });

    });

       
function carregaProd(){

    img.innerHTML = ''

        if(!entrada){
            gerarProdDefault()
            let adm = new Usuario(0, "Administrador", "adm", "123")
            lstUsers.push(adm)
            entrada = true
        }
   
       for(let i = 0; i<lstProdutos.length; i++){


        if(lstProdutos[i].vitrine){

            var strprod = ` <div>  <div class="card" style="width: 18rem;">  <img class="card-img-top" src="${lstProdutos[i].imagem}" alt="Imagem de capa do card"> <div class="card-body"> <h5 class="list-group-item descr">${lstProdutos[i].descricao}</h5> <ul class="list-group list-group-flush"> <li class="list-group-item">R$ ${lstProdutos[i].valor}</li> <li class="list-group-item estoq" >${lstProdutos[i].estoque} itens no estoque</li><li class="btn btn-light" 
            id="btt" onclick="adicionacarrinho(${lstProdutos[i].codigo})">Adicionar ao carrinho</li></ul></div> `
        
           img.innerHTML += strprod
        
           var card1 = document.getElementsByClassName('card')
           card1[i].style.height = '540px'
           card1[i].style.margin = '10px 10px'
        
        
           var imgcard = document.getElementsByClassName('card-img-top')
           imgcard[i].style.height = '286px'
        
           var descr = document.getElementsByClassName('descr')
           descr[i].style.height = '74px'
           
           if(lstProdutos[i].estoque == 0){
            var bttt = document.getElementsByClassName('btn-light')
            bttt[i].style.cursor = 'not-allowed'
           }

        }

        

       }
       var carinho = document.getElementById('imgcarrinho')
       if(valorCarrinho == 0){
        
        carinho.style.cursor = 'not-allowed'
       }else{
        carinho.style.cursor = 'pointer'
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
        let produto3 = new Produto(4, "Almofada garota demonio 1", 250, 'imgs/almofada4.jpeg', 3, true)
        let produto4 = new Produto(5, "Almofada Hatsune Miku 1", 300, 'imgs/almofada5.jpeg', 4, true)
        let produto5 = new Produto(6, "Almofada Hatsune Miku 2", 300, 'imgs/almofada6.jpeg', 2, true)
        let produto6 = new Produto(7, "Almofada garota demonio 2", 300, 'imgs/almofada7.jpeg', 2, true)
        let produto7 = new Produto(8, "Almofada deusa azul", 320, 'imgs/almofada8.jpeg', 2, true)
        let produto8 = new Produto(9, "Almofada garota borboleta", 400, 'imgs/almofada9.jpeg', 3, true)
        let produto9 = new Produto(10, "Almofada garota hair fire", 300, 'imgs/almofada10.jpeg', 2, true)
        let produto10 = new Produto(11, "Almofada Nico Robin tits +18", 400, 'imgs/almofada11.jpeg', 10, true)
        let produto11 = new Produto(12, "Almofada garota tits +18", 600, 'imgs/almofada12.jpeg', 1, true)



        lstProdutos.push(produto)
        lstProdutos.push(produto1)
        lstProdutos.push(produto2)
        lstProdutos.push(produto3)
        lstProdutos.push(produto4)
        lstProdutos.push(produto5)
        lstProdutos.push(produto6)
        lstProdutos.push(produto7)
        lstProdutos.push(produto8)
        lstProdutos.push(produto9)
        lstProdutos.push(produto10)
        lstProdutos.push(produto11)



}

function adicionacarrinho(pro){

    for(let i = 0; i <lstProdutos.length; i++){
        if(pro == lstProdutos[i].codigo){
            if(lstProdutos[i].estoque > 0){
                lstProdutos[i].estoque = (lstProdutos[i].estoque - 1)
                lstCarrinho.push(lstProdutos[i]);
                valorCarrinho++
                carrinho.innerHTML = valorCarrinho

            }else{
                
                    var idbtt = document.getElementsByClassName('btn-light')
                    idbtt[0].addEventListener('mouseenter', (e) => {
                        idbtt[0].style.cursor = 'not-allowed'
                       
                    });
            }

                 }

            }
           

    img.innerHTML = ''
    carregaProd()

    if(valorCarrinho > 0){
        var idcarrinho = document.getElementById('imgcarrinho')
        idcarrinho.style.cursor = 'pointer'
       }

    }

 function escrever(){
   
 }

function mostrarCarrinho(){

    let total = 0

    for(let i = 0; i < lstCarrinho.length; i++){

        var elemento = document.createElement('li')

        var text1 = document.createTextNode(`1x - ${lstCarrinho[i].descricao} - R$ ${lstCarrinho[i].valor}`)

        elemento.appendChild(text1)

        listaCompra[listaCompra.length-1].appendChild(elemento)

        produtosCarrinho++

        total += lstCarrinho[i].valor
    }

    var elemento1 = document.createElement('li')

    var text2 = document.createTextNode(`Valor total = ${total}`)

    elemento.appendChild(text2)

    listaCompra[listaCompra.length-1].appendChild(elemento1)

    

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



