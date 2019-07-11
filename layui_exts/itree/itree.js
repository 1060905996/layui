layui.config({
  base: '../../' //配置 layui 第三方扩展组件存放的基础目录
}).extend({
  ztree: 'ztree/ztree' 
}).define(['ztree','jquery'],function(exports){
	let ztree = layui.ztree,$ = layui.jquery;
	let map = {},
	itreeInput="_itree_input",
	itreeDiv = "_itree_div",
	itreeContentDiv="_itree_content_div",
	ztreeId="_itree";
	let _config = {
		id :"id",
		setting:"ztree配置",
		zNodes:"ztree 节点",
		btns:"显示在头部的按钮,可以做功能扩展[{id,icon,text,title}]",
	}
	let mod = {
		render:function(config){
			   let iztree = new iZtree(config);
		},
	}
	class iZtree{
		constructor(config){
			let that = this,c = new Class(config);
			that.elements = c.elements;
			//初始化事件
			that.init_events();
			that.zTreeObj = ztree.render(that.elements[ztreeId], config.setting, config.zNodes);	
		}
		init_events(){
			let that = this;
			// 页面大小发生变化
			$(window ).on('resize',{that:that},function(){
				that.reSize();
			});
			// input
			let ii = document.getElementById(that.elements[itreeInput]);
			$(ii).on("click",{that:that},function(){
				that.menuClick()
			});
		}
		menuClick(){
			let that = this;
			var display = document.getElementById(that.elements[itreeDiv]).style.display;
			if(display == "none" || display == "") {
				that.showMenu();
			} else {
				that.hideMenu();
			}
		}
		showMenu(){
			let that = this;
			$("#"+that.elements[itreeDiv]).slideDown("fast");
			$("body").bind("mousedown",{that:that},function(event,type){
				console.log("mousedown");
				that.onBodyDown(event,that);
			});
		}
		hideMenu(){
			let that = this;
			$("#"+that.elements[itreeDiv]).fadeOut("fast");
			$("body").unbind("mousedown", {that:that},function(event,type){
				console.log("mousedown");
				that.onBodyDown(event,that);
			});
		}
		reSize(){
			let that = this;
			let width = document.getElementById(that.elements[itreeInput]).offsetWidth-3;
			$("#"+that.elements[itreeDiv]).css({width: width});
		}
		onBodyDown(event,that){
			let t = document.getElementById(that.elements[itreeDiv]);
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
			that.elements={};
			that.elements["id"] = id;
			that.elements[itreeInput] = id+itreeInput;
			that.elements[itreeDiv] = id+itreeDiv;
			that.elements[itreeContentDiv] = id+itreeContentDiv;
			that.elements[ztreeId] = id+ztreeId;
			let html = this.build_html(that.elements,config);
			ele.parentElement.innerHTML = html;
		}
		build_html(elements,config){
			let btnHtml=this.build_btns(config.btns);
			let html = `<input id="${elements[itreeInput]}"  class="layui-input" placeholder="-" type="text" readonly/>
				<div id="${elements[itreeDiv]}" class="itreeContent">
					<div class="itree" id="${elements[itreeContentDiv]}">
						${btnHtml}
						<ul id="${elements[ztreeId]}" class="ztree">
						</ul>
					</div>
				</div>`;
		 	return html;
		}
		
		build_btns(btns){
			if(btns==undefined || btns.length==0)return "";
			let t = [];
			for(let btn of btns){
				t.push(`<i class="${btn.icon}" id="${btn.id}" title='${btn.title}'>
								<span>${btn.text}</span>
						</i>`);
			}
			return t.join('');
		}
		/*<i class="iconfont iconcheckbox-multiple-ma" id="${_checkAllbtn}">
							<span id="${_checkAllbtn}">全选</span>
						</i>
							<i class="iconfont iconcheckbox-multiple-bl" id="${_unckeckAllbtn}">
							<span id="${_unckeckAllbtn}">全不选</span>
						</i>
							<i class="layui-icon layui-icon-add-circle" id="${_addbtn}">
							<span id="${_addbtn}">添加</span>
						</i>
							<i class="iconfont iconshouqi-copy" style="float: right;margin-right: 3px;" id="treeDemo_top">
							<span id="treeDemo_top_span"></span>
						</i>*/
	}
	exports('itree', mod);
});