/**
 * id: input id' ,
 * setting:ztree 配置 setting
 * zNodes:ztree 节点 zNodes
 * 
 * */

layui.config({
  base: '../../' //配置 layui 第三方扩展组件存放的基础目录
}).extend({
  ztree: 'ztree/ztree' 
}).define(['ztree','jquery'],function(exports){
	let ztree = layui.ztree,$ = layui.jquery;
	let map = {},
	p1="_itree_input",
	p2 = "_itree_div",
	p3="_itree";
	
	let mod = {
		render:function(config){
			   let itree = new iTree(config);
			   this.itree = itree;
			   map[config.id] = itree;
			   return mod;
		},
		showTree(){
			this.itree.showMenu();
		},
		hideTree(){
			this.itree.hideMenu();
		},
		setValue(ids,names){
			let elements = this.itree.elements;
			document.getElementById(elements["id"]).value = ids;
			document.getElementById(elements["_itree_input"]).value = names;
		},
		getValue(){
			return document.getElementById(this.itree.elements["id"]).value;
		},
		getNames(){
			return document.getElementById(this.itree.elements["_itree_input"]).value;
		}
	}
	class iTree{
		constructor(config){
			let that = this,c = new Class(config);
			that.elements = c.elements;
			//初始化事件
			that.init_events();
			that.zTreeObj = ztree.render(that.elements[p3], config.setting, config.zNodes);	
		}
		init_events(){
			let that = this;
			// 页面大小发生变化
			$(window ).on('resize',{that:that},function(){
				that.reSize();
			});
			// input
			let ii = document.getElementById(that.elements[p1]);
			$(ii).on("click",{that:that},function(){
				that.menuClick()
			});
		}
		menuClick(){
			let that = this;
			var display = document.getElementById(that.elements[p2]).style.display;
			if(display == "none" || display == "") {
				that.showMenu();
			} else {
				that.hideMenu();
			}
		}
		showMenu(){
			let that = this;
			$("#"+that.elements[p2]).slideDown("fast");
			$("body").bind("mousedown",{that:that},function(event,type){
				that.onBodyDown(event,that);
			});
		}
		hideMenu(){
			let that = this;
			$("#"+that.elements[p2]).fadeOut("fast");
			$("body").unbind("mousedown", {that:that},function(event,type){
				that.onBodyDown(event,that);
			});
		}
		reSize(){
			let that = this;
			let width = document.getElementById(that.elements[p1]).offsetWidth-3;
			$("#"+that.elements[p2]).css({width: width});
		}
		onBodyDown(event,that){
			let t = document.getElementById(that.elements[p2]);
			console.log()
			if(!t.contains(event.target)) {
				that.hideMenu();
			}
		}
	}
	class Class{
		constructor(config){
			this.build_elements(config);
		}
		
		build_elements(config){
			let id = config.id;
			let that = this;
			let ele = document.getElementById(id);
			if(ele==null){
				console.error("不存在元素id="+id);
			}
			ele.style.display = "none";
			that.elements={};
			that.elements["id"] = id;
			that.elements[p1] = id+p1;
			that.elements[p2] = id+p2;
			that.elements[p3] = id+p3;
			let html = this.build_html(that.elements,config);
			
			let span = document.createElement("span");
			span.innerHTML = html;
			ele.parentElement.append(span);
		}
		build_html(elements,config){
			let btnHtml=this.build_header(config);
			let html = `<input id="${elements[p1]}"  class="layui-input" placeholder="-" type="text" readonly/>
				<div id="${elements[p2]}" class="itreeContent">
					<div class="itree">
						${btnHtml}
						<ul id="${elements[p3]}" class="ztree">
						</ul>
					</div>
				</div>`;
		 	return html;
		}
		
		build_header(config){
			let html = config.headHtml;
			if(html==undefined) return "";
			return html;
		}
	}
	
	function onload(){
		let s = document.createElement('style');
		s.innerHTML=`
			.itreeContent {
				display: none;
				position: absolute;
				width: 100%;
			}
			
			.itree {
				margin-top: 0;
				width: 100%;
				position: absolute;
				z-index: 100;
				background-color: white;
				border: 1px solid #D8E2E9;
			}
			
			.itree>i {
				font-size: 20px;
				color: #c2c2c2;
				margin-left: 5px;
			}
			
			.itree>i>span {
				font-size: 15px;
				margin-left: 3px;
			}`;
		document.body.appendChild(s)
	}
	onload();
	exports('itree', mod);
});
