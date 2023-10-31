function changeLanguage(){
    if(localStorage.getItem('language')=='cn'){
        localStorage.setItem('language','ru')
        document.getElementById('language').src = 'icons/russia.png'
        document.getElementById('main_h').textContent = 'Статический дизайн';
        document.getElementById('html_about').textContent = 'Тест на знание материала по HTML'
        document.getElementById('html_questions').textContent = '10 вопросов'
        document.getElementById('css_about').textContent = 'Тест на знание материала по CSS'
        document.getElementById('css_questions').textContent = '10 вопросов'
        document.getElementById('js_about').textContent = 'Тест на знание материала по JS'
        document.getElementById('js_questions').textContent = '10 вопросов'
        document.getElementById('b_text').textContent = 'ВлГУ. ИиТР. Кафедра ИСПИ. 2023.'
    }
    else{
        localStorage.setItem('language','cn')
        document.getElementById('language').src = 'icons/china.png'
        document.getElementById('main_h').textContent = '课程：静态设计';
        document.getElementById('html_about').textContent = '材料知识测试 HTML'
        document.getElementById('html_questions').textContent = '10 个问题'
        document.getElementById('css_about').textContent = '材料知识测试 HTML'
        document.getElementById('css_questions').textContent = '10 个问题'
        document.getElementById('js_about').textContent = '材料知识测试 HTML'
        document.getElementById('js_questions').textContent = '10 个问题'
        document.getElementById('b_text').textContent = 'VLSU。 I&TR。 ISPI 部门。 2023 年。'

    }
    
}

function loading(){
    localStorage.setItem('language','ru')
    var html =localStorage.getItem('html')
    var css = localStorage.getItem('css')
    var js = localStorage.getItem('js')
    if(html == null){
        document.getElementById('score1').textContent = "0/10"
    }
    else{
        document.getElementById('score1').textContent = html+"/10"
    }

    if(css==null)
    {
        document.getElementById('score2').textContent = "0/10"
    }
    else{
        document.getElementById('score2').textContent = css+"/10"
    }

    if(js==null)
    {
        document.getElementById('score3').textContent = "0/10"
    }else{
        document.getElementById('score3').textContent = js+"/10"
    }
}