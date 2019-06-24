
layui.define(['jquery'],function(exports){
	var $ = layui.jquery;
	
	var inputHtml='<div class="layui-col-xs10">'+
		      		'<input type="text" autocomplete="off"  class="layui-input">'+
		     		'<table class="layui-table"   style="margin: 0 0;" lay-size="sm"></table>'+
				   '</div>'+
			    '<div class="layui-col-xs2" align="center" >'+
			     '	<button type="button" class="layui-btn layui-btn-sm">'+
				  '   	<i class="layui-icon layui-icon-add-1"></i>'+
			     	'</button>'+
			    '</div>';
	var _config =  {maxNumber:"-1",name:'vminput'};
	var mod ={
		_element:undefined,
		render :function(config){
			var that = this;
			var c = build_config(config);
			var _inputId = c.id;
			var ele = document.getElementById(_inputId);
			var pele=ele.parentElement;
			this._element= ele;
			ele.hidden = true;
			pele.innerHTML=initHtml(c);
			console.log(this)
			return this;
		},
		
	}
	vm.prototype.initHtml = 
	// 生成html标签
	function initHtml(_config){
		var t = ['<div class="layui-col-xs10">','<input type="text"   autocomplete="off"  class="layui-input"',
		' name='+_config.name,' id='+_config._inputId,' placeholder'+confirm.placeholder,'>',
		'<table class="layui-table"   style="margin: 0 0;" lay-size="sm"></table>',
		'</div>','<div class="layui-col-xs2" align="center" >','<button type="button" class="layui-btn layui-btn-sm" style="height: 38px;width: 100%;min-width: 40px;">','<i class="layui-icon layui-icon-add-1"></i>',
	    '</button></div><h5>1234556</h5>'];
	    return t.join('');
		

	}
	// 判断配置是否正确
	function build_config(config){
		var _inputId = config.id;
		if(_inputId==undefined||_inputId.length==0){
			console.error("id 不能为空！");
		}
		var ele = document.getElementById(_inputId);
		if(ele==undefined||ele==null){
			console.error("id 不存在:"+_inputId);
		}
		config._inputId="_vminput_" + _inputId;
		var name = config.name;
		if(name == undefined||name.length==0){
			config.name=_config.name;
		}
		var maxNumber = config.maxNumber;
		if(maxNumber==undefined || isNaN(maxNumber)){
			config.maxNumber = maxNumber;
		}
		return config;
	}
	 exports('vminput', mod);
});
