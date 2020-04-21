//有没有办法,在js里面有jquery的代码提升(vscode提示,不是扩展的提示)
jQuery || require('jquery')
$('#userForm').submit(function (e) { 
    e.preventDefault();
    let formData = $(this).serialize()//username=123&age=123
    $.post("/users", formData,
        function (data, textStatus, jqXHR) {
            location.reload()
        },
    );
});

//1.上传头像-ok
//2.上传头像的结果(头像图片路径)放到隐藏域-ok
//    新增用户把字段上传
$('#modifyBox').on('change', '#avatar',function (e) { 
    e.preventDefault();
    var formData = new FormData()
    formData.append('avatar', this.files[0])
    $.ajax({
        url: '/upload',
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success(response){
            console.log('response', response)
            $('#hiddenAvatar').val(response[0].avatar)
            $('#previewAvatar').attr('src', response[0].avatar)
        }
    })
})

//1.获取列表数据-ok
//2.数据和模板进行拼接,写模板
$.get("/users",
    function (data, textStatus, jqXHR) {
        let html = template('userTpl', {data})
        $('#userBox').html(html)
    },
);

$('#userBox').on('click','.edit', function () {
    let id = $(this).data('id');
    $.get("/users/"+id,
        function (data, textStatus, jqXHR) {
            console.log(data)
            let html = template('modifyTpl', data)
            $('#modifyBox').html(html)
        },
    );
});

$('#userBox').on('click','.delete', function (e) {
    e.preventDefault()
    let id = $(this).data('id');
    $.ajax({
        type: "delete",
        url: "/users/"+id,
        success: function (response) {
            location.reload()   
        }
    });
});

var selectAll = $('#selectAll')
var deleteMany = $('#deleteMany')
selectAll.change(function (e) { 
    var checked = $(this).prop('checked')
    if(checked){
        deleteMany.show()
    }else{
        deleteMany.hide()
    }
    $('#userBox input').prop('checked', checked)
});

$('#userBox').on('change', 'input', function(){
    if($('#userBox input:checked').length > 0){
        deleteMany.show()
    }else{
        deleteMany.hide()
    }
    selectAll.prop('checked', $('#userBox input:checked').length == $('#userBox input').length)
})
deleteMany.click(function(){
    let ids = []
    $("#userBox input:checked").each(function(){
        let id = $(this).data('id')
        ids.push(id)
    })
    $.ajax({
        type: "delete",
        url: "/users/"+ids.join('-'),
        success: function (response) {
            location.reload()
        }
    });
})


$('#modifyBox').on('submit', '#modifyForm', function (e) {
    e.preventDefault()
    console.log('submit')   
    var id = $(this).data('id');
    var formData = $(this).serialize()
    $.ajax({
        type: "put",
        url: "/users/"+id,
        data: formData,
        success: function (response) {
            location.reload()
        }
    });
});