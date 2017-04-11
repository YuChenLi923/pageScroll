## pageScroll

这是一个基于JS编写的轻量级的用于生成简单的页面滚动展示效果的库，当前版本0.5.2


## 快速开始

## 引入必要文件

引入pageScroll.js和pageScroll.css文件


### 编写html

``` html

<div id='warp'>
	<div id='pages'>
		<!-- 页面1 -->
		<div id='page1' class='page'>
			<!-- 页面1内容 -->
		</div>
		<!-- 页面2 -->
		<div id='page2' class='page'>
			<!-- 页面1内容 -->
		</div>
		<!-- 页面3 -->
		<div id='page3' class='page'>
			<!-- 页面3内容 -->
		</div>
	</div>
</div>

```

您的HTML的结构必须向上面这样外层由下面示例的代码所包裹

```
<div id='warp'>
	<div id='pages'>
	</div>
</div>	

```

然后你可以在<div id='pages'></div>标签内部添加各个页面，就像上面那样。
至于页面具体的样式完全取决于你自己的发挥了。

### 调用pageScroll函数

在完成HTML之后，就可以在JS中调用pageScroll()函数。

``` js

window.onload=function(){
	PageScroll(
		{
			id:'warp',
			num:4,
			direction:['top','left'],
			time:800,
		    easing:'linear',
			style:[1,3,2,1],
			loop:true,
			start:2,
			control:['mousewheel','keyboard','nav']		
		}
	);
}

```

### pageScroll([object])接口的参数说明：

#### [object]

- id 字符串

页面外层包裹,如果是示例则为'warp'

- num 

数字,页面的数量

- direction

 数组,页面跳转动画的方向，示例['left'],目前可添加的参数:left-水平方向,top-垂直方向,也可以组合使用，如：['left','top']。在style为2的时候该属性无效。

- style 

字符串,所有页面跳转动画的风格,1-普通模式，2-中间冒出，3-两边冒出
数组,指定页面的跳转风格。例如:[1,2,3],那么第一个页面是风格1，第二个页面是风格2，第三页面是风格3

- loop 

布尔值,是否开启循环

- start 

数字,初始页面的位置,从1开始

- control

数组，数组中元素可选:'mousewheel'(鼠标滚轮),'keyboard'(键盘),'nav'(导航栏)

- easing 

页面跳转动画的速度曲线 ,可选择 

字符串-'linear'、'ease'、'easeIn'、'easeOut'、'easeInOut'

数组-必须为4个数字,前两个数字代表贝塞尔曲线的P1点，后两个数字代表P2点。例如:0.42,0.12,0.23,0.18

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

#### 动画字体的属性

自定义的动画字体属性需要在上述例子的<a>标签中添加，否则无效，目前的自定义属性有：

- font-pattern(必须)  

数字，1-滑动出现，2-淡入，3-淡入滑动，4-字体整体滑动

- font-direction(可选) 

字符串，vertical-垂直方向,horizontal(默认)-水平方向

- font-time(可选) 

数字，字体动画播放的时间，单位ms，默认800ms

- font-timePattern(可选) 

字体动画的速度曲线 ,可选择 

字符串-'linear'(默认)、'ease'、'easeIn'、'easeOut'、'easeInOut'

数组-必须为4个数字,前两个数字代表贝塞尔曲线的P1点，后两个数字代表P2点。例如:0.42,0.12,0.23,0.18
 	
- pri 数字，当前页面字体动画播放的优先级，默认为0

动画字体的排版

您只需要对外层含有class为'warp'的div设置样式即可。

## 兼容性

支持Firefox、Chromn、opera、IE 6+

## 更新历史

0.0.1
- 增加页面滚动功能

0.1.0
- 完善页面滚动功能
- 解决滚动不流畅的问题
- 增加了贝塞尔曲线用来调控动画的速度变化

0.2.0

- 增加页面滚动方向
- 增加鼠标控制事件
- 优化了代码结构

0.3.0

- 增加了几种简单的字体效果


0.3.1

- 修复动画字体排版问题
- 增加动画字体播放动画效果的优先级属性pri
- 修复导航栏失效问题

0.4.0

- 新增两种字体效果
- 优化代码结构
- 增加页面速度曲线的接口
- 增加动画字体，动画时间(font-time)和动画时间曲线(font-timePattern)的属性

0.5.0

- 增加了字体动画的默认值，防止出现报错
- 增加了2种页面跳转的模式
- 修复font-pattern=4时重复字体动画导致的位置叠加问题

0.5.1

- 修复加载时期字体动画产生的bug
- 删除了nav接口，要添加nav(导航栏)只要control属性的数组中添加'nav'即可

0.5.2

- 调整项目目录结构
- 修复IE 8 ~ 6 不兼容问题
- 增加PageScroll([object]) 中style属性对数组的支持。

