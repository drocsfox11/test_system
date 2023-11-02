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
const questions =
{"ru": [
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
	new Question("Что делает 'padding: 20px 10px 5px;'?", 
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
	new Question("Что делает 'font-weight: bold;'?", 
	[
		new Answer("Изменяет размер шрифта на более крупный", 0),
		new Answer("Делает текст жирным", 1),
		new Answer("Меняет шрифт на полужирный", ),
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
	new Question("Что означает 'color: rgba(0,0,0,0.5);'?", 
	[
		new Answer("Черный цвет с 50% прозрачностью", 1),
		new Answer("Белый цвет с 50% прозрачностью", 0),
		new Answer("Красный цвет с 50% прозрачностью", 0),
		new Answer("Прозрачный цвет", 0)
	]),
	new Question("Какой селектор выберет все параграфы (&ltp&gt) внутри элемента с классом container?", 
	[
		new Answer("p container", 0),
		new Answer(".container p", 1),
		new Answer("container > p", 0),
		new Answer("p + .container", 0)
	]),
	new Question("Для чего используется свойство 'border-radius'?", 
	[
		new Answer("Для создания границы вокруг элемента", 0),
		new Answer("Для добавления тени элементу", 0),
		new Answer("Для создания скругленных углов", 1),
		new Answer("Для изменения размера элемента", 0)
	]),
	new Question("Какой свойство CSS устанавливает цвет фона элемента?", 
	[
		new Answer("background", 0),
		new Answer("color", 0),
		new Answer("bg-color", 0),
		new Answer("background-color", 1)
	]),
	new Question("Какой из этих цветов соответствует #ffffff?", 
	[
		new Answer("Черный", 0),
		new Answer("Красный", 0),
		new Answer("Зеленый", 0),
		new Answer("Белый", 1)
	]),
	new Question("Какой псевдокласс используется для стилизации элемента при наведении курсора?", 
	[
		new Answer(":focus", 0),
		new Answer(":click", 0),
		new Answer(":active", 0),
		new Answer(":hover", 1)
	]),
	new Question("Какое свойство задает тень для текста?", 
	[
		new Answer("text-shadow", 1),
		new Answer("font-shadow", 0),
		new Answer("shadow", 0),
		new Answer("box-shadow", 0)
	]),
	new Question("Какой атрибут используется для внешнего соединения CSS файла с HTML?", 
	[
		new Answer("<link>", 1),
		new Answer("<style>", 0),
		new Answer("<css>", 0),
		new Answer("<stylesheet>", 0)
	]),
	new Question("Что делает line-height в CSS?", 
	[
		new Answer("Изменяет ширину текста", 0),
		new Answer("Изменяет высоту строк текста", 1),
		new Answer("Добавляет подчеркивание к тексту", 0),
		new Answer("Изменяет интервал между буквами", 0)
	]),
	new Question("Какое свойство используется для стилизации списков?", 
	[
		new Answer("list-style", 1),
		new Answer("list-decoration", 0),
		new Answer("list-type", 0),
		new Answer("list-item", 0)
	]),
	new Question("Какой псевдокласс используется для стилизации посещенной ссылки?", 
	[
		new Answer(":link", 0),
		new Answer(":visited", 1),
		new Answer(":active", 0),
		new Answer(":hover", 0)
	]),
	new Question("Что определяет свойство 'transition delay'?", 
	[
		new Answer("Список свойств, которые будут анимироваться", 0),
		new Answer("Продолжительность анимации", 0),
		new Answer("Задержка перед началом анимации", 1),
		new Answer("Вид распределения анимации во времени", 0)
	]),
	new Question("Что делает свойство 'font-family'?", 
	[
		new Answer("Задает стиль текста (например наклонный)", 0),
		new Answer("Задает список шрифтов", 1),
		new Answer("Определяет вид маркера списка", 0),
		new Answer("Задает отступ первой строки", 0)
	])

],
"cn":
	[
		new Question("display: none; 属性有什么作用？", 
	[
		new Answer("隐藏元素，但它仍然占用页面上的空间", 0),
		new Answer("У从页面中删除元素", 0),
		new Answer("隐藏元素，并且它不占用页面上的空间", 1),
		new Answer("使元素变得透明", 0)
	]),
	new Question("哪个属性用于更改文字的颜色？", 
	[
		new Answer("text-color", 0),
		new Answer("color", 1),
		new Answer("font-color", 0),
		new Answer("text-style", 0)
	]),
	new Question("以下 CSS 代码的结果如何：body { font-size: 100%; }？", 
	[
		new Answer("<body> 标记中文本的字体大小将加倍", 0),
		new Answer("<body> 标记中的文本字体大小将等于默认字体大小", 1),
		new Answer("<body> 标记中的文本字体大小将减小为 0", 0),
		new Answer("此代码无效果", 0)
	]),
	new Question("哪个选择器可选择 &ltdiv&gt 元素内的所有 &ltp&gt 元素？", 
	[
		new Answer("div + p", 0),
		new Answer("div p", 1),
		new Answer("div > p", 0),
		new Answer("p > div", 0)
	]),
	new Question("К哪个 position 属性值能使元素相对于其原始位置定位？", 
	[
		new Answer("absolute", 0),
		new Answer("fixed", 0),
		new Answer("relative", 1),
		new Answer("static", 0)
	]),
	new Question("哪个属性用于改变元素的透明度？", 
	[
		new Answer("opacity", 1),
		new Answer("transparent", 0),
		new Answer("visibility", 0),
		new Answer("alpha", 0)
	]),
	new Question("什么是 CSS 中的伪类？", 
	[
		new Answer("一个添加到 HTML 中的特殊类", 0),
		new Answer("定义元素特定状态的选择器", 1),
		new Answer("仅在 CSS 中使用的标签", 0),
		new Answer("自动应用于所有元素的类", 0)
	]),
	new Question("哪个 CSS 选择器用于为具有特定 id 的元素设计样式？", 
	[
		new Answer("`.`", 0),
		new Answer("`#`", 1),
		new Answer("`:`", 0),
		new Answer("`@`", 0)
	]),
	new Question("哪个属性允许您控制字体大小？", 
	[
		new Answer("font-weight", 0),
		new Answer("font-style", 0),
		new Answer("font-size", 1),
		new Answer("font-family", 0)
	]),
	new Question("padding: 20px 10px 5px 5px; 有什么作用？", 
	[
		new Answer("设置上方的外边距为 20px，左右为 10px，下方为 5px", 0),
		new Answer("设置上方的内边距为 20px，左右为 10px，下方为 5px", 1),
		new Answer("设置上方的外边距为 20px，右侧为 10px，下方和左侧为 5px", 0),
		new Answer("设置上方的内边距为 20px，右侧为 10px，下方和左侧为 5px", 0)
	]),
	new Question("CSS 中的 `em` 是什么？", 
	[
		new Answer("相当于一个像素宽度的绝对度量单位", 0),
		new Answer("基于父元素字体大小的相对度量单位", 1),
		new Answer("用于颜色的度量单位", 0),
		new Answer("元素宽度的全局常量", 0)
	]),
	new Question("位置属性的哪个值可以使元素在页面滚动时保持固定位置？", 
	[
		new Answer("relative", 0),
		new Answer("absolute", 0),
		new Answer("fixed", 1),
		new Answer("static", 0)
	]),
	new Question("哪个 CSS 属性可以设置元素的阴影？", 
	[
		new Answer("box-shadow", 1),
		new Answer("text-shadow", 0),
		new Answer("border-shadow", 0),
		new Answer("element-shadow", 0)
	]),
	new Question("如果元素 (F) 紧随在特定元素 (E) 之后，并且它们有共同的父元素，使用哪种选择器来选择元素 (F)？", 
	[
		new Answer("E ~ F", 0),
		new Answer("E + F", 1),
		new Answer("E > F", 0),
		new Answer("E F", 0)
	]),
	new Question("‘font-weight: bold;’ 的作用是什么？", 
    [
        new Answer("将字体大小更改为更大", 0),
        new Answer("使文本加粗", 1),
        new Answer("将字体更改为半粗体", 0),
        new Answer("为标题设置特殊字体", 0)
    ]),
	new Question("哪个属性可以设置元素的外部缩进？", 
	[
		new Answer("padding", 0),
		new Answer("margin", 1),
		new Answer("border", 0),
		new Answer("outline", 0)
	]),
	new Question("‘text-transform: uppercase;’ 属性的作用是什么？", 
	[
		new Answer("将文本的所有字符转换为大写", 1),
		new Answer("增大文本大小", 0),
		new Answer("使文本加粗", 0),
		new Answer("将字体更改为小型大写字母", 0)
	]),
	new Question("‘color: rgba(0,0,0,0.5);’ 意味着什么？", 
	[
		new Answer("黑色，透明度50%", 1),
		new Answer("白色，透明度50%", 0),
		new Answer("红色，透明度50%", 0),
		new Answer("透明色", 0)
	]),
	new Question("哪个选择器将选择类为 container 的元素内的所有段落 (&ltp&gt)？", 
	[
		new Answer("p container", 0),
		new Answer(".container p", 1),
		new Answer("container > p", 0),
		new Answer("p + .container", 0)
	]),
	new Question("'border-radius' 属性的用途是什么？", 
	[
		new Answer("为元素创建一个边框", 0),
		new Answer("为元素添加阴影", 0),
		new Answer("创建圆角", 1),
		new Answer("改变元素的大小", 0)
	]),
	new Question("哪个 CSS 属性可以设置元素的背景颜色？", 
	[
		new Answer("background", 0),
		new Answer("color", 0),
		new Answer("bg-color", 0),
		new Answer("background-color", 1)
	]),
	new Question("以下哪种颜色对应于 #ffffff？", 
	[
		new Answer("黑色", 0),
		new Answer("红色", 0),
		new Answer("绿化", 0),
		new Answer("白色", 1)
	]),
	new Question("哪个伪类用于在元素悬停时设置样式？", 
	[
		new Answer(":focus", 0),
		new Answer(":click", 0),
		new Answer(":active", 0),
		new Answer(":hover", 1)
	]),
	new Question("哪个属性为文本设置阴影？", 
	[
		new Answer("text-shadow", 1),
		new Answer("font-shadow", 0),
		new Answer("shadow", 0),
		new Answer("box-shadow", 0)
	]),
	new Question("哪个属性用于从外部将 CSS 文件链接到 HTML？", 
	[
		new Answer("&ltlink&gt", 1),
		new Answer("&ltstyle&gt", 0),
		new Answer("&ltcss&gt", 0),
		new Answer("&ltstylesheet&gt", 0)
	]),
	new Question("CSS 中的线高属性有什么作用？", 
	[
		new Answer("改变文本宽度", 0),
		new Answer("改变文本行高", 1),
		new Answer("给文本添加下划线", 0),
		new Answer("改变字母间距", 0)
	]),
	new Question("哪个属性用于给列表添加样式？", 
	[
		new Answer("list-style", 1),
		new Answer("list-decoration", 0),
		new Answer("list-type", 0),
		new Answer("list-item", 0)
	]),
	new Question("哪个伪类用于样式化访问过的链接？", 
	[
		new Answer(":link", 0),
		new Answer(":visited", 1),
		new Answer(":active", 0),
		new Answer(":hover", 0)
	]),
	new Question("‘transition delay’ 属性定义了什么？", 
	[
		new Answer("将要进行动画处理的属性列表", 0),
		new Answer("动画的持续时间", 0),
		new Answer("动画开始前的延迟", 1),
		new Answer("动画时间分布的类型", 0)
	]),
	new Question("‘font-family’ 属性有什么作用？", 
	[
		new Answer("设定文本样式（例如斜体）", 0),
		new Answer("设定字体列表", 1),
		new Answer("确定列表标记的样式", 0),
		new Answer("设定首行缩进", 0)
	])

]
};

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
		localStorage.setItem('css',quiz.score);
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
		
		btns[i].disabled = true;
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);
	DisableButtons();
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
