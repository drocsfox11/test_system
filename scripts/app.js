const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");
localStorage.setItem('html',0);


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
const questions = 
[
	new Question("Элемент &lttitle&gt должен быть расположен внутри", 
	[
		new Answer("элемента &lthead&gt", 1),
		new Answer("элемента &ltbody&gt", 0)
	]),

	new Question("Где можно использовать тег &ltstyle&gt?", 
	[
		new Answer("Только внутри элемента &lthead&gt", 1),
		new Answer("Только внутри элемента &ltbody&gt", 0),
		new Answer("Внутри элементов &lthead&gt и &ltbody&gt", 0)
	]),

	new Question("Как можно открыть ссылку в новом окне?", 
	[
		new Answer('target="_new"', 0),
		new Answer('target="_window"', 0),
		new Answer('target="_blank"', 1),
	]),

	new Question("Какой HTML элемент отображает изображение?", 
	[
		new Answer('&ltimage&gt', 0),
		new Answer('&ltpicture&gt', 0),
		new Answer('&ltimg&gt', 1),
		new Answer("&ltpic&gt", 0)
	]),

	new Question("Как написать HTML комментарии?", 
	[
		new Answer("&lt!-- Это HTML комментарий--&gt", 1),
		new Answer("/* Это HTML комментарий*/", 0),
		new Answer("// Это HTML комментарий", 0),
	]),

	new Question("H3 - это самый главный тег header․", 
	[
		new Answer("Верно", 0),
		new Answer("Неверно", 1),
	]),

	new Question("Как создать текст со шрифтом italic?", 
	[
		new Answer("&ltem&gtТекст&lt/em&gt", 1),
		new Answer("&ltitalic>Текст&lt/italic&gt", 0),
		new Answer("&lti&gtТекст&lt/i&gt", 0),
		new Answer("&ltstrong&gtТекст&lt/strong&gt", 0)
	]),

	new Question("Какой из следующих тегов table используется для создания строки таблицы?", 
	[
		new Answer('&ltth&gt', 0),
		new Answer('&lttd&gt', 0),
		new Answer('&lttr&gt', 1),
		new Answer('&lttable&gt', 0)
	]),

	new Question("Какой необязательный тег table используется для добавления краткого описания наверху таблицы?", 
	[
		new Answer("description", 0),
		new Answer("caption", 1),
		new Answer("title", 0),
	]),

	new Question("Какой HTML тег является правильным для нового параграфа?", 
	[
		new Answer("&ltparagraph&gt", 0),
		new Answer("&ltp&gt", 1),
		new Answer("&ltpre&gt", 0),
	]),

	new Question("Какой из следующих вариантов не является HTML атрибутом?", 
	[
		new Answer("alt", 0),
		new Answer("target", 0),
		new Answer("fontSize", 1),
		new Answer("id", 0)
	]),

	new Question("Какой HTML атрибут указывает положение изображения внутри тега image?", 
	[
		new Answer("&ltul&gt", 1),
		new Answer("&ltol&gt", 0),
		new Answer("&ltli&gt", 0)
	]),

	new Question("Какой элемент является блочным?", 
	[
		new Answer("&ltspan&gt", 0),
		new Answer("&lta&gt", 0),
		new Answer("&lttable&gt", 1),
		new Answer("&ltp&gt", 0)
	]),

	new Question("Какой элемент не имеет закрывающий тег?", 
	[
		new Answer("tag", 0),
		new Answer("empty tag", 1),
		new Answer("closed tag", 0)
	]),

	new Question("Выберите пример пустого элемента", 
	[
		new Answer("&ltimg /&gt", 1),
		new Answer("&lt/ img&gt", 0),
		new Answer("&ltimg&gt &lt/img&gt", 0)
	]),

	new Question("Какой из следующих тегов table используется для создания ячеек table header?", 
	[
		new Answer("&ltth&gt", 1),
		new Answer("&lttd&gt", 0),
		new Answer("&lttr&gt", 0),
		new Answer("&lttable&gt", 0)
	]),

	new Question("Какой из следующих тегов table используется для создания ячеек table data?", 
	[
		new Answer("&ltth&gt", 0),
		new Answer("&lttd&gt", 1),
		new Answer("&lttr&gt", 0),
		new Answer("&lttable&gt", 0)
	]),

	new Question("Какой элемент не является пустым?", 
	[
		new Answer("&ltbr /&gt", 0),
		new Answer("&ltp&gt", 1),
		new Answer("&ltimg /&gt", 0),
		new Answer("&lthr /&gt", 0)
	]),

	new Question("Какой тег указывает поле form, где пользователь может ввести больше текста?", 
	[
		new Answer("&lttextarea&gt", 1),
		new Answer("&ltbutton&gt", 0),
		new Answer("&lta&gt", 0),
		new Answer("&ltlabel&gt", 0)
	]),

	new Question("Для чего используют тег div?", 
	[
		new Answer("Для блочной верстки сайта", 1),
		new Answer("Для работы с видео", 0),
		new Answer("Для табличной верстки сайта", 0),
		new Answer("Для создание таблиц", 0),
		new Answer("Для работы с текстом", 0),
	]),

	new Question('Что делает код ниже?\n&lta href="/" title="Посмотреть"&gtНемного текста&lt/a&gt', 
	[
		new Answer('Выводит ссылку на основную страницу с подсказкой "Посмотреть"', 1),
		new Answer('Выводит обычный текст с подсказкой "Посмотреть"', 0),
		new Answer("Выводит ссылку на перезагрузку страницы", 0),
		new Answer('Выводит нерабочую ссылку с подсказкой "Посмотреть"', 0)
	]),

	new Question("Все input теги стоит записывать в теге...", 
	[
		new Answer("fields", 0),
		new Answer("table", 0),
		new Answer("form", 1),
		new Answer("section", 0)
	]),

	new Question("Какой из тегов не является тегом для работы с текстом?", 
	[
		new Answer("strike", 0),
		new Answer("p", 0),
		new Answer("sup", 0),
		new Answer("canvas", 1),
		new Answer("i", 0),
	]),

	new Question('Что не так в коде ниже?\n&ltimg href="/img/test.png" alt=""&gt', 
	[
		new Answer("Нужен зарывающий тег img", 0),
		new Answer("Путь к изображению указан не полностью", 0),
		new Answer("Вместо href необходимо прописывать src", 1),
		new Answer("Необходимо дописать атрибут title", 0)
	]),

	new Question("Какой тег создает пронумерованный список?", 
	[
		new Answer("ol", 1),
		new Answer("ul", 0),
	]),

	new Question("Где верно записан DOCTYPE для HTML5 версии?", 
	[
		new Answer("&ltDOCTYPE html&gt", 0),
		new Answer("&lt!DOCTYPE html&gt", 0),
		new Answer("&ltDOCTYPE html5&gt", 0),
		new Answer("&lt!DOCTYPE html&gt", 1)
	]),

	new Question("Какого поля type у input не существует?", 
	[
		new Answer("date", 0),
		new Answer("number", 0),
		new Answer("name", 1),
		new Answer("color", 0),
		new Answer("reset", 0),
	]),

	new Question("Какой тег не существует в HTML?", 
	[
		new Answer("article", 0),
		new Answer("menu", 0),
		new Answer("command", 1),
		new Answer("navigation", 0),
		new Answer("mark", 0)
	]),

	new Question("Для чего используется тег pre?", 
	[
		new Answer("Используется для вывода текста", 0),
		new Answer("Используется для вывода цитаты", 0),
		new Answer("Используется для вывода адреса", 0),
		new Answer("Используется для вывода аббревиатуры", 0),
		new Answer("Используется для вывода программного кода", 0),
	]),

	new Question("Какой тег h самый большой по размеру?", 
	[
		new Answer("h6", 0),
		new Answer("h3", 0),
		new Answer("h1", 1),
		new Answer("h2", 0),
		new Answer("h4", 0),
	])
];


const current_questions = []

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
		localStorage.setItem('html',quiz.score);
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