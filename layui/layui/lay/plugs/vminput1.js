layui.define(['jquery','layer'],function(exports){
	let $ = layui.jquery,layer=layui.layer;
	let map={}; // map,用于存储实例,key是vm-input值
	let p = "vm-input",
		mx = "vm-max",
		md = "vm-data",
		mi = "vm-min";
	//主入口
	let mod={
		render : function(config,...ids){
			if(ids==undefined || ids == null||ids.length==0){
				console.error("id is null");
				return ;
			}
			for(id of ids){
				if(config == null || config == undefined){
					config = {};
				}
				config.id = id;
				let show = new Class(config);
				let key = document.getElementById(id).getAttribute(p);
				let vt =new vminput(config);
				map[key] = vt;
				this.setValue(key,config.data);
			}
			
		},
		getValue(vm_input){
			let vmiput = map[vm_input];
			if(vmiput==null || vmiput==undefined){
				console.log(`${vm_input}不存在!`)
			}
			let v = vmiput._ele.value;
			if(v.length==0) return [];
			return v.split("|");
		},
		setValue(vm_input,data){
			let vmiput = map[vm_input];
			if(vmiput==null || vmiput==undefined){
				console.log(`${vm_input}不存在!`);
				return;
			}
			
			vmiput.clearAllTr();
			if(data == undefined ||data==null) return ;
			if(data instanceof Array){
				for(it of data){
					vmiput.appendTr(it);
				}
			}else if(typeof(data)=="string"){
				data = data.trim();
				if(data.length==0) return ;
				let vs = data.split("|");
				for(v of vs){
					vmiput.appendTr(v);
				}
			}
		}
	}
	class vminput{
		constructor(config){
			this.build_element(config);
		}
		build_element(config){
			let _config = config,that = this;
			that._config = _config;
			that._ele = document.getElementById(_config.id);
			that._input= document.getElementById(_config._inputId);
			that._table = document.getElementById(_config._inputTableId);
			that._button = document.getElementById(_config._inputButtonId);
			$(that._button).on("click",{that:that},function(event){
					let that =event.data["that"];
					let input = that._input;
					let tx = input.value;
					that.appendTr(tx);
			});
			$(that._table).on("click","button",{that:that},function(){
				let tr = this.parentNode.parentNode.parentNode;
				that._table.removeChild(tr);
				that.setValue(that);
			});
			return  that;
		}
		// 给ele设置值
		setValue(){
			let that =this;
			let table =that._table,ele = that._ele;
			let its = $("#"+table.getAttribute('id')+" input");
			if(its==null || its == undefined || its.length==0){
				ele.value = "";
			}else{
				let s= [],items=[];
				for(let j=0;j<its.length;j++){
					items.push(its[j]);
				}
				for(let it of items){
					s.push(it.value);
				}
				ele.value= s.join("|");
			}
		}
		/* 添加tr */
		appendTr(value){
			if(value==undefined || value.length==0){
				layer.msg("不能添加空值!");
				return ;
			}
			if(typeof(value)=="string"){
				if(value.includes("|")){
					layer.msg("不能输入特殊符号'|'");
					return ;
				}
				value = value.trim();
			}
				
			let that =this;
			let table =that._table;
			let _config = that._config;
			let maxnum = _config.max;
			if(maxnum != -1){ //最大数量是否超过
				let count = table.childElementCount;
				if(count>=maxnum){
					layer.msg(`最多添加${maxnum}条数据!`);
					return;
				}					
			}
			let tr = document.createElement('tr')
			let id = "_tr"+Math.random()*1000000000;
			let html = `<td><div class="layui-col-xs10">
			<input type="text"   id="${id}"  readonly autocomplete="off"  class="layui-input" value="${value}"></div> <div class="layui-col-xs2" >
			<button type="button"  class="layui-btn layui-btn vminput-del"><i class="layui-icon layui-icon-delete"></i></button></div></td>`;
			tr.innerHTML = html;
			table.appendChild(tr);
			that._input.value = "";
			that.setValue(that);
		}
		clearAllTr(){
			let that =this;
			let table =that._table;
			let trs = table.children;
			for(let tr of trs){
				table.removeChild(tr);
			}
			that.setValue();
		}
	}
	class Class{
		/*构造函数*/
		constructor(config){
			this.build_config(config);
			this.init_html(config);
		}
		/*验证和组装配置*/
		build_config(config){
			// 获取所有元素id
			let _inputId = config.id;
			if(_inputId==undefined||_inputId.length==0){
				console.error("id 不能为空！");
			}
			let ele = document.getElementById(_inputId);
			if(ele==undefined||ele==null){
				console.error("id 不存在:"+_inputId);
			}
			config._inputId="_vminput_" + _inputId;
			config._inputTableId = config._inputId+"_table";
			config._inputButtonId = config._inputId+"_button";
			
			let placeholder = ele.getAttribute("placeholder");
			if(placeholder == undefined) placeholder = "点击按钮添加";
			confirm.placeholder = placeholder;
			
			
			let max = config.max;
			if(max==undefined || isNaN(max)){
				config.max = -1;
			}
			ele.setAttribute(mx,max);
			
			let min = config.min;
			if(min==undefined || isNaN(min)){
				config.min = -1;
			}
			ele.setAttribute(mi,min);
			
			return config;
		}
		/*初始化html*/
		init_html(config){
			let _config = config;
			let _inputId = _config.id;
			let ele = document.getElementById(_inputId);
			let pele=ele.parentElement;
			ele.style.display="none"
			let t = ['<div class="layui-col-xs10">','<input type="text" lay-verify="vminput"  autocomplete="off"  class="layui-input"',
			' id="'+_config._inputId+'" placeholder="'+confirm.placeholder+'">',
			'<table class="layui-table vm-input-table" id="'+_config._inputTableId+'"  style="margin: 0 0;" lay-size="sm"></table>',
			'</div><div class="layui-col-xs2" align="center" style="max-width:50px">','<button id="'+_config._inputButtonId+'" type="button" class="layui-btn layui-btn-sm vminput-add"><i class="layui-icon layui-icon-add-1"></i>'+
		    '</button></div>'];
		    let div = document.createElement("div");
		    div.innerHTML = t.join('')
		    pele.appendChild(div)
		}
	}
	
	function onload(){
		let eles = document.getElementsByTagName("input");
		if(eles==null || eles== undefined || eles.length==0){
			return ;
		}
		for(ele of eles){
			let v = ele.getAttribute("vm-input");
			if(v==null)continue;
			let id = ele.getAttribute("id");
			if(id==undefined){
				id = "_input"+Math.random()*1000000000;
				ele.setAttribute("id",id);
			}
			let config = {max:ele.getAttribute(mx),min:ele.getAttribute(mi),data:ele.getAttribute(md)};
			mod.render(config,id);
		}
	}
	onload();
	layui.link("http://127.0.0.1:8020/layui/layui/layui/lay/plugs/css.css");
	exports('vminput', mod);
});