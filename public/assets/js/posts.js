jQuery || require('jquery')

$.get("/posts",
    function (data, textStatus, jqXHR) {
        console.log(data)   
        let html = template('postsTpl', data)
        $('#postsBox').html(html)   
        let pageHtml = template('pageTpl', data)
        $('#pageBox').html(pageHtml)
    },
);
$.get("/categories",
    function (data, textStatus, jqXHR) {
        let html = template('categoryTpl', {data})      
        $('#categoryBox').html(html)
    },
);
function changePage (page) {
    $.get("/posts",{
        page
    },
    function (data, textStatus, jqXHR) {
        console.log(data)   
        let html = template('postsTpl', data)
        $('#postsBox').html(html)   
        let pageHtml = template('pageTpl', data)
        $('#pageBox').html(pageHtml)
    },
);
}

// 处理日期时间格式
function formateDate(date) {
	// 将日期时间字符串转换成日期对象
	date = new Date(date);
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

$('#filterForm').submit(function (e) { 
    e.preventDefault();
    $.get("/posts",{
        category: $('#categoryBox').val(),
        state: $('#stateBox').val(),
        page: 1
    },
    function (data, textStatus, jqXHR) {
        console.log(data)   
        let html = template('postsTpl', data)
        $('#postsBox').html(html)   
        let pageHtml = template('pageTpl', data)
        $('#pageBox').html(pageHtml)
    },
);
});