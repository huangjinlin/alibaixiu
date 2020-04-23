jQuery || require('jquery')

//1.图片上传-ok
//2.提交表单
// 添加name-ok
// 绑定事件-ok
// 发送请求-ok

$('#image').change(function (e) { 
    e.preventDefault();
    let formData = new FormData()
    formData.set('avatar',this.files[0])
    $.ajax({
        url: '/upload',
        method: 'post',
        data: formData,
        processData: false,
        contentType: false,
        success(response){
            let avatar = response[0].avatar
            $('#hiddenImage').val(avatar)
        }
    })
    
});

$('#addForm').submit(function (e) { 
    e.preventDefault();
    var formData = $(this).serialize()
    $.post("/slides", formData,
        function (data, textStatus, jqXHR) {
            location.reload()
        },
    );
});

//1.获取数据-ok
//2.写模板
$.get("/slides",
    function (data, textStatus, jqXHR) {
        console.log('data', data)
        let html = template('slidesTpl', {data})
        $('#slidesBox').html(html)
    },
);

$('#slidesBox').on('click','.delete', function () {
    let id = $(this).data('id');
    $.ajax({
        url:'/slides/'+id,
        method:'delete',
        success(){
            location.reload()
        }
    })
});