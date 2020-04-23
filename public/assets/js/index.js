jQuery || require('jquery')

$.get("/posts/count",
    function (data, textStatus, jqXHR) {
        console.log('data', data)
        $('#postCount').text(data.postCount)
        $('#draftCount').text(data.draftCount);
    },
);

$.get("/categories/count",
    function (data, textStatus, jqXHR) {
        $('#categoryCount').text(data.categoryCount)
    },
);

$.get("/comments/count",
    function (data, textStatus, jqXHR) {
        $('#commentCount').text(data.commentCount)
    },
);