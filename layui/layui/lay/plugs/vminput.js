
layui.define(['jquery','layer'],function(exports){
	var $ = layui.jquery,layer=layui.layer;
	var _config =  {maxNumber:"-1",name:'vminput'};
	var p = "vm-input"
	var vminput ={
		render :function(config){
			var _that = this, _config = config;
			_that._config = _config;
			init(_that);				
			return _that;
		},
		
	}
	function onload(){
		var eles = document.getElementsByTagName("input");
		if(eles==null || eles== undefined || eles.length==0){
			return ;
		}
		for(ele of eles){
			var v = ele.getAttribute("vm-input");
			if(v==null)continue;
			var id = ele.getAttribute("id");
			if(id==undefined){
				id = "_input"+Math.random()*1000000000;
				ele.setAttribute("id",id);
				vminput.render({"id":id});
			}else{
				vminput.render({"id":id});
			}
		}
	}
	function init(_that){
		build_config(_that._config);
		init_html(_that);
		build_element(_that);
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
		var name = ele.getAttribute(p);
		if(name == undefined||name.length==0){
			console.error("vm-input value is null");
		}else{
			config.name=_config.name;
		}	
		var placeholder = ele.getAttribute("placeholder");
		if(placeholder == undefined) placeholder = "点击按钮添加";
		confirm.placeholder = placeholder;
		
		
		var maxNumber = config.maxNumber;
		if(maxNumber==undefined || isNaN(maxNumber)){
			config.maxNumber = maxNumber;
		}
		return config;
	}
	// 初始化页面 
	function init_html(_that){
		var _config = _that._config;
		var _inputId = _config.id;
		var ele = document.getElementById(_inputId);
		var pele=ele.parentElement;
		ele.hidden = true;
		
		var t = ['<div id="'+_config._inputErrorMsgId+'" class="layui-col-xs10" style="font-size:13px;color:red;font-weight:bold;" ></div>'+
		'<div class="layui-col-xs10">','<input type="text"   autocomplete="off"  class="layui-input"',
		' id="'+_config._inputId+'" placeholder="'+confirm.placeholder+'">',
		'<table class="layui-table" id="'+_config._inputTableId+'"  style="margin: 0 0;" lay-size="sm"></table>',
		'</div><div class="layui-col-xs2" align="center" style="max-width:50px">','<button id="'+_config._inputButtonId+'" type="button" class="layui-btn layui-btn-sm" style="height: 38px;width: 100%;min-width: 40px;"><i class="layui-icon layui-icon-add-1"></i>'+
	    '</button></div>'];
	    pele.innerHTML=t.join('');
	}
	
	
	function build_element(that){
		var _config = that._config;
		that._input= document.getElementById(_config._inputId);
		that._table = document.getElementById(_config._inputTableId);
		that._button = document.getElementById(_config._inputButtonId);
		that._errorMsg = document.getElementById(_config._inputErrorMsgId);
		$(that._button).on("click",{that:that},function(event){
				var that =event.data["that"];
				appendTr(that);
		});
		$(that._table).on("click","button",function(){
			console.log(this);
		});
		return  that;
	}
	
	/* 添加tr */
	function appendTr(that){
		var table =that._table;
		var input = that._input;
		var tx = input.value;
		if(tx==undefined || tx.length==0){
			layer.msg("不能添加空值!");
		}else if(tx.includes("|")){
			layer.msg("不能输入特殊符号'|'");
		}else{
			var _config = that._config;
			that._errorMsg.innerHTML="";
			var tr = document.createElement('tr')
			var id = "_tr"+Math.random()*1000000000;
			var html = '<td style="padding-top:5px;padding-bottom: 5px;"><div class="layui-col-xs10">' +
				'<input type="text"  name="'+_config.name+'" id="'+id+'"  readonly autocomplete="off"  class="layui-input" value="' + tx + '"></div> <div class="layui-col-xs2" >'  +
				'<button type="button"  class="layui-btn layui-btn"><i class="layui-icon layui-icon-delete"></i></button></div></td>';
			tr.innerHTML = html;
			table.appendChild(tr);
			input.value = "";
		}
		
	}
	
	
	

	
	onload();
	 exports('vminput', vminput);
});
