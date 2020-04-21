jQuery || require('jquery')
//1.给表单添加name-ok
//2.表单的提交事件绑定-ok
//3.发送请求-ok
$('#addCategoryForm').submit(function (e) { 
    e.preventDefault();
    $.post("/categories", $(this).serialize(),
        function (data, textStatus, jqXHR) {
            // console.log('data',data)
            location.reload()
        }
    );
});
//1.写列表的模板-ok
//2.发送请求,拼接字符串
$.get("/categories",
    function (data, textStatus, jqXHR) {
        let html = template('categoryTpl', {data})
        $('#categoryBox').html(html)
    },
);

$('#categoryBox').on('click', '.edit',function () {
    //1.写编辑表单的模板-ok
    //2.根据id查询分类,分类的数据放到模板里面
    $.get("/categories/"+$(this).data('id'), 
        function (data, textStatus, jqXHR) {
            let html = template('modifyTpl', data)
            $('#modifyBox').html(html)
        },
    );
});

$('#categoryBox').on('click', '.delete',function () {
    let id = $(this).data('id')
    $.ajax({
        type: "delete",
        url: "/categories/"+id,
        success: function (response) {
            location.reload()
        }
    });
})    
$('#modifyBox').on('submit', '#modifyCategoryForm', function(e){
    let id = $(this).data('id')
    $.ajax({
        type: "put",
        url: "/categories/"+id,
        data: $(this).serialize(),
        success: function (response) {
            location.reload()
        }
    });
});