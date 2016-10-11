//向某个对象添加事件
function addEvent(Obj,e,func) {
	if(Obj.addEventListener){
		console.log(e);
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
		scrollBottom=docHeight-viewHeight-scrollTop;
	return {
		scrollTop:scrollTop,
		viewHeight:viewHeight,
		docHeight:docHeight,
		scrollBottom:scrollBottom
	};
}

//创建XMLHttpRequest对象，简称xhr对象
function creatXHR(){
	if(typeof XMLHttpRequest == 'undefined')
		XMLHttpRequest=function(){
			try{return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
			catch(e){}
			try{return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
			catch(e){}
			try{return new ActiveXObject("Msxml2.XMLHTTP");}
			catch(e){}
			return false;
		}
		return new XMLHttpRequest();
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

