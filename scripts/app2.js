const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");
localStorage.setItem('css',0);


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
		for(let i = 0; i < this.results[this.language].length; i++)
		{
			if(this.results[this.language][i].Check(this.score))
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
const results = {
	'ru':[
		new Result("Вам стоит подучить тему", 2),
		new Result("Ваш уровень выше среднего", 5),
		new Result("Вы уже хорошо разбираетесь", 8),
		new Result("Вы в совершенстве владеете материалом", 10)
	],
	'cn':[
		new Result("你应该学习这个主题", 2),
		new Result("您的知识水平高于平均水平", 5),
		new Result("您已经对该主题有了很好的理解", 8),
		new Result("您精通此材料", 10)
		]
	};

//Массив с вопросами
const questions = 
[
	new Question("Что делает свойство 'display: none;'?", 
	[
		new Answer("Скрывает элемент, но он продолжает занимать пространство на странице", 0),
		new Answer("Удаляет элемент со страницы", 0),
		new Answer("Скрывает элемент, и он не занимает пространство на странице", 1),
		new Answer("Делает элемент прозрачным", 0)
	]),
	new Question("Какое свойство используется для изменения цвета текста?", 
	[
		new Answer("text-color", 0),
		new Answer("color", 1),
		new Answer("font-color", 0),
		new Answer("text-style", 0)
	]),
	new Question("Каким будет результат работы следующего CSS-кода: body { font-size: 100%; }?", 
	[
		new Answer("Размер шрифта текста в теге body будет увеличен в 2 раза", 0),
		new Answer("Размер шрифта текста в теге body будет равен размеру шрифта по умолчанию", 1),
		new Answer("Размер шрифта текста в теге body уменьшится до 0", 0),
		new Answer("Код не будет иметь никакого эффекта", 0)
	]),
	new Question("Какой селектор выбирает все элементы &ltp&gt, находящиеся внутри элементов &ltdiv&gt?", 
	[
		new Answer("div + p", 0),
		new Answer("div p", 1),
		new Answer("div > p", 0),
		new Answer("p > div", 0)
	]),
	new Question("Какое значение свойства position делает элемент позиционированным относительно его исходного местоположения?", 
	[
		new Answer("absolute", 0),
		new Answer("fixed", 0),
		new Answer("relative", 1),
		new Answer("static", 0)
	]),
	new Question("Какое свойство используется для изменения прозрачности элемента?", 
	[
		new Answer("opacity", 1),
		new Answer("transparent", 0),
		new Answer("visibility", 0),
		new Answer("alpha", 0)
	]),
	new Question("Что такое псевдокласс в CSS?", 
	[
		new Answer("Специальный класс, который добавляется в HTML", 0),
		new Answer("Селектор, который определяет особое состояние элемента", 1),
		new Answer("Тег, который используется только в CSS.", 0),
		new Answer("Класс, который автоматически применяется ко всем элементам", 0)
	]),
	new Question("Какой селектор CSS используется для стилизации элементов с определенным id?", 
	[
		new Answer("`.` (точка)", 0),
		new Answer("`#` (решетка)", 1),
		new Answer("`:` (двоеточие)", 0),
		new Answer("`@` (собачка)", 0)
	]),
	new Question("Какое свойство позволяет контролировать размер шрифта?", 
	[
		new Answer("font-weight", 0),
		new Answer("font-style", 0),
		new Answer("font-size", 1),
		new Answer("font-family", 0)
	]),
	new Question("Что делает padding: 20px 10px 5px;?", 
	[
		new Answer("Устанавливает внешний отступ 20px сверху, 10px справа и слева, 5px снизу", 0),
		new Answer("Устанавливает внутренний отступ 20px сверху, 10px справа и слева, 5px снизу", 1),
		new Answer("Устанавливает внешний отступ 20px сверху, 10px справа, 5px снизу и слева", 0),
		new Answer("Устанавливает внутренний отступ 20px сверху, 10px справа, 5px снизу и слева", 0)
	]),
	new Question("Что такое `em` в CSS?", 
	[
		new Answer("Абсолютная единица измерения, равная ширине одного пикселя", 0),
		new Answer("Относительная единица измерения, основанная на размере шрифта родительского элемента", 1),
		new Answer("Единица измерения для цветов", 0),
		new Answer("Глобальная константа для ширины элементов", 0)
	]),
	new Question("Какое значение свойства position позволяет элементу оставаться на фиксированном месте при прокрутке страницы?", 
	[
		new Answer("relative", 0),
		new Answer("absolute", 0),
		new Answer("fixed", 1),
		new Answer("static", 0)
	]),
	new Question("Какое свойство CSS задаёт тень элемента?", 
	[
		new Answer("box-shadow", 1),
		new Answer("text-shadow", 0),
		new Answer("border-shadow", 0),
		new Answer("element-shadow", 0)
	]),
	new Question("Какой селектор выбирает элемент (F), непосредственно следующий за определённым элементом (E), если у них общий родитель?", 
	[
		new Answer("E ~ F", 0),
		new Answer("E + F", 1),
		new Answer("E > F", 0),
		new Answer("E F", 0)
	]),
	new Question("Что делает font-weight: bold;?", 
	[
		new Answer("Изменяет размер шрифта на более крупный", 0),
		new Answer("Делает текст жирным", 0),
		new Answer("Меняет шрифт на полужирный", 1),
		new Answer("Устанавливает специальный шрифт для заголовков", 0)
	]),
	new Question("Какое свойство задаёт внешний отступ элемента?", 
	[
		new Answer("padding", 0),
		new Answer("margin", 1),
		new Answer("border", 0),
		new Answer("outline", 0)
	]),
	new Question("Что делает свойство 'text-transform: uppercase;'?", 
	[
		new Answer("Переводит все символы текста в верхний регистр", 1),
		new Answer("Увеличивает размер текста", 0),
		new Answer("Делает текст жирным", 0),
		new Answer("Изменяет шрифт на капитель", 0)
	]),
	new Question("Что означает 'color: rgba(0,0,0,0.5);?'", 
	[
		new Answer("Черный цвет с 50% прозрачностью", 1),
		new Answer("Белый цвет с 50% прозрачностью", 0),
		new Answer("Красный цвет с 50% прозрачностью", 0),
		new Answer("Прозрачный цвет", 0)
	])
];

function getRandomElements(array, count) {
	const shuffled = array.sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
  };
const current_questions = getRandomElements(questions,10);

//Сам тест
const quiz = new Quiz(1, current_questions, results);

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
		headElem.innerHTML = quiz.results[localStorage.getItem('language')][quiz.result].text;
		pagesElem.innerHTML = "Очки: " + quiz.score;
		localStorage.setItem('css',quiz.score);
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