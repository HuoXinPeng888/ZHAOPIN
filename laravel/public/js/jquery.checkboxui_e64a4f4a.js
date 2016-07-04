!function($,window,undefined){function Plugin(element,options){this.element=$(element),this.options=$.extend({},defaults,options),this._defaults=defaults,this._name=pluginName,this.init()}var pluginName="CheckboxUI",ie6=window.VBArray&&!window.XMLHttpRequest,document=window.document,methodHandler=["destroy","refresh"],defaults={disabledCallback:!1};Plugin.prototype.init=function(){var that=this,cssName="";that.element.hide(),that.element.attr("autocomplete","off"),that.ui=$("<i />").attr("data-name",that.element.attr("name")||"").addClass("checkboxui").css({"margin-top":that.element.css("margin-top"),"margin-bottom":that.element.css("margin-bottom"),"margin-left":that.element.css("margin-left"),"margin-right":that.element.css("margin-right")}).insertAfter(that.element),that.refresh(),that.element.bind("change",function(){that.refresh()}),that.element.parent("label").bind("click."+that._name,function(event){return!$(event.target).is(":checkbox")&&that.ui.triggerHandler("click"),event.stopPropagation(),event.preventDefault(),!1}),that.ui.bind("click."+that._name,function(event){return that.element.is(":disabled")?(that.options.disabledCallback&&that.options.disabledCallback.call(that),!1):(that.element.is(":checked")?that.element.prop("checked",!1):that.element.prop("checked",!0),that.element.trigger("change"),event.stopPropagation(),!1)})},Plugin.prototype.refresh=function(){var cssName="";return this.element.is(":checked")&&(cssName+="-checked"),this.element.is(":disabled")&&(cssName+="-disabled"),this.ui.removeClass().addClass("checkboxui"),cssName&&this.ui.addClass("checkboxui"+cssName),this},$.fn[pluginName]=$.fn[pluginName]||function(options){var args,method,isHandler,_plugin;if("string"==typeof options){if(args=arguments,method=options,isHandler=function(){for(var i=0;i<methodHandler.length;i++)if(methodHandler[i]===method)return!0;return!1},Array.prototype.shift.call(args),"check"==method)return!!this.data("plugin_"+pluginName);if(isHandler())return this.each(function(){var _plugin=$(this).data("plugin_"+pluginName);_plugin&&_plugin[method]&&_plugin[method].apply(_plugin,args)});if(_plugin=this.first().data("plugin_"+pluginName),_plugin&&_plugin[method])return _plugin[method].apply(_plugin,args);throw new TypeError(pluginName+' has no method "'+method+'"')}return this.each(function(){var _plugin=$(this).data("plugin_"+pluginName);_plugin||$(this).data("plugin_"+pluginName,new Plugin(this,options))})}}(jQuery,window);