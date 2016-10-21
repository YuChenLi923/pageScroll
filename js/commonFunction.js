//处理样式表
function handleStyleTable(dom){
	var classes=dom.className,
		ary=classes.split(' '),
		ret=new Object();
		ret.remove=function(className){
				for(var i=0,len=ary.length;i<len;i++){
					if(ary[i]===className){
						ary.splice(i,1);
					}
				}
				dom.className=ary.join(' ');
		};
		ret.add=function(className){
				dom.className+=' '+className;
		};
	return ret;	
}

//向某个对象添加事件
function addEvent(Obj,e,func) {
	if(Obj.addEventListener){
		Obj.addEventListener(e,func);
	}
	else if(Obj.attachEvent){
		Obj.attachEvent('on'+e,func);
	}
	else{
		Obj['on'+e]=func;
	}//添加事件处理程序
}
//获取页面相关的大小信息
function getPageSizeInf(){
	var doc=document,
		scrollTop = window.pageYOffset|| doc.documentElement.scrollTop || doc.body.scrollTop,
		viewHeight =Math.min(doc.documentElement.scrollHeight,doc.clientHeight),
		docHeight=Math.max(doc.documentElement.scrollHeight,doc.documentElement.clientHeight),
		scrollBottom=docHeight-viewHeight-scrollTop,
		viewWidth =Math.min(doc.documentElement.scrollWidth,doc.clientWidth),
		docWidth=Math.max(doc.documentElement.scrollWidth,doc.documentElement.clientWidth);
	return {
		scrollTop:scrollTop,
		viewHeight:viewHeight,
		docHeight:docHeight,
		scrollBottom:scrollBottom,
		viewWidth:viewWidth,
		docWidth:docWidth
	};
}


//最大程度优化元素获取
function getElement(obj,select,dynamic){
	var  doc=document,
		elem=null,
		flag=select.charAt(0);
	if(flag==='#'){
		if(doc.querySelector&&dynamic==false){
			elem=obj.querySelector(select);
		}
		else{
			elem=obj.getElementById(select.slice(1));
		}
	}
	if(flag==='.'){
		if(doc.querySelectorAll&&dynamic==false){
			elem=obj.querySelectorAll(select);
		}
		else{
			if(doc.getElementsByClassName){
				elem=obj.getElementsByClassName(select.slice(1));
			}
			else{
				var AllElem=doc.getElementsByTagName('*'),
					result=[];

				for(var i=0,max=AllElem.length;i<max;i++){
					if(AllElem[i].className==select.slice(1)){
						result.push(AllElem[i]);
					}
				}
				elem=result;
			}
		}
	}
	if(flag!='.'&&select.charAt(0)!='#'){
		if(doc.querySelectorAll&&dynamic==false){
			elem=obj.querySelectorAll(select);
		}
		else{
			elem=obj.getElementsByTagName(select);
		}
	}
	return elem;
}
//创建二维空数组
function twoDimArray(len){
	var result=[];
	for(var i=0;i<len;i++){
		result.push([]);
	}
	return result;
}
//贝塞尔动画时间曲线函数，使用的时候调用其中的solve(x,epsilon)方法，参数x为当前动画执行的时间,参数eplsilon为精确度
function UnitBezier(p1x,p1y,p2x,p2y) {
		this.cx = 3.0 * p1x;
		this.bx = 3.0 * (p2x - p1x) - this.cx;
		this.ax = 1.0 - this.cx -this.bx;
		 
		this.cy = 3.0 * p1y;
		this.by = 3.0 * (p2y - p1y) - this.cy;
		this.ay = 1.0 - this.cy - this.by;//之后再研究
}
UnitBezier.prototype = {
	epsilon : 1e-2,     // 默认精度
	sampleCurveX : function(t) {//贝赛尔曲线t时刻的坐标点的X坐标
	   	return ((this.ax * t + this.bx) * t + this.cx) * t;
	},
	sampleCurveY : function(t) {
	   	return ((this.ay * t + this.by) * t + this.cy) * t;
	},
	sampleCurveDerivativeX : function(t) {//贝赛尔曲线t时刻的坐标点的Y坐标
	    return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx;
	},
	solveCurveX : function(x, epsilon) {
			var t0,
				t1,
				t2,
				x2,
				d2,
				i;

			for (t2 = x, i = 0; i < 8; i++) {
			    x2 = this.sampleCurveX(t2) - x;
			    if (Math.abs (x2) < epsilon)
			        return t2;
			    d2 = this.sampleCurveDerivativeX(t2);
			    if (Math.abs(d2) < epsilon)
			        break;
			    t2 = t2 - x2 / d2;
			}

			// No solution found - use bi-section
			t0 = 0.0;
			t1 = 1.0;
			t2 = x;

			if (t2 < t0) return t0;
			if (t2 > t1) return t1;

			while (t0 < t1) {
				x2 = this.sampleCurveX(t2);
				if (Math.abs(x2 - x) < epsilon)
					return t2;
				if (x > x2) t0 = t2;
				else t1 = t2;

				t2 = (t1 - t0) * .5 + t0;
			}

			// Give up
			return t2;
	},
	solve : function(x, epsilon) {
	   	return this.sampleCurveY( this.solveCurveX(x, epsilon) );
	}
}


//动画函数 0.1
var speedPattern={
	ease:function(curTime,startValue,endValue,duration){
		var Bezier=new UnitBezier(0.25,0.1,0.25,1);
		return  Bezier.solve(curTime/duration,UnitBezier.prototype.epsilon)*(endValue-startValue)+startValue;
	},
	linear:function(curTime,startValue,endValue,duration){
		var Bezier=new UnitBezier(0,0,1,1);
		return  Bezier.solve(curTime/duration,UnitBezier.prototype.epsilon)*(endValue-startValue)+startValue;
	},
	easeIn:function(curTime,startValue,endValue,duration){
		var Bezier=new UnitBezier(0.42,0,1,1);
		return  Bezier.solve(curTime/duration,UnitBezier.prototype.epsilon)*(endValue-startValue)+startValue;
	},
	easeOut:function(curTime,startValue,endValue,duration){
		var Bezier=new UnitBezier(0, 0, 0.58, 1);
		return  Bezier.solve(curTime/duration,UnitBezier.prototype.epsilon)*(endValue-startValue)+startValue;
	},
	easeInOut:function(curTime,startValue,endValue,duration){
		var Bezier=new UnitBezier(0.42, 0, 0.58, 1);
		return  Bezier.solve(curTime/duration,UnitBezier.prototype.epsilon)*(endValue-startValue)+startValue;
	}
}
function animate(dom){
	this.dom=dom;
	this.startTime=0;
	this.startValue=[];
	this.endValue=[];
	this.propertyName=[];
	this.unit=[];
	this.easing=null;
	this.duration=null;
	this.func=null;
}
animate.prototype.start=function(rules,duration,easing){
	this.startTime=+new Date;
	this.duration=duration;
	this.easing=speedPattern[easing];
	var self=this;
	for(var i=0,len=rules.length;i<len;i++){
		(function(t){
			var rule=rules[t].split(':');
			self.propertyName[t]=rule[0];
			if(self.unit[t]=rule[1].match(/[a-zA-Z]{1,}/)){
				self.unit[t]=rule[1].match(/[a-zA-Z]{1,}/)[0];
			}
			else{
				self.unit[t]='';
			}
			self.endValue[t]=parseInt(rule[1]);
			self.startValue[t]=parseInt(self.dom.style[self.propertyName[t]])||0;
		})(i);
	}
	var go=function(){
		var t=+new Date;
		if(t>=self.startTime+self.duration){
			for(var i=0,len=rules.length;i<len;i++){
				self.dom.style[self.propertyName[i]]=self.endValue[i]+self.unit[i];
			}
			if(self.func){
				self.func();
			}
			return false;
		}
		else{
			var cur=[];
			for(var i=0,len=rules.length;i<len;i++){
				(function(i){
					cur[i]=self.easing(t-self.startTime,self.startValue[i],self.endValue[i],self.duration);
					self.update(cur[i],self.propertyName[i],self.unit[i]);
				})(i);
			}	
			setTimeout(function(){
				go();
			},13);
		}
	};
	go();
}
animate.prototype.update=function(cur,propertyName,unit){
	this.dom.style[propertyName]=cur+unit;
}
animate.prototype.callback=function(func){
	this.func=func;
};

