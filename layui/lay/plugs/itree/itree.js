layui.define(['ztree','jquery'],function(exports){
	let ztree = layui.ztree,$ = layui.jquery;
	let map = {},
	itreeInput="_itree_input",
	itreeDiv = "_itree_div",
	checkAllbtn= "_itree_check_all_btn",
	unckeckAllbtn="_itree_uncheck_all_btn",
	addbtn="_itree_add_btn",ztreeId="_itree";
	let mod = {
		render:function(id,setting,zNodes){
			
			   let iztree = new iZtree(id,setting,zNodes);
		},
	}
	class iZtree{
		constructor(id,setting,zNodes){
			let that = this,c = new Class(id);
			that.elements = c.elements;
			//初始化事件
			that.init_events();
			that.zTreeObj = ztree.render(that.elements[ztreeId], setting, zNodes);	
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
			let width = document.getElementById("show").offsetWidth-3;
			$("#"+that.elements[itreeDiv]).css({width: width});
		}
		onBodyDown(event,that){
			console.log(event.target.id)
			if(!(event.target.id.indexOf("treeDemo_")>-1)) {
				that.hideMenu();
			}
		}
	}
	class Class{
		constructor(id){
			this.build_elements(id);
		}
		
		build_elements(id){
			let that = this;
			let ele = document.getElementById(id);
			if(ele==null){
				console.error("不存在元素id="+id);
			}
			that.elements={};
			that.elements["id"] = id;
			that.elements[itreeInput] = id+itreeInput;
			that.elements[itreeDiv] = id+itreeDiv;
			that.elements[checkAllbtn] = id+checkAllbtn;
			that.elements[unckeckAllbtn] = id+unckeckAllbtn;
			that.elements[addbtn] = id+addbtn;
			that.elements[ztreeId] = id+ztreeId;
			let html = this.build_html(that.elements);
			ele.parentElement.innerHTML = html;
		}
		build_html(elements){
			let _itreeInput=elements[itreeInput],
				_itreeDiv = elements[itreeDiv],
				_checkAllbtn= elements[checkAllbtn],
				_unckeckAllbtn=elements[unckeckAllbtn],
				_addbtn=elements[addbtn],_ztreeId=elements[ztreeId];
			let html = `<input id="${_itreeInput}"  class="layui-input" placeholder="-" type="text" readonly/>
				<div id="${_itreeDiv}" class="itreeContent">
					<div class="itree">
						<i class="iconfont iconcheckbox-multiple-ma" id="${_checkAllbtn}">
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
						</i>
						<ul id="${_ztreeId}" class="ztree">
						</ul>
					</div>
				</div>`;
		 	return html;
		}
	}
	exports('itree', mod);
});