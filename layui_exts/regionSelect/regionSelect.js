
/**
 @ Name：layui.regionSelect 中国省市区选择器
         注意：本文件只是一个扩展组件的示例，暂时没有写相关功能
 @ Author：贤心
 @ License：MIT 
 */
 
layui.define('form', function(exports){ //假如该组件依赖 layui.form
  var $ = layui.$
  ,form = layui.form
  
  //字符常量
  ,MOD_NAME = 'regionSelect', ELEM = '.layui-regionSelect'
  
  //外部接口
  ,regionSelect = {
    index: layui.regionSelect ? (layui.regionSelect.index + 10000) : 0
    
    //设置全局项
    ,set: function(options){
      var that = this;
      that.config = $.extend({}, that.config, options);
      return that;
    }
    
    //事件监听
    ,on: function(events, callback){
      return layui.onevent.call(this, MOD_NAME, events, callback);
    }
  }
  
  //操作当前实例
  ,thisIns = function(){
    var that = this
    ,options = that.config
    ,id = options.id || options.index;
    
    return {
      reload: function(options){
        that.reload.call(that, options);
      }
      ,config: options
    }
  }
  
  //构造器
  ,Class = function(options){
    var that = this;
    that.index = ++regionSelect.index;
    that.config = $.extend({}, that.config, regionSelect.config, options);
    that.render();
  };
  
  //默认配置
  Class.prototype.config = {
    layout: ['province', 'city', 'county', 'street'] //联动层级
    //其他参数
    //……
  };
  
  //渲染视图
  Class.prototype.render = function(){
    var that = this
    ,options = that.config;

    options.elem = $(options.elem);
    
    
    options.elem.html('<div class="layui-text">您已经成功运行了：<strong>layui.regionSelect</strong> 中国省市区选择组件。<br><span style="color: #FF5722;">但是注意：</span>这只是一个扩展组件的示例，暂时没有写相关功能。<br>详见：<a href="https://fly.layui.com/extend/demo/" target="_blank">https://fly.layui.com/extend/demo/</a></div>');
  }
  
  //核心入口
  regionSelect.render = function(options){
    var ins = new Class(options);
    return thisIns.call(ins);
  };
  
  //加载组件所需样式
  layui.link(layui.cache.base + 'regionSelect/regionSelect.css?v=1', function(){
    //样式加载完毕的回调
    
  }, 'regionSelect'); //此处的“regionSelect”要对应 regionSelect.css 中的样式： html #layuicss-regionSelect{}
  
  exports('regionSelect', regionSelect);
});