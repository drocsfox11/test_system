const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");
localStorage.setItem('js',0);

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

//Класс, представляющий вопрос
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Класс, представляющий ответ
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Класс, представляющий результат
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results = 
[
	new Result("Вам многому нужно научиться", 0),
	new Result("Вы уже неплохо разбираетесь", 2),
	new Result("Ваш уровень выше среднего", 4),
	new Result("Вы в совершенстве знаете тему", 6)
];

//Массив с вопросами
const questions_ru = 
[
	new Question("Какой оператор используется для сравнения на равенство без учета типа? ", 
	[
		new Answer("===", 0),
		new Answer("==", 1),
		new Answer("=!", 0),
		new Answer("=:=", 0)
	]),

	new Question("Как объявить переменную в JavaScript? ", 
	[
		new Answer("var name;", 0),
		new Answer("let name;", 0),
		new Answer("variable name;", 0),
		new Answer("Ответ 1 и 2", 1)
	]),

	new Question("Какой метод массива добавляет элемент в конец массива? ", 
	[
		new Answer("shift()", 0),
		new Answer("unshift()", 0),
		new Answer("push()", 1),
		new Answer("pop()", 0)
	]),

	new Question("Что делает оператор '!'?", 
	[
		new Answer("Умножение", 0),
		new Answer("Деление", 0),
		new Answer("Отрицание", 1),
		new Answer("Конкатенация", 0)
	]),

	new Question("Какие из следующих методов преобразуют строку в число?", 
	[
		new Answer("Number()", 0),
		new Answer("ParseInt()", 0),
		new Answer("ParseFloat", 0),
		new Answer("Все вышеуказанные", 1)
	]),

	new Question("Как вызвать функцию JavaScript по клику на кнопку?", 
	[
		new Answer('onclick="myFunction()"', 1),
		new Answer('addEventListener("click", myFunction)', 0),
		new Answer('button.onclick = myFunction()', 0),
		new Answer('button.addEventListener("click", myFunction)', 0)
	]),

	new Question("Как добавить к веб-странице скрипт из отдельного файла?", 
	[
		new Answer('<script src="script.js"></script>', 1),
		new Answer('<link rel="stylesheet" href="styles.css">', 0),
		new Answer('<img src="image.jpg" alt="Image">', 0),
		new Answer('<a href="page.html">Link</a>', 0)
	]),

	new Question("Как получить доступ к элементу по его id в языке JavaScript?", 
	[
		new Answer('document.querySelector("#elementId")', 0),
		new Answer('document.getElementById("elementId")', 1),
		new Answer('document.getElementsByClassName("elementId")[0]', 1),
		new Answer('document.getElementsByTagName("div")[0]', 0)
	]),

	new Question("Как записать элемент веб-страницы в переменную по id?", 
	[
		new Answer('var element = document.getElementsByTagName("div")[0]', 0),
		new Answer('var element = document.getElementsByClassName("elementId")[0]', 0),
		new Answer('var element = document.querySelector("#elementId")', 0),
		new Answer('var element = document.getElementById("elementId")', 1)
	]),

	new Question("Как получить атрибут из элемента веб-страницы?", 
	[
		new Answer('element.getAttribute("attributeName")', 1),
		new Answer('element.attributeName', 0),
		new Answer('element.getAttributeValue("attributeName")', 0),
		new Answer('element.attribute("attributeName")', 0)
	]),

	new Question("Как преобразовать значение атрибута в целое число?", 
	[
		new Answer("Number(attributeValue)", 0),
		new Answer("parseInt(attributeValue)", 1),
		new Answer("parseFloat(attributeValue)", 0),
		new Answer("attributeValue.toInt()", 0)
	]),

	new Question("Как добавить элемент веб-страницы в массив?", 
	[
		new Answer("", 1),
		new Answer("", 0),
		new Answer("", 1),
		new Answer("", 0)
	]),

	new Question("", 
	[
		new Answer("", 1),
		new Answer("", 0),
		new Answer("", 1),
		new Answer("", 0)
	]),

	new Question("", 
	[
		new Answer("", 1),
		new Answer("", 0),
		new Answer("", 1),
		new Answer("", 0)
	]),

	new Question("", 
	[
		new Answer("", 1),
		new Answer("", 0),
		new Answer("", 1),
		new Answer("", 0)
	]),

	new Question("", 
	[
		new Answer("", 1),
		new Answer("", 0),
		new Answer("", 1),
		new Answer("", 0)
	]),

	new Question("", 
	[
		new Answer("", 1),
		new Answer("", 0),
		new Answer("", 1),
		new Answer("", 0)
	]),

	new Question("", 
	[
		new Answer("", 1),
		new Answer("", 0),
		new Answer("", 1),
		new Answer("", 0)
	]),

	new Question("", 
	[
		new Answer("", 1),
		new Answer("", 0),
		new Answer("", 1),
		new Answer("", 0)
	]),

	new Question("", 
	[
		new Answer("", 1),
		new Answer("", 0),
		new Answer("", 1),
		new Answer("", 0)
	]),

	new Question("", 
	[
		new Answer("", 1),
		new Answer("", 0),
		new Answer("", 1),
		new Answer("", 0)
	]),

	new Question("", 
	[
		new Answer("", 1),
		new Answer("", 0),
		new Answer("", 1),
		new Answer("", 0)
	]),

	new Question("", 
	[
		new Answer("", 1),
		new Answer("", 0),
		new Answer("", 1),
		new Answer("", 0)
	]),

	new Question("", 
	[
		new Answer("", 1),
		new Answer("", 0),
		new Answer("", 1),
		new Answer("", 0)
	]),

	new Question("", 
	[
		new Answer("", 1),
		new Answer("", 0),
		new Answer("", 1),
		new Answer("", 0)
	]),

	new Question("", 
	[
		new Answer("", 1),
		new Answer("", 0),
		new Answer("", 1),
		new Answer("", 0)
	]),

	new Question("", 
	[
		new Answer("", 1),
		new Answer("", 0),
		new Answer("", 1),
		new Answer("", 0)
	]),

	new Question("", 
	[
		new Answer("", 1),
		new Answer("", 0),
		new Answer("", 1),
		new Answer("", 0)
	]),

	
];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length) 
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		//Выводим номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Очки: " + quiz.score;
		localStorage.setItem('js',quiz.score);
		var timer = setTimeout(function() {
            window.location='index.html'
        }, 5000);
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	

	//Ждём секунду и обновляем тест
	setTimeout(Update, 500);
}