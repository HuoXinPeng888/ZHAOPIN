!function($){var ns="SimpleValidErrorTips",nsname="lt-plugins-"+ns.toLowerCase();$.fn[ns]=function(msg){return this.each(function(){var id,position;$("."+nsname).remove(),msg?(id=Math.random().toString().replace(".",""),position=$(this).is(":visible")?$(this).position():$(this).closest(":visible").position(),$('<div id="'+id+'" class="'+nsname+'"><span class="error-content">'+msg+"</span><em></em><i></i></div>").insertAfter(this).css({left:position.left,top:function(){return position.top-$(this).outerHeight()+"px"}}),$(this).attr("data-simplevaliderrortips-id",id)):(id=$(this).attr("data-simplevaliderrortips-id")||"",id&&$(this).removeAttr("data-simplevaliderrortips-id"))})},function(namespace){var css=""+namespace+"{position:absolute;font-size:12px;background:#f5c3bf;border:1px solid #edbcb9;padding:0px 10px;color:#e75c00;line-height:20px;z-index:997;}"+namespace+" .error-content{white-space:nowrap;}"+namespace+"em,"+namespace+"i{position:absolute;bottom:-14px;left:20px;overflow:hidden;width:0;height:0;z-index:999;border-width:8px;border-style:solid;border-color:transparent transparent transparent transparent;_border-color:tomato tomato tomato tomato;border-top-color:#f5c3bf;_filter:chroma(color=tomato);}"+namespace+"em{bottom:-15px;z-index:998;border-top-color:#edbcb9;}";style=document.createElement("style"),style.setAttribute("type","text/css"),style.styleSheet?style.styleSheet.cssText=css:style.appendChild(document.createTextNode(css)),document.getElementsByTagName("head")[0].appendChild(style)}("."+nsname+" ")}(jQuery),function($){var ns="SimpleValidTips";$.fn[ns]=function(msg){return this.bind("change blur",function(event,ele){var form=$(this).closest("form"),uiname=$(this).attr("data-ui"),validity=form.valid("validate",$(this))[0]||{valid:!0},element=$(this);if("LocalDataUIC"===uiname?element=$(this)[uiname]("fetch").ui.helper:"SelectUI"===uiname&&(element=$(this).closest(".selectui")),element){if(element.SimpleValidErrorTips(""),$(this).is(":input")&&""===$(this).val())return!0;$(this).trigger("highlight",!validity.valid)}}).bind("focus",function(event,ele){var form,uiname,validity,element,msgHandler,top;if(!$(this).attr("data-valid"))return!0;if(form=$(this).closest("form"),uiname=$(this).attr("data-ui"),validity=form.valid("validate",$(this))[0]||{valid:!0},element=$(this),msgHandler=validity.valid?"":validity.customErrorMsg,"LocalDataUIC"===uiname?element=$(this)[uiname]("fetch").ui.helper:"SelectUI"===uiname&&(element=$(this).closest(".selectui")),element){if("Skip"!==uiname&&!element.hasClass("text-error"))return!0;element.SimpleValidErrorTips(msgHandler),validity.valid||(top=element.offset().top,top<(document.documentElement.scrollTop||document.body.scrollTop)&&window.scrollTo(0,top-80))}}).bind("highlight",function(event,show){var form=$(this).closest("form"),uiname=$(this).attr("data-ui"),element=$(this),eventHandler=show?"addClass":"removeClass";"LocalDataUIC"===uiname?element=$(this)[uiname]("fetch").ui.helper:"SelectUI"===uiname?element=$(this).closest(".selectui"):"Skip"===uiname&&(element=null),element&&element[eventHandler]("text-error")}),this.filter("[validate-group]").find(":input").bind("change",function(){$(this).closest("[validate-group]").triggerHandler("change")}),this}}(jQuery);