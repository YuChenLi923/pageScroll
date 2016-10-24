这个一个用纯JS编写的页面滚动的小demo，当前版本0.5


## 使用说明
引入pageScroll.js和pageScroll.css文件


### html结构代码示例：

``` html
<div id='warp'>
	<div id='pages'>
		<div id='page1' class='page' ></div>
		<div id='page2' class='page'></div>
		<div id='page3' class='page'></div>
	</div>
</div>

```

### pageScroll.js接口的参数说明：

- id 字符串,页面外层包裹,如果是示例则为'warp'
- num 数字,页面的数量
- direction 数组,页面跳转动画的方向，示例['left'],目前可添加的参数:left-水平方向,top-垂直方向,也可以组合使用，如：['left','top']
- style 字符串,页面跳转动画的风格,目前只有'normal'可以使用
- nav 布尔值,是否开启导航栏
- loop 布尔值,是否开启循环
- start 数字,初始页面的位置,从1开始
- control 数组，数组中元素可选:'mousewheel'(鼠标滚轮),'keyboard'(键盘)

###　字体动画效果的添加

添加字体效果的示例

``` html

<div class='warp'>
	<a id='title' class='font_warp' font-pattern=2 font-direction='vertical' pri=1>
		 <h2  class='font'>DEMO展示</h2>
	</a>
</div>
```

您只需要向上面这样，为某个包裹文本的标签添加 font 样式，并将它包裹在 a 标签中(当然其他类似的也行)然后为这个标签添加样式:font_warp，并设置属性font-pattern和font-direction,并在最顶层添加一个class为'warp'的div(其他类似的标签也行)。

动画字体的属性
- font-pattern  数字，1-普通字体效果，2-淡入淡出
- font-direction 字符串，vertical-垂直方向,horizontal-水平方向
- pri 数字，当前页面字体动画播放的优先级。

动画字体的排版

您只需要对外层含有class为'warp'的div设置样式即可。

## 更新历史
0.1
- 增加页面滚动功能

0.2
- 完善页面滚动功能
- 解决滚动不流畅的问题
- 增加了贝塞尔曲线用来调控动画的速度变化

0.3

- 增加页面滚动方向
- 增加鼠标控制事件
- 优化了代码结构

0.4

- 增加了几种简单的字体效果


0.5

- 修复动画字体排版问题
- 增加动画字体播放动画效果的优先级属性pri
