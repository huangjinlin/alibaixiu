jQuery || require('jquery')

//getParams这个方法可以怎么去优化
//1不知道
/*
function getParams (paramName) {
    var str = location.search.substr(1)
    var arr = str.split('&')
    for(var i = 0; i<arr.length; i++){
        var param = arr[i].split('=')
        var name = param[0]
        var value = param[1]
        if(name == paramName){
            return value
        }
    }
    return -1
}
*/
//老师想给大家讲的是那种方式?
//我不想写工具性代码
//1.借着第三方模块
//https://www.npmjs.com/package/query-string
//学了vue的脚手架才能使用npm,react,小程序都有'脚手架'
//2.用javascript自带api
// URLSearchParams
// https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams
/*
function getParams (paramName) {
    //?id=123&age=100
    var str = location.search.substr(1)//str=id=123&age=100
    var arr = str.split('&')//["id=123","age=100"]
    var result = arr.map(item=> item.split('='))//[["id","123"],["age","100"]]
    var find = result.find(item=>item[0]==paramName)
    return find ? find[1] : -1
}
*/
function getParams (paramName) {
    var searchParams = new URLSearchParams(location.search);
    return searchParams.get(paramName) ? searchParams.get(paramName) : -1
}
var id  = getParams('id')
console.log('id', id)
if(id !== -1){
    //编辑
    $.get("/posts/"+id,
        function (data, textStatus, jqXHR) {
            $.get("/categories",
                function (categories, textStatus, jqXHR) {
                    data.categories = categories
                    let html = template('modifyTpl', data)
                    $('#parentBox').html(html)
                },
            );

        },
    );
    $('#parentBox').on('submit', '#modifForm',function(e){
        e.preventDefault()
        let id = $(this).data('id')
        var formData = $(this).serialize()
        $.ajax({
            method: 'put',
            url: "/posts/"+id,
            data: formData,
            success: function (data, textStatus, jqXHR) {
                location.href = "./posts.html"
            }
        })
    })
}else{
    $.get("/categories",
        function (data, textStatus, jqXHR) {
            let html = template('categoryTpl', {data})
            $('#category').html(html)
        },
    );
}
// console.log('id',id)


$('#feature').change(function (e) { 
    e.preventDefault();
    let formData = new FormData()
    formData.set('thumbnail', this.files[0])
    $.ajax({
        url: '/upload',
        method: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success(response){
            console.log('response', response)
            $("#hiddenThumbnail").val(response[0].thumbnail)
        }
    })
});

$('#addForm').submit(function (e) { 
    e.preventDefault();
    var formData = $(this).serialize()
    $.post("/posts", formData,
        function (data, textStatus, jqXHR) {
            console.log('data', data)
            // location.reload()
        },
    );
});