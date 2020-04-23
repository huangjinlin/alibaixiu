jQuery || require('jquery')

$('#logoutBtn').click(function (e) { 
    e.preventDefault();
    if(confirm('确定退出?')){
      $.post("/logout",
        function (data, textStatus, jqXHR) {
          location.href = "./login.html"
        },
      );
    }
  });

//1.获取数据
//   通过用户的id或者数据
//   用户的id在哪里?
//   userId哪里定义
//2.修改用户头像,和名称
    // 1:用的是模板
    // 2:jquery api
$.get("/users/"+userId,
    function (data, textStatus, jqXHR) {
        console.log('data', data)   
        $('.profile .avatar').attr('src', data.avatar)
        $('.profile .name').text(data.nickName)
    }
);
