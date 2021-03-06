//pageScroll.js 0.5.2 by chen on 2017-4-11
//github:https://github.com/liyc1996/pageScroll
function PageScroll(data){
	var doc=document,
		num=data.num,
		direction=data.direction,
		time=data.time,
		style=data.style,
		index=data.start,
		animation=true,
		ul=null,
		loop=data.loop,
		control=data.control,
		start=data.start,
		time=data.time,
		easing=data.easing,
		warp=doc.getElementById('warp'),
		height=getPageSizeInf().docHeight,
		width=getPageSizeInf().docWidth,
		page=getElementByClass('page'),
		fontDir={'horizontal':'width','vertical':'height'},
		pageAnimate=new animate();
	//页面初始化
	function init(start){
		var cur=page[start-1],
			curPClass=handleStyleTable(cur);
		curPClass.add('cur');
		curPClass=null;
		fontAnimation(cur);
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
	//页面切换模式
	var pagePattern=[
		function(gap,nextPStyle){
			for(var i=0,dir;dir=direction[i];i++){
				if(dir==='top')
					nextPStyle[dir]=(gap>0?height:-height)+'px';
				else if(dir === 'left'){
					nextPStyle[dir]=(gap>0?width:-width)+'px';
				}
			}
			return [
				'opacity:1',
				'top:0px',
				'left:0px'
			];
		},
		function(gap,nextPStyle){
			nextPStyle['width']=0;
			nextPStyle['height']=0;
			nextPStyle['left']='50%';
			nextPStyle['top']='50%';
			return [
				'opacity:1',
				'width:'+width+'px',
				'height:'+height+'px',
				'top:0%',
				'left:0%'
			];
		},
		function(gap,nextPStyle){
			var dir=direction;
			if(dir.length==1){
				if(dir[0]=='top'){
					nextPStyle['left']='50%';
					if(gap<0){
						nextPStyle['top']='100%';
					}	
				}
				if(dir[0]=='left'){
					nextPStyle['top']='50%';
					if(gap<0){
						nextPStyle['left']='100%';
					}		
				}
			}
			else{
				nextPStyle['top']='50%';
				 if(gap<0){
					nextPStyle['top']='100%';
				}	
			}	
			nextPStyle['width']=0;
			nextPStyle['height']=0;
			
			return [
				'opacity:1',
				'width:'+width+'px',
				'height:'+height+'px',
				'left:0%',
				'top:0%'
			];
		}
	];
	//页面滚动效果
	function pageScrollAnimation(from,to){
		animation=false;
		var gap=to-from,
			curP=page[from-1],
			nextP=page[to-1],
			nextPStyle=nextP.style,
		 	nextPClass=handleStyleTable(nextP),
		 	curPClass=handleStyleTable(curP);
		nextPClass.add('slide');
		pageAnimate.init(nextP);
		fontAnimation(nextP);
		pageAnimate.callback(function(){
			nextPClass.remove('slide');
			nextPClass.add('cur');
			curPClass.remove('cur');
			animation=true;
			curNav(num,index);
			nextPClass=curPClass=null;
		});
		if(Object.prototype.toString.call(style) == '[object Array]'){
			console.log(style[to-1]);
            pageAnimate.pattern=pagePattern[style[to-1]-1](gap,nextPStyle);
		}else{
			console.log(Object.prototype.toString(style));
            pageAnimate.pattern=pagePattern[style-1](gap,nextPStyle);
		}
		pageAnimate.start(pageAnimate.pattern,time,easing);
	}  
	//字体模式
	var fontPattern=[
		//1-普通模式
		function(font,curElem){
			font.curElem.style.cssText='display:block';
			font.warp.style.width=font.width+'px';
			font.font.style.width=font.width+'px';
			font.font.parentNode.style[font.direction]=0;
			font.animate.init(curElem);	
			font.animate.callback(function(args){
				this.dom.style.width=args[0]+'px';
			},font.width);
			return [font.direction+':'+font.dis+'px'];
		},
		//2-淡入淡出模式
		function(font,curElem){
			font.curElem.style.cssText='display:block';
			font.warp.style.width=font.width+'px';
			font.font.style.width=font.width+'px';
			font.font.parentNode.style.opacity=0;
			font.animate.init(curElem);
			font.animate.callback(function(args){
				this.dom.style.width=args[0]+'px';
			},font.width);
			return [
				'opacity:1'
			]
		},
		//3-淡入淡出+普通模式
		function(font,curElem){
			font.curElem.style.cssText='display:block';
			font.warp.style.width=font.width+'px';
			font.font.style.width=font.width+'px';
			font.font.parentNode.style[font.direction]=0;
			font.font.parentNode.style.opacity=0;
			font.animate.init(curElem);
			font.animate.callback(function(args){
					this.dom.style.width=args[0]+'px';
			},font.width);
			return [
				font.direction+':'+font.dis+'px',
				'opacity:1'
			]
		},
		//4-整体滑动模式
		function(font,curElem){
			font.curElem.style.cssText='display:block';
			font.warp.style.width=font.width+'px';
			font.font.style.width=font.width+'px';
			font.warp.style.marginTop=parseInt(font.warp.offsetTop)-100+'px';
			font.animate.init(font.warp);
			font.animate.callback(function(args){
					this.dom.style.width=args[0]+'px';
				},font.width);
			return [
				'marginTop:'+ (100+parseInt(font.warp.style.marginTop)) +'px',
				'opacity:1'
			]
		},
		//5-滑动回荡模式
		function(font,curElem){
			font.curElem.style.cssText='display:block';
			font.warp.style.width=font.width+'px';
			font.font.style.width=font.width+'px';
			font.warp.style.marginTop=parseInt(font.warp.offsetTop)-100+'px';
			font.animate.init(font.warp);
			font.animate.callback(function(args){
					this.dom.style.width=args[0]+'px';
					font.animate.start(
						[
							'marginTop:'+ (parseInt(font.warp.style.marginTop)-40) +'px'	
						]
					,font.time,font.timePattern);
					font.animate.callback(null);
				},font.width);
			return [
				'marginTop:'+ (140+parseInt(font.warp.style.marginTop)) +'px',
				'opacity:1'
			]
		}
	];
	function fontObj(pattern,curElem){
		this.curElem=curElem;
		this.pattern=parseInt(curElem.getAttribute('font-pattern')||0);
		this.time=parseInt(curElem.getAttribute('font-time'))||800;
		this.timePattern=curElem.getAttribute('font-timePattern')||'linear';
		this.direction=fontDir[curElem.getAttribute('font-direction')||'horizontal'];
		this.font=curElem.children[0];
		this.width=this.font.offsetWidth+5;
		this.height=this.font.offsetHeight;
		this.animate=new animate();
		this.pri=parseInt(curElem.getAttribute('pri')||0);
		this.warp=curElem.parentNode;
		this.dis=this.direction=='width'?this.width:this.height;
		this.patternString=null;
	}
	//字体动画效果
	function fontAnimation(page){
		var elems=page.getElementsByTagName('*'),
			stack=[],
			timer,
			args,
			Time=time;
		for(var i=0,len=elems.length;i<len;i++){
			var pattern=parseInt(elems[i].getAttribute('font-pattern')),
				fontClass=handleStyleTable(elems[i]);
			if(pattern){
				var curElem=elems[i],
					fontAnimateObj=new fontObj(pattern,curElem);
				fontAnimateObj.curElem.style.cssText='display:none';
				stack.push(fontAnimateObj);
			}
		}
		if(stack.length>0){
			stack.sort(function(){
				if(arguments[0].pri>arguments[1].pri){
					return -1;
				}
				if(arguments[0].pri==arguments[1].pri){
					return 0;
				}
				else{
					return 1;
				}
			});
			setTimeout(function(){
				timer=setInterval(function(){
					var args=[],
						Time=10;
					while(1){
							if(args.length==0||(stack.length>0&&args[args.length-1].pri===stack[0].pri)){
								args.push(stack.shift());
							}
							else if(stack.length>0){
								break;
							}
							else if(stack.length===0){
								clearInterval(timer);
								timer=null;
								break;
							}
					}
					for(var i=0,len=args.length;i<len;i++){
						args[i].patternString=fontPattern[(args[i].pattern-1)||0](args[i],args[i].curElem)
						args[i].animate.start(args[i].patternString,args[i].time,args[i].timePattern);
					}
					args.length=0;
				},800);
			},time-800>0?time-800:0);
		}
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
			if(toIndex!=index){
				if(animation){
						scroll(toIndex-index);
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
		},
		nav:function(){
			createNav(num);
			curNav(num,start);
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
		init(index);
		setTimeout(function(){
			addControl(control);
		},time)
	})();
}
