jQuery || require('jQuery')
//1.给表单添加name-ok
//2.表单提交进行绑定-ok
//3.发送请求-ok
$('#passwordResetForm').submit(function(e){
    e.preventDefault()
    $.ajax({
        url: '/users/password',
        method: 'put',
        data: $(this).serialize(),
        success(){
            alert('修改成功')
        }
    })
})
//1:不知道