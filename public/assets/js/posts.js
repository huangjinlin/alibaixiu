jQuery || require('jquery')

function loadData(data){
    $.get("/posts",data,
    function (data, textStatus, jqXHR) {
        console.log(data)   
        let html = template('postsTpl', data)
        $('#postsBox').html(html)   
        let pageHtml = template('pageTpl', data)
        $('#pageBox').html(pageHtml)
    });
}
loadData()
$.get("/categories",
    function (data, textStatus, jqXHR) {
        let html = template('categoryTpl', {data})      
        $('#categoryBox').html(html)
    },
);
function changePage (page) {
    loadData({page})
}

// 处理日期时间格式
function formateDate(date) {
	// 将日期时间字符串转换成日期对象
	date = new Date(date);
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

$('#filterForm').submit(function (e) { 
    e.preventDefault();
    loadData({
        category: $('#categoryBox').val(),
        state: $('#stateBox').val(),
        page: 1
    })
});
//1.做编辑按钮的事件委托
//肯定不是路由- 如果路由有问题,也会跳转,页面是空白的
$('#postsBox').on('click','.edit', function () {
    let id = $(this).data('id')
    location.href = "./post-add.html?id="+id
   
});

$('#postsBox').on('click','.delete', function () {
    let id = $(this).data('id')
    if(confirm('是否确定删除?')){
        $.ajax({
            method: 'delete',
            url: '/posts/'+id,
            success(){
                location.reload()
            }
        })
    }
   
});