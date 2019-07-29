/**
 * id: input id' ,
 * leaf: false  //只能选择叶子节点
 * bmsStyle: 
 * 	radio // 单选
 *  chekcbox  //多选
 *		react: 选择父节点会自动选择子节点,选择子节点也会勾选父节点

 * */

layui.config({
  base: '../../' //配置 layui 第三方扩展组件存放的基础目录
}).extend({
  itree: 'itree/itree' 
}).define(['itree','jquery'],function(exports){
	let itree = layui.itree,$ = layui.jquery;
	let map = {};
	const _config = {
		leaf: false,bmsStyle:{type:"checkbox",react:true}
	}
	
	let mod = {
		render:function(config){
			var zNodes = [
					   {name:"test1", id:1, open:true, children:[
					      {name:"test1_1",id:2}, {name:"test1_2",id:3}]},
					   {name:"test2",id:4, open:true, children:[
					      {name:"test2_1",id:5}, {name:"test2_2",id:6}]}
					   ];
			let c = new Class(config);
			itree.render({id:config.id,setting:c.setting,zNodes:zNodes});
		}
		
	}
	class bmsTree{
		constructor(config){
		}		
	}
	class Class{
		constructor(config){
			this.build_config(config)
		}
		
		build_config(config){
			let id = config.id;
			let ele = document.getElementById(id);
			if(ele==null || ele==undefined){
				console.error("不存在元素id="+id);
			}
			let c  = _config,m =  new Method();
			$.extend(true, c, config);
			let setting = {callback:{
				onClick:m.radioClick
			}};
			
			this.setting = setting;
			
		}
		
	}
	
	class Method{
		constructor (){}
		radioClick(event, treeId, treeNode){
			console.log(treeNode)
		}
	}
	
	function onload(){
		
	}
	onload();
	exports('bmstree', mod);
});
