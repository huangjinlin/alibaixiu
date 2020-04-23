jQuery || require('jquery')
//1.获取所有轮播的数据
//2.模板
$.get("/slides",
    function (data, textStatus, jqXHR) {
        let html = template('slidesTpl', {data})  
        $('#swipeBox').html(html)
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function (index) {
              // index++;
      
              $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
          });
      
          // 上/下一张
          $('.swipe .arrow').on('click', function () {
            var _this = $(this);
      
            if(_this.is('.prev')) {
              swiper.prev();
            } else if(_this.is('.next')) {
              swiper.next();
            }
          })
    },
);

//1.获取数据
//2.写模板,拼接
$.get("/posts/recommend",
    function (data, textStatus, jqXHR) {
        let html = template('recommendTpl', {data})    
        $('#recommendBox').html(html) 
    },
);
function formateDate(date) {
	// 将日期时间字符串转换成日期对象
	date = new Date(date);
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}
//1.获取数据
//2.写模板,拼接
$.get("/posts/lasted",
    function (data, textStatus, jqXHR) {
        let html = template('lastedTpl', {data})
        $('#lastedBox').html(html)
    }
);