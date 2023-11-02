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

		this.language = localStorage.getItem('language');
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
const questions = {
'ru':
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
		new Answer('document.getElementsByClassName("elementId")[0]', 0),
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
		new Answer("array.unshift(element)", 0),
		new Answer("array.append(element)", 0),
		new Answer("array.add(element)", 0),
		new Answer("array.push(element)", 1)
	]),

	new Question("Как очистить массив?", 
	[
		new Answer("array = []", 1),
		new Answer("array.clear()", 0),
		new Answer("array.empty()", 0),
		new Answer("array.remove()", 0)
	]),

	new Question("Как проверить, что в массиве есть элементы?", 
	[
		new Answer("array.length > 0", 1),
		new Answer("array.isEmpty()", 0),
		new Answer("array.hasElements()", 0),
		new Answer("array.exists()", 0)
	]),

	new Question("Как проверить, есть ли атрибут с названием у элемента?", 
	[
		new Answer('element.hasAttribute("attributeName")', 1),
		new Answer('element.getAttribute("attributeName") !== null', 0),
		new Answer('element.attributeName !== undefined', 0),
		new Answer('element.containsAttribute("attributeName")', 0)
	]),

	new Question("Как вывести сообщение в консоль в JavaScript?", 
	[
		new Answer('console.logMessage("Hello");', 0),
		new Answer('log.console("Hello");', 0),
		new Answer('print("Hello");', 0),
		new Answer('console.log("Hello");', 1)
	]),

	new Question("Какой символ используется для комментирования однострочного комментария в JavaScript?", 
	[
		new Answer("//", 1),
		new Answer("--", 0),
		new Answer("/*", 0),
		new Answer("#", 0)
	]),

	new Question("Какой оператор используется для сравнения значений в JavaScript?", 
	[
		new Answer("==", 0),
		new Answer("!=", 0),
		new Answer("===", 1),
		new Answer("!==", 0)
	]),

	new Question("Как проверить длину строки в JavaScript?", 
	[
		new Answer("string.count();", 0),
		new Answer("string.size();", 0),
		new Answer("string.length;", 1),
		new Answer("string.checkLength();", 0)
	]),

	new Question("Каким образом можно округлить число в JavaScript?", 
	[
		new Answer("Math.floor(num);", 0),
		new Answer("Math.round(num);", 0),
		new Answer("Math.ceil(num);", 0),
		new Answer("Все вышеперечисленные варианты", 1)
	]),

	new Question("Каким образом можно сгенерировать случайное число в диапазоне от 1 до 10 в JavaScript?", 
	[
		new Answer("Math.random(1, 10);", 0),
		new Answer("Math.floor(Math.random() * 10)+1;", 1),
		new Answer("Math.randomRange(1, 10);", 0),
		new Answer("random(1, 10);", 0)
	]),

	new Question("Как проверить, является ли переменная массивом в JavaScript?", 
	[
		new Answer(" isArray(variable);", 0),
		new Answer("variable.isArray();", 0),
		new Answer("variable instanceof Array;", 0),
		new Answer("Все вышеперечисленные варианты", 1)
	]),

	new Question("Как объявить функцию в JavaScript?", 
	[
		new Answer("function myFunction() {}", 1),
		new Answer("def myFunction() {}", 0),
		new Answer("myFunction = function() {}", 0),
		new Answer("let myFunction() {}", 0)
	]),

	new Question("Каким образом можно преобразовать строку в верхний регистр в JavaScript?", 
	[
		new Answer("string.toUpperCase();", 1),
		new Answer("string.toUpper();", 0),
		new Answer("string.upperCase();", 0),
		new Answer("string.upper();", 0)
	]),

	new Question("В чем разница между confirm и prompt?", 
	[
		new Answer("confirm вызывает диалоговое окно с полем для ввода, prompt - окно с подтверждением", 0),
		new Answer("Они ничем не отличаются", 0),
		new Answer("prompt вызывает диалоговое окно с полем для ввода, confirm - окно с подтверждением", 1)
	]),

	new Question('Что будет записано в переменную test?\nvar a = 5;\nvar test = 5 != a ? "Yes" : "No";', 
	[
		new Answer("5", 0),
		new Answer("Будет ошибка", 0),
		new Answer("No", 1),
		new Answer("a", 0),
		new Answer("Yes", 0)
	]),

	new Question('Почему код ниже не будет работать?\n<script type="javascript/text">\nconsole.log("Hi!")\n</script>\n', 
	[
		new Answer("Неверно записан атрибут type", 1),
		new Answer('Необходима точка с запятой после console.log("Hi!")', 0),
		new Answer('Запись console.log необходимо прописывать лишь в отдельных файлах', 0)
	]),

	new Question("В чем отличие между локальной и глобальной переменной?", 
	[
		new Answer("Глобальные видны повсюду, локальные только в функциях", 1),
		new Answer("Отличий нет", 0),
		new Answer("Глобальные можно переопределять, локальные нельзя", 0),
		new Answer("Локальные видны повсюду, глобальные только в функциях", 0),
		new Answer("Локальные можно переопределять, глобальные нельзя", 0)
	]),

	
], 'cn':[
	new Question("哪个运算符用于比较数值而不考虑类型", 
	[
		new Answer("===", 0),
		new Answer("==", 1),
		new Answer("=!", 0),
		new Answer("=:=", 0)
	]),

	new Question("如何在 JavaScript 中声明变量？", 
	[
		new Answer("var name;", 0),
		new Answer("let name;", 0),
		new Answer("variable name;", 0),
		new Answer("答案 1 和 2", 1)
	]),

	new Question("哪种数组方法会在数组末尾添加一个元素", 
	[
		new Answer("shift()", 0),
		new Answer("unshift()", 0),
		new Answer("push()", 1),
		new Answer("pop()", 0)
	]),

	new Question('操作符"！"有什么作用 ?', 
	[
		new Answer("乘法运算", 0),
		new Answer("划分", 0),
		new Answer("拒绝", 1),
		new Answer("字符串连接", 0)
	]),

	new Question("以下哪种方法可以将字符串转换为数字？", 
	[
		new Answer("Number()", 0),
		new Answer("ParseInt()", 0),
		new Answer("ParseFloat", 0),
		new Answer("全部", 1)
	]),

	new Question("如何在点击按钮时调用 JavaScript 函数？", 
	[
		new Answer('onclick="myFunction()"', 1),
		new Answer('addEventListener("click", myFunction)', 0),
		new Answer('button.onclick = myFunction()', 0),
		new Answer('button.addEventListener("click", myFunction)', 0)
	]),

	new Question("如何将单独文件中的脚本添加到网页中？", 
	[
		new Answer('<script src="script.js"></script>', 1),
		new Answer('<link rel="stylesheet" href="styles.css">', 0),
		new Answer('<img src="image.jpg" alt="Image">', 0),
		new Answer('<a href="page.html">Link</a>', 0)
	]),

	new Question("如何在 JavaScript 中通过 id 访问元素？", 
	[
		new Answer('document.querySelector("#elementId")', 0),
		new Answer('document.getElementById("elementId")', 1),
		new Answer('document.getElementsByClassName("elementId")[0]', 0),
		new Answer('document.getElementsByTagName("div")[0]', 0)
	]),

	new Question("如何按 id 将网页元素写入变量？", 
	[
		new Answer('var element = document.getElementsByTagName("div")[0]', 0),
		new Answer('var element = document.getElementsByClassName("elementId")[0]', 0),
		new Answer('var element = document.querySelector("#elementId")', 0),
		new Answer('var element = document.getElementById("elementId")', 1)
	]),

	new Question("如何从网页元素中获取属性？", 
	[
		new Answer('element.getAttribute("attributeName")', 1),
		new Answer('element.attributeName', 0),
		new Answer('element.getAttributeValue("attributeName")', 0),
		new Answer('element.attribute("attributeName")', 0)
	]),

	new Question("如何将属性值转换为整数？", 
	[
		new Answer("Number(attributeValue)", 0),
		new Answer("parseInt(attributeValue)", 1),
		new Answer("parseFloat(attributeValue)", 0),
		new Answer("attributeValue.toInt()", 0)
	]),

	new Question("如何将网页元素添加到数组中？", 
	[
		new Answer("array.unshift(element)", 0),
		new Answer("array.append(element)", 0),
		new Answer("array.add(element)", 0),
		new Answer("array.push(element)", 1)
	]),

	new Question("如何清除数组", 
	[
		new Answer("array = []", 1),
		new Answer("array.clear()", 0),
		new Answer("array.empty()", 0),
		new Answer("array.remove()", 0)
	]),

	new Question("如何检查数组是否有元素？", 
	[
		new Answer("array.length > 0", 1),
		new Answer("array.isEmpty()", 0),
		new Answer("array.hasElements()", 0),
		new Answer("array.exists()", 0)
	]),

	new Question("如何检查元素是否具有命名属性？", 
	[
		new Answer('element.hasAttribute("attributeName")', 1),
		new Answer('element.getAttribute("attributeName") !== null', 0),
		new Answer('element.attributeName !== undefined', 0),
		new Answer('element.containsAttribute("attributeName")', 0)
	]),

	new Question("如何在 JavaScript 中向控制台打印信息？", 
	[
		new Answer('console.logMessage("Hello");', 0),
		new Answer('log.console("Hello");', 0),
		new Answer('print("Hello");', 0),
		new Answer('console.log("Hello");', 1)
	]),

	new Question("在 JavaScript 中，哪个字符用于单行注释？", 
	[
		new Answer("//", 1),
		new Answer("--", 0),
		new Answer("/*", 0),
		new Answer("#", 0)
	]),

	new Question("哪个运算符用于比较 JavaScript 中的值，包括数据类型？", 
	[
		new Answer("==", 0),
		new Answer("!=", 0),
		new Answer("===", 1),
		new Answer("!==", 0)
	]),

	new Question("如何在 JavaScript 中检查字符串的长度？", 
	[
		new Answer("string.count();", 0),
		new Answer("string.size();", 0),
		new Answer("string.length;", 1),
		new Answer("string.checkLength();", 0)
	]),

	new Question("如何用 JavaScript 对数字进行四舍五入？", 
	[
		new Answer("Math.floor(num);", 0),
		new Answer("Math.round(num);", 0),
		new Answer("Math.ceil(num);", 0),
		new Answer("以上所有方法", 1)
	]),

	new Question("如何用 JavaScript 生成介于 1 和 10 之间的随机数？", 
	[
		new Answer("Math.random(1, 10);", 0),
		new Answer("Math.floor(Math.random() * 10)+1;", 1),
		new Answer("Math.randomRange(1, 10);", 0),
		new Answer("random(1, 10);", 0)
	]),

	new Question("如何在 JavaScript 中检查变量是否为数组？", 
	[
		new Answer(" isArray(variable);", 0),
		new Answer("variable.isArray();", 0),
		new Answer("variable instanceof Array;", 0),
		new Answer("以上所有方法", 1)
	]),

	new Question("如何在 JavaScript 中声明函数？", 
	[
		new Answer("function myFunction() {}", 1),
		new Answer("def myFunction() {}", 0),
		new Answer("myFunction = function() {}", 0),
		new Answer("let myFunction() {}", 0)
	]),

	new Question("如何在 JavaScript 中将字符串转换为大写字母？", 
	[
		new Answer("string.toUpperCase();", 1),
		new Answer("string.toUpper();", 0),
		new Answer("string.upperCase();", 0),
		new Answer("string.upper();", 0)
	]),

	new Question("confirm 和 prompt 有什么区别？", 
	[
		new Answer("confirm 调用一个带有输入框的对话框， prompt - 一个确认窗口", 0),
		new Answer("没有区别", 0),
		new Answer("prompt 打开一个带有输入框的对话框，confirm 打开一个确认框", 1)
	]),

	new Question('将向变量写入什么内容？\nvar a = 5;\nvar test = 5 != a ? "是" : "没有";', 
	[
		new Answer("5", 0),
		new Answer("将出现错误", 0),
		new Answer("没有", 1),
		new Answer("a", 0),
		new Answer("是", 0)
	]),

	new Question('为什么下面的代码不起作用？\n<script type="javascript/text">\nconsole.log("Hi!")\n</script>\n', 
	[
		new Answer("type 属性的写法不正确", 1),
		new Answer('console.log("Hi!") 后需要分号', 0),
		new Answer('console.log 条目只能写入单独的文件中', 0)
	]),

	new Question("局部变量和全局变量有什么区别？", 
	[
		new Answer("全局的在任何地方都能看到，局部的只能在功能中看到", 1),
		new Answer("没有区别", 0),
		new Answer("全局的可以被覆盖，本地的不能", 0),
		new Answer("局部变量随处可见，全局变量仅在函数中可见", 0),
		new Answer("本地可以覆盖，全局不能", 0)
	]),

	
]};

function getRandomElements(array, count) {
	const shuffled = array.sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
  };

const current_questions = getRandomElements(questions[localStorage.getItem('language')],10);
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
		AddClicks();
	}
	else
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[localStorage.getItem('language')][quiz.result].text;
		pagesElem.innerHTML = "Очки: " + quiz.score;
		localStorage.setItem('js',quiz.score);
		var timer = setTimeout(function() {
            window.location='index.html'
        }, 5000);
	}
}

function AddClicks()
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

function DisableButtons()
{
	let btns = document.getElementsByClassName("button");
	for(let i = 0; i < btns.length; i++)
	{	
		//Делаем кнопки серыми
		btns[i].className = "button button_passive";
		btns[i].disabled = true;
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);
	//Выключаем кнопки
	DisableButtons();

	//Ждём секунду и обновляем тест
	setTimeout(Update, 500);
}
