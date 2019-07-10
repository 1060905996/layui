layui.define(['ztree','jquery'],function(exports){
	let ztree = layui.ztree,$ = layui.jquery;
	let mod = {
		render:function(setting,...ids){
			var setting = {};
			var zNodes = [
			   {name:"test1", open:true, children:[
			      {name:"test1_1"}, {name:"test1_2"}]},
			   {name:"test2", open:true, children:[
			      {name:"test2_1"}, {name:"test2_2"}]}
			   ];
			   zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
			   let iztree = new iZtree();
		},
	}
	class iZtree{
		constructor(){
			let ele =document.getElementById("show");
			let that = this;
			$(ele).on("click",{that:that},function(){
				that.menuClick()
			});
			$(window ).on('resize',{that:that},function(){
				that.reSize();
			});
			
		}
		menuClick(){
			var display = document.getElementById("menuContent").style.display;
			if(display == "none" || display == "") {
				this.showMenu();
			} else {
				this.hideMenu();
			}
		}
		showMenu(){
			this.reSize();
			$("#menuContent").slideDown("fast");
			let that = this;
			$("body").bind("mousedown",{that:that},function(event,type){
				console.log("mousedown");
				that.onBodyDown(event,that);
			});
		}
		hideMenu(){
			$("#menuContent").fadeOut("fast");
			let that = this;
			$("body").unbind("mousedown", {that:that},function(event,type){
				console.log("mousedown");
				that.onBodyDown(event,that);
			});
		}
		reSize(){
			let width = document.getElementById("show").offsetWidth-3;
			$("#menuContent").css({width: width});
		}
		onBodyDown(event,that){
			console.log(event.target.id)
			if(!(event.target.id.indexOf("treeDemo_")>-1)) {
				that.hideMenu();
			}
		}
	}
	class Class{
		constrctor(id){
			
		}
		build_elements(id){
			
		}
	}
	exports('itree', mod);
});