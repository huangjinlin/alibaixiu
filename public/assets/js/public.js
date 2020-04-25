function formateDate(date) {
	// 将日期时间字符串转换成日期对象
	date = new Date(date);
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}


var randomTpl = `
{{each data}}
	<li>
	<a href="detail.html?id={{$value._id}}">
	<p class="title">{{$value.title}}</p>
	<p class="reading">阅读({{$value.meta.views}})</p>
	<div class="pic">
		<img src="{{$value.thumbnail}}" alt="">
	</div>
	</a>
	</li>
{{/each}}
`
$.get("/posts/random",
	function (data, textStatus, jqXHR) {
		let html = template.render(randomTpl, {data})
		$('#randomBox').html(html)
	},
);

var commentsTpl = `
{{each data}}
	<li>
	<a href="javascript:;">
	<div class="avatar">
		<img src="{{$value.author.avatar}}" alt="">
	</div>
	<div class="txt">
		<p>
		<span>{{$value.author.nickName}}</span>{{$value.createTime}}说:
		</p>
		<p>{{$value.content}}</p>
	</div>
	</a>
	</li>
{{/each}}
`
$.get("/comments/lasted",
	function (data, textStatus, jqXHR) {
		let html = template.render(commentsTpl, {data})
		$('#commentsBox').html(html)
	},
	);
	
//1.获取数据
//2.模板
var navTpl = `
{{each data}}
<li><a href="list.html?id={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
{{/each}}
`
$.get("/categories",
	function (data, textStatus, jqXHR) {
		console.log('data',data)
		let html = template.render(navTpl, {data})
		$('#topnavBox').html(html)
		$('#navBox').html(html)	
	}
);