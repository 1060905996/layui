/**
 * 
 * multiple: boolean 是否多选
 * 	 true
 * */

layui.config({
	base: '../../' //配置 layui 第三方扩展组件存放的基础目录
}).extend({itree: 'itree/itree'}).define(['iztree', 'jquery'], function(exports) {
	let itree = layui.itree,
		$ = layui.jquery;
		let _config={
			
		};
	let mod = {

	}
	exports("selectitree", mod)
});