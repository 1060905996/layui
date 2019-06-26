
layui.define(['jquery'],function(exports){
	var $ = layui.jquery;
	var _config =  {maxNumber:"-1",name:'vminput'};
	var p = "vm-input"
	var vminput ={
		render :function(config){
			var _that = this, _config = config;			
			init(_that,_config)				
			return _that;
		},
		
	}
	function onload(){
		console.log("onload")
		var eles = document.getElementsByTagName("input");
		if(eles==null || eles== undefined || eles.length==0){
			return ;
		}
		for(ele of eles){
			var v = ele.getAttribute("vm-input");
			if(v==null || v==undefined)continue;
			var id = ele.getAttribute("id");
			if(id!=undefined){
				id = "_input"+Math.random()*1000000000;
				ele.setAttribute("id",id);
				vminput.render({"id":id});
			}
		}
	}
	function init(_that,_config){
		build_config(_config);
		init_html(_that,_config);
		build_element(_that,_config);
	}
	/* 添加tr */
	function appendTr(that){
		var table =that._table;
		var input = that._input;
		var tx = input.value;
		if(tx==undefined || tx.length==0){
			that._errorMsg.innerHTML="不能为空";
		}else if(tx.includes("|")){
			that._errorMsg.innerHTML="不能输入特殊符号'|'";
		}else{
			that._errorMsg.innerHTML="";
			var tr = document.createElement('tr')
			tr.innerHTML ='<td>'+tx+'</td>';
			table.appendChild(tr);
			input.value = "";
		}
		
	}
	// 初始化页面 
	function init_html(_that,_config){
		var _inputId = _config.id;
		var ele = document.getElementById(_inputId);
		var pele=ele.parentElement;
		ele.hidden = true;
		var t = ['<span id="'+_config._inputErrorMsgId+'"></span><div class="layui-col-xs10">','<input type="text"   autocomplete="off"  class="layui-input"',
		' name='+_config.name,' id='+_config._inputId,' placeholder'+confirm.placeholder,'>',
		'<table class="layui-table" id="'+_config._inputTableId+'"  style="margin: 0 0;" lay-size="sm"></table>',
		'</div>','<div class="layui-col-xs2" align="center" style="max-width:50px">','<button id="'+_config._inputButtonId+'" type="button" class="layui-btn layui-btn-sm" style="height: 38px;width: 100%;min-width: 40px;">','<i class="layui-icon layui-icon-add-1"></i>',
	    '</button></div>'];
	    pele.innerHTML=t.join('');
	}
	function build_element(that,config){
		that._input= document.getElementById(config._inputId);
		that._table = document.getElementById(config._inputTableId);
		that._button = document.getElementById(config._inputButtonId);
		that._errorMsg = document.getElementById(config._inputErrorMsgId);
		$(that._button).on("click",{that:that},function(event){
				var that =event.data["that"];
				appendTr(that);
		});
		return  that;
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
		config._inputTableId = config._inputId+"_table";
		config._inputButtonId = config._inputId+"_button";
		config._inputErrorMsgId = config._inputId+"_errormsg";
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
	onload();
	 exports('vminput', vminput);
});
