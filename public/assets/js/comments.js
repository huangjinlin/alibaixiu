jQuery || require('jquery')

// for(var i = 1;i<6;i++){
//     $.post("/comments", {
//         author: '5e9ab4cdccae4335880732b4',
//         content: `第${i}个评论`,
//         post:'5e9ea14099273915a4467ef2'
//     },function (data, textStatus, jqXHR) {
            
//     });
// }

//1.获取评论列表的数据-ok
//2.写模板
function formateDate(date) {
	// 将日期时间字符串转换成日期对象
	date = new Date(date);
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}
function changePage(page){
    $.get("/comments",{page},
        function (data, textStatus, jqXHR) {
            console.log('data', data)   
            let html = template('commentsTpl', data)
            $("#commentsBox").html(html)
            var pageHtml = template('pageTpl', data)
            $('#pageBox').html(pageHtml)
        }
    );
}
changePage(1)

$('#commentsBox').on('click', '.comment-status',function(e){
    e.preventDefault()
    let id = $(this).data('id')                                                                                                       
    let state = $(this).data('state')
    //1:可以 2:不可以
    $.ajax({
        method: 'put',
        url: '/comments/'+id,
        data: {
            state: state == 1? 0: 1
        },
        success(){
            location.reload()
        }
    })
})

$('#commentsBox').on('click','.delete', function (e) {
    e.preventDefault()
    let id = $(this).data('id');
    if (confirm('是否删除?')) {
        $.ajax({
            type: "delete",
            url: "/comments/"+id,
            success: function (response) {
                location.reload()
            }
        });
    }
});