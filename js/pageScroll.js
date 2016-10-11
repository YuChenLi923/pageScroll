(function PageScroll(data){
	var doc=document,
		id=data.id,
		num=data.num,
		direction=data.direction,
		time=data.time,
		style=data.style,
		index=1,
		animation=true,
		pages=doc.getElementById('warp').firstElementChild||doc.getElementById('warp').childNodes[1],
		height=getPageSizeInf().docHeight;
		speed=height/(100*time),
		page=getElement(pages,'.page',false);
		for(var i=0,len=page.length;i<len;i++){
			page[i].style.height=height+'px';
		}
		// console.log(pages);
		if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
			addEvent(doc,'DOMMouseScroll',function(e){
				scrollEvent(e);
			});
		}
		else{
			addEvent(doc,'mousewheel',function(e){
				scrollEvent(e);

			});
		}
		addEvent(window,'resize',function(e){
			return false;
		})
	function scrollEvent(e){
		var e=e || window.event;
		//向下滚动
		if(e.wheelDelta<0||e.detail>0){
			if(animation&&index<num){
				scrollAnimation(1);
			}
		}
		//向上滚动
		if(e.wheelDelta>0||e.detail<0){
			if(animation&&index>1){
				scrollAnimation(-1);
			}
		}
		if (e.preventDefault) {
			e.preventDefault();
		} 
		else {
			e.returnValue = false;
		}
	}
	function scrollAnimation(flag){
		animation=false;
		var cur=Math.abs(pages.offsetTop),
			pre=cur;
		if(flag===1&&index<num){
			++index;
		}
		else if(flag===-1&&index>1){
			--index;
		}
		var go=function(){
			if(Math.abs(cur-pre)<height){
				cur=cur+speed*flag;
				pages.style.marginTop=-1*cur+'px';
				setTimeout(go,10);
			}
			else{
				pages.style.marginTop=-1*(pre+height*flag)+'px';
				cur=pre+height*flag;
				animation=true;
			}
		}
		go();
	}

})(
	{
		id:'warp',
		num:5,
		direction:'vertical',
		time:1,
		style:'normal'
	}
);