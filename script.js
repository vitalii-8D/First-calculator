
	/*Тут два набора кнопок (цифры и операторы)*/
let numberKeys = document.querySelectorAll('.number-buttons .key');
let functionKeys = document.querySelectorAll('.functions-buttons button');
	// Тут равно и СС
let clear = document.querySelector('.clear');
let equal = document.querySelector('.equal-btn');
	/*Все поля для функции стирания*/
let outputs = document.querySelectorAll('output');
	/*Два аргумента и поле оператора*/
let input1 = document.querySelector('.input-field.input-field1');
let input2 = document.querySelector('.input-field.input-field2');
let inputFunc = document.querySelector('.input-field-func');
	/*Поле результата*/
let outputResult = document.getElementById('result-field');

	/*Стиралка на СС*/
clear.onclick = function () {
	erase();
}
	/*Отдельно реализованая функция стирания*/
function erase () {
	outputs.forEach(elem => elem.innerHTML = "");
}

	/*Перебирания клавиатуры*/
for (var i = 0; i < numberKeys.length; i++) 
{
	numberKeys[i].onclick = function () {
			/*Если жмем цифру при заполненом поле ответа - стереть поля*/
		let currentField;
		if (outputResult.innerHTML) {
			erase();
		} 
			/*Проверка в какое поле мы сейчас вводим*/
		if (!inputFunc.innerHTML) {
			currentField = input1; 
		} else {	/*Если оператор уже стоит - начинаем вводить во второе поле*/
			currentField = input2;
		}

			/*Нельзя первым в поле вводить ноль!!*/
		if (!currentField.innerHTML && !+this.innerHTML) {
			return;  
		}
		currentField.innerHTML += this.innerHTML;
	}
}
	
	/*Перебирание функциональных клавиш*/
for (var i = 0; i < 4; i++) 
{	
	functionKeys[i].onclick = function () {

			/*Дает возможность выполнять операции 
			с результатом предыдущей операции*/
		if (outputResult.innerHTML) {
			input1.innerHTML = outputResult.innerHTML;
			outputResult.innerHTML = "";
		}
			/*Ставит оператор в поле только если проставлено 1 поле*/
		if(input1.innerHTML && !input2.innerHTML) {
			inputFunc.innerHTML = this.innerHTML;
		} 
	}
}

	/*Реакция на переполнение*/
// function isFull(fieldContent) {
// 	if (fieldContent.length > 10) {
// 		return true;
// 	}
// 	return false;
// }
	
	/*Нажатия на равно*/
equal.onclick = function () {
	let result;
		/*Действие происходит только когда оба поля заполнены*/
	if (input1.innerHTML && input2.innerHTML) {
		a = +input1.innerHTML;
		b = +input2.innerHTML;

		switch (inputFunc.innerHTML) {
			case '+':
				result = add(a,b);
				break;
			case '-':
				result = minus(a,b);
				break;
			case '*':
				result = mul(a,b);
				break;
			case '/':
				result = div(a,b);
				break;
			default:
				console.log("bida shoto")
		}
			/*Чистит поле и выводит результат*/
		erase();

		// outputResult.innerHTML = result;
		if(Number.isInteger(result)) {
			outputResult.innerHTML = result;
		} else {
			let k = 10;
			for (var i = 1; i < 15; i++) {
				if (Number.isInteger(result * k)) break;
				k*=10;
			}
			outputResult.innerHTML = result.toFixed(i);
		}
		
	}
}

	/*Ну тут понятно*/
function add(a, b) {
	return a+b;
}
function minus(a, b) {
	return a-b;
}
function mul(a, b) {
	return a*b;
}
function div(a, b) {
	return a/b;
}