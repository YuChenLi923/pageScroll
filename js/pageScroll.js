(function PageScroll(data){
	var doc=document,
		id=data.id,
		num=data.num,
		direction=data.direction,
		time=data.time,
		style=data.style,
		nav=data.nav,
		index=data.start,
		animation=true,
		ul=null,
		loop=data.loop,
		control=data.control,
		start=data.start,
		time=data.time,
		warp=doc.getElementById('warp'),
		pages=warp.firstElementChild||doc.getElementById('warp').childNodes[1],
		height=getPageSizeInf().docHeight,
		width=getPageSizeInf().docWidth,
		speed=height/(100*time),
		page=getElement(pages,'.page',false),
		cssText=twoDimArray(num);
	//页面初始化
	function init(start){
		curNav(num,start);
		var curPClass=handleStyleTable(page[start-1]);
		curPClass.add('cur');
		curPClass=null;
	}
	//处理页面滚动的起始位置
	function scroll(flag){
		var from;
		if(animation&&(loop||(index<=num&&index>=1))){
			if(loop||(index+flag<=num&&index+flag>=1)){
				from=index;
				if(index+flag>num){
					index=1;
				}
				else if(index+flag<1){
					index=num;
				}
				else{
					index=index+flag;
				}
				pageScrollAnimation(from,index);
			}
		}
	}
	//鼠标滚轮事件处理程序
	function wheelEvent(e){
		var e=e || window.event,
			flag;
		//1-向下滚动,-1-向上滚动
			flag=e.wheelDelta<0||e.detail>0?1:-1;
			scroll(flag);
		if (e.preventDefault) {
			e.preventDefault();
		} 
		else {
			e.returnValue = false;
		}
	}
	//键盘按键事件处理程序
	function keyEvent(e){
		var e=e||window.event,
			keyCode=e.keyCode,
			flag;
		if(keyCode===38){
				flag=-1;
				scroll(flag);
			}
		if(keyCode===40){
				flag=1;
				scroll(flag);
		}
	}

	//页面滚动效果
	function pageScrollAnimation(from,to){
		animation=false;
		var gap=to-from,
			curP=page[from-1],
			nextP=page[to-1],
			nextPStyle=nextP.style;
		for(var i=0,dir;dir=direction[i];i++){
			if(dir==='top')
				nextPStyle[dir]=(gap>0?height:-height)+'px';
			else{
				nextPStyle[dir]=(gap>0?width:-width)+'px';
			}
		}
		var nextPClass=handleStyleTable(nextP);
		var curPClass=handleStyleTable(curP);
		nextPClass.add('slide');
		var nextPAnimate=new animate(nextP);
		nextPAnimate.callback(function(){
			nextPClass.remove('slide');
			nextPClass.add('cur');
			curPClass.remove('cur');
			animation=true;
			curNav(num,index);
			nextPClass=curPClass=null;
		});	
		nextPAnimate.start([
			'opacity:1',
			'top:0px',
			'left:0px'
		],time,'linear');
	}  

	//设置当前页对应的导航按钮样式
	function curNav(num,index){
		var li=ul.getElementsByTagName('li');
		for(var i=0;i<num;i++){
			li[i].className='';
			if(i===index-1){
				li[i].className='cur';
			}
		}
	}
	//创建导航栏
	function createNav(num){
		ul=document.createElement('ul');
		ul.id='nav';
		for(var i=0;i<num;i++){
			var li=document.createElement('li');
			li.setAttribute('data-index',i+1);
			if(i===index-1){
				li.className='cur';
			}
			ul.appendChild(li);
		}
		warp.appendChild(ul);
		addEvent(ul,'click',function(e){
			var e=e||window.event,
				target=e.target||e.srcElement,
				toIndex=target.getAttribute('data-index');
			if(toIndex){
				if(animation){
					if(toIndex-index>0){
						scrollAnimation(height*(toIndex-index),1);
					}
					else if(toIndex-index<0){
						scrollAnimation(height*(index-toIndex),-1);
					}
					index=toIndex;
				}
			}
		});
	}
	//定义控制器
	var controls={
		mousewheel:function(){
			if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
				addEvent(doc,'DOMMouseScroll',function(e){
					wheelEvent(e);
				});
			}
			else{
				addEvent(doc,'mousewheel',function(e){
					wheelEvent(e);
				});
			}
		},
		keyboard:function(){
			addEvent(doc,'keydown',function(e){
				keyEvent(e);
			});
		}

	}
	//添加控制器
	function addControl(control){
		for(var i=0,len=control.length;i<len;i++){
			controls[control[i]]();
		}
		addEvent(window,'resize',function(){
			height=getPageSizeInf().docHeight;
			width=getPageSizeInf().docWidth;
		});
	}

	return (function(){
		if(nav){
			createNav(num);
		}
		init(index);
		addControl(control);
	})();
})(
	{
		id:'warp',//页面的外层包裹
		num:5,//页面数量
		direction:['left','top'],//页面跳转的方向 top-垂直，left -水平
		time:800,//页面跳转的时间，单位为ms
		style:'normal',//页面跳转的风格 
		nav:true,//是否开启导航栏
		loop:true,//是否开启循环页面
		start:1,//初始页面的位置
		control:['mousewheel','keyboard']//'mousewheel-鼠标滚轮,keyboard-键盘方向键
	}
);
