jQuery || require('jquery')

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
var id  = getParams('id')
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
console.log('id',id)


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