jQuery || require('jquery')



$.get("/settings",
    function (data, textStatus, jqXHR) {
        let html = template('settingsTpl', data)
        $('#settingsBox').html(html)

        //上传网站图片
        $('#logo').change(function (e) { 
            e.preventDefault();
            var formData = new FormData()
            formData.append('avatar', this.files[0])
            $.ajax({
                url: '/upload',
                method: 'post',
                data: formData,
                processData: false,
                contentType: false,
                success(response){
                    var avatar = response[0].avatar
                    $('#site_logo').val(avatar)
                }
            })
        });
        //表单提交
        //1.输入元素的name-ok
        //2.绑定事件-ok
        //3.发送请求-ok
        $('#settingsForm').submit(function (e) { 
            e.preventDefault();
            //checkbox->on true, false
            //1不知道,笨办法,聪明的方法(晚自习7:30)
            var formData = $(this).serialize()
            //1方式1
            /*
            $.post("/settings", {
                title: $('#site_name').val(),
                description: $('#site_description').val(),
                keywords: $('#site_keywords').val(),
                comment: $('#comment_status').prop('checked'),
                review: $('#comment_reviewed').prop('checked')
            },function (data, textStatus, jqXHR) {
                    console.log('data', data)   
                }
            );
            */
        $.post("/settings",formData ,function (data, textStatus, jqXHR) {
                    console.log('data', data)   
                }
            );
        });

    }
);