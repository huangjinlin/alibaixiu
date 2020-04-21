jQuery || require('jquery')
$.get("/categories",
    function (data, textStatus, jqXHR) {
        let html = template('categoryTpl', {data})
        $('#category').html(html)
    },
);

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