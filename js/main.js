//recolher os valores inseridos no formulario
var formulario = document.getElementById("formulario");
formulario.addEventListener("submit",cadastrarVeiculo);
function cadastrarVeiculo(evento){
	//variaveis para cadastro
	var nomeCompleto = document.getElementById("nomeCompleto").value,
	modeloDoVeiculo = document.getElementById("modeloDoVeiculo").value,
	placaDoVeiculo = document.getElementById("placaDoVeiculo").value,
	horaEntrada = new Date();
	//variaveis para validação
	var isValid;
	//validar campos em branco e  acionar alerta
	alertaDeCadastro = document.getElementById("apareceAlerta");
	if ((!nomeCompleto)||(!modeloDoVeiculo)||(!placaDoVeiculo)) {
		alertaDeCadastro.classList.remove("alert-success");
		alertaDeCadastro.classList.add("alert-danger");
		alertaDeCadastro.innerHTML = "Please, fill in the fields correctly!";
	}
	for(var i = 0; i < this.elements.length; i++){
		var elemento = this.elements[i];
		if (elemento.type != "submit") {
			if (elemento.value == "") {
				elemento.parentNode.classList.add("has-error");
				alertaDeCadastro.style.display = "block";
			}else{
				elemento.parentNode.classList.remove("has-error");
				alertaDeCadastro.classList.remove("alert-danger");
				alertaDeCadastro.classList.add("alert-success");
				alertaDeCadastro.innerHTML = "Registration was successful!";
				isValid = true;
				if ((!nomeCompleto)||(!modeloDoVeiculo)||(!placaDoVeiculo)) {
					alertaDeCadastro.classList.remove("alert-success");
					alertaDeCadastro.classList.add("alert-danger");
					alertaDeCadastro.innerHTML = "Please, fill in the fields correctly!";
					isValid = false;
				}
				alertaDeCadastro.style.display = "block";
			}
		}
	}
	//Cadastrar
	if (isValid == true) {
		var veiculo = {
			nome: nomeCompleto,
			modelo: modeloDoVeiculo,
			placa: placaDoVeiculo,
			hora: horaEntrada.getHours(),
			minutos: horaEntrada.getMinutes()
		}
		//Mostrar a hora corretamente
		if (veiculo.hora < 10) {
			veiculo.hora = "0" + horaEntrada.getHours();
		}
		if (veiculo.minutos < 10) {
			veiculo.minutos = "0" + horaEntrada.getMinutes();
		}
		if(localStorage.getItem('tabela') === null){
			var veiculos = [];
			veiculos.push(veiculo);
			localStorage.setItem('tabela', JSON.stringify(veiculos));
		} else {
			var veiculos = JSON.parse(localStorage.getItem('tabela'));
			veiculos.push(veiculo);
			localStorage.setItem('tabela', JSON.stringify(veiculos));
		}
		formulario.reset();
		atualizaTabela();
	}
	evento.preventDefault();
}
//Atualiza e mostra a tabela após um novo cadastro
function atualizaTabela(){
	var veiculos = JSON.parse(localStorage.getItem('tabela'));
	var resultados = document.getElementById('resultados');
	resultados.innerHTML = "";

	for(var i = 0; i < veiculos.length; i++){
		var nome = veiculos[i].nome;
		var modelo = veiculos[i].modelo;
		var placa = veiculos[i].placa;
		var horas = veiculos[i].hora;
		var minutos = veiculos[i].minutos;
		resultados.innerHTML += '<tr>'+
									'<td>'+ nome.toUpperCase() +'</td>'+
									'<td>'+ modelo.toUpperCase() + '</td>'+
									'<td>'+ placa.toUpperCase() + '</td>'+
									'<td>'+ horas + ':' + minutos + '</td>'+
									'<td><button onclick="removerCadastro(\''+ placa +'\')" class="btn btn-danger">Remove</button></td>'+
								'</tr>';
	}
}
//Remover cadastro
function removerCadastro(placa){
	var tabela = JSON.parse(localStorage.getItem('tabela'));
	console.log(tabela);

	 for(var i = 0 ; i < tabela.length; i++){
		if(tabela[i].placa == placa){
			tabela.splice(i, 1);
		}
	}

	localStorage.setItem('tabela', JSON.stringify(tabela));

	atualizaTabela();
}