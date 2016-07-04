!function($,window,undefined){var list,ns,cache,nsname,LTJQ;$.noop=$.noop||function(){},list={},ns="valid",cache={},nsname="lt-plugins-"+ns.toLowerCase(),LTJQ=function(config){var rets,args,i;if("string"==typeof config)return rets=[],args=arguments,this.each(function(){var id=$(this).attr(nsname);id&&list[id]&&rets.push(list[id]._api.apply(list[id],args))}),rets.length>0?rets[0]:null;config=config||{};for(i in LTJQ.defaults)config[i]===undefined&&(config[i]=LTJQ.defaults[i]);return this.each(function(){var id=Math.random();!$(this).attr(nsname)&&$(this).attr(nsname,id)&&(list[id]=new LTJQ.fn._init(this,id,config))})},LTJQ.fn=LTJQ.prototype={version:"1.0.0",_init:function(element,id,config){var that=this;return that.element=element,that.id=id,that.config=config,that.__init.call(that),config.init&&config.init.call(that),that},_api:function(){var i,that=this,args=[];for(i=0;i<arguments.length;i++)args.push(arguments[i]);return 0===args.length||that[args[0]]===undefined?that:"function"==typeof that[args[0]]?that[args[0]].apply(that,args.slice(1)):that},__init:function(){var that=this,$element=$(that.element),$form=$element;return $element.is("[validate-rules]")||($element=$element.find("[validate-rules]")),that.config.type&&that.config.type.callback&&$element.each(function(){var $this=$(this),_type=$this.attr("validate-type");_type||(_type=that.config.type.name),_type&&$this.bind(_type+"."+ns,function(event){that.config.type.callback&&that.config.type.callback.call($this,that.validate($this)[0])})}),$form.is("form")&&$form.bind("submit",function(event){var args=Array.prototype.slice.call(arguments);return args.shift(),that.scan().valid&&that.config.success&&("function"!=typeof that.config.success||that.config.success.apply($form,args))?void 0:(event.preventDefault(),!1)}),that},_extendGetter:function(extend){var _result={};return Object.keys(extend).forEach(function(key){_result[key]={},Array.isArray(extend[key])&&extend[key].length>0?(_result[key].rule=extend[key][0],_result[key].message=null,extend[key].length>1&&"string"==typeof extend[key][1]&&(_result[key].message=extend[key][1])):(_result[key].rule=extend[key],_result[key].message=null)}),extend=_result},_ruleCompile:function(_element,_rules,_validity){var i,_rule,rule,_checkboxname,_form,_checkboxes,_radioname,_radios,reg,_ajax,status,_success,_ajaxoptions,cachedata,_passwordlist,_password,_dynrule,_dyncheck,_dynresult,that=this,_value=$(_element).val();if($(_element).prop("disabled"))return!1;for(_rules=_rules||[],"string"==typeof _rules&&(_rules=[_rules]),i=0;i<_rules.length;i++){switch(_rule=_rules[i],rule={name:"",extend:null,message:""},"string"==typeof _rule?rule.name=_rule:"[object Array]"===Object.prototype.toString.call(_rule)&&(rule.name=_rule[0],2===_rule.length?"object"==typeof _rule[1]?rule.extend=_rule[1]:"string"==typeof _rule[1]&&(rule.message=_rule[1]):3===_rule.length&&(rule.extend=_rule[1],rule.message=_rule[2])),rule.name){case"required":"select"===_element.tagName.toLowerCase()?(rule.message=rule.message||"请选择$！",rule.extend=$.extend({ruleout:""},rule.extend),(-1===_element.selectedIndex||_value===rule.extend.ruleout)&&(_validity.valid=!1,_validity.customErrorMsg=rule.message.replace(/\$/g,_validity.name))):"checkbox"===$(_element).attr("validate-group")?(_checkboxname=$(_element).attr("validate-name"),_form=$(_element).closest("form"),_checkboxes=_checkboxname?_form.length>0?_form.find(":checkbox[name='"+_checkboxname+"']:checked"):$(":checkbox[name='"+_checkboxname+"']:checked"):$(_element).find(":checkbox:checked"),rule.extend=$.extend({min:1},rule.extend),"undefined"!=typeof rule.extend.min&&_checkboxes.length<rule.extend.min?(rule.message=rule.message||"$1$2选择$3项！",_validity.valid=!1,_validity.customErrorMsg=rule.message.replace(/\$1/g,_validity.name).replace(/\$2/g,"至少").replace(/\$3/g,rule.extend.min).replace(/\$/g,_validity.name)):"undefined"!=typeof rule.extend.max&&_checkboxes.length>rule.extend.max&&(rule.message=rule.message||"$1$2选择$3项！",_validity.valid=!1,_validity.customErrorMsg=rule.message.replace(/\$1/g,_validity.name).replace(/\$2/g,"最多").replace(/\$3/g,rule.extend.max).replace(/\$/g,_validity.name))):"radio"===$(_element).attr("validate-group")?(_radioname=$(_element).attr("validate-name"),_form=$(_element).closest("form"),_radios=_radioname?_form.length>0?_form.find(":radio[name='"+_radioname+"']:checked"):$(":radio[name='"+_radioname+"']:checked"):$(_element).find(":radio:checked"),rule.message=rule.message||"请选择$！",rule.extend=$.extend({min:1},rule.extend),0===_radios.length&&(_validity.valid=!1,_validity.customErrorMsg=rule.message.replace(/\$/g,_validity.name))):(rule.message=rule.message||"$不能为空！",/^\s*$/.test(_value)&&(_validity.valid=!1,_validity.customErrorMsg=rule.message.replace(/\$/g,_validity.name)));break;case"number":if(rule.extend=$.extend({"float":!1},rule.extend),rule.extend=that._extendGetter(rule.extend),""!==_value){if(rule.extend["float"]){if(rule.extend["float"].rule&&!/^\d+(\.\d+)?$/.test(_value)){_validity.valid=!1,_validity.customErrorMsg=(rule.extend["float"].message||rule.message||"$必须是数字！").replace(/\$/g,_validity.name);break}if(!rule.extend["float"].rule&&!/^\d+$/.test(_value)){_validity.valid=!1,_validity.customErrorMsg=(rule.extend["float"].message||rule.message||"$必须是数字！").replace(/\$/g,_validity.name);break}}if(rule.extend.max&&_value>rule.extend.max.rule){_validity.valid=!1,_validity.customErrorMsg=(rule.extend.max.message||rule.message||"$1不能大于$2！").replace(/\$2/g,rule.extend.max.rule).replace(/\$1?/g,_validity.name);break}if(rule.extend.min&&_value<rule.extend.min.rule){_validity.valid=!1,_validity.customErrorMsg=(rule.extend.min.message||rule.message||"$1不能小于$2！").replace(/\$2/g,rule.extend.min.rule).replace(/\$1?/g,_validity.name);break}}break;case"mobile":rule.message=rule.message||"$输入不正确！",_value&&!/^(((\(\d{2,3}\))|(\d{3}\-))?(1[34578]\d{9}))$|^((001)[2-9]\d{9})$/.test(_value)&&(_validity.valid=!1,/^0\d{12}$/.test(_value)&&!/^(001)/.test(_value)||/^[2-9]\d{9}$/.test(_value)?_validity.customErrorMsg="美国手机号请在号码前添加国际区号001":_validity.customErrorMsg=rule.message.replace(/\$/g,_validity.name));break;case"phone":rule.message=rule.message||"$输入不正确！",reg=/((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/,""===_value||reg.test(_value)||(_validity.valid=!1,_validity.customErrorMsg=rule.message.replace(/\$/g,_validity.name));break;case"email":rule.message=rule.message||"$格式输入不正确！",""===_value||/^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,8}$/.test(_value)||(_validity.valid=!1,_validity.customErrorMsg=rule.message.replace(/\$/g,_validity.name));break;case"url":rule.message=rule.message||"$格式输入不正确！",""===_value||/^(http:|https:|ftp:)\/\/(?:[0-9a-zA-Z]+|[0-9a-zA-Z][\w-]+)+\.[\w-]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"])*$/.test(_value)||(_validity.valid=!1,_validity.customErrorMsg=rule.message.replace(/\$/g,_validity.name));break;case"length":if(rule.extend=$.extend({},rule.extend),rule.message=rule.message||"$1长度不能$2$3个字符！",""!==_value){if("undefined"!=typeof rule.extend.min&&_value.length<rule.extend.min){_validity.valid=!1,_validity.customErrorMsg=rule.message.replace(/\$2/g,"小于").replace(/\$3/g,rule.extend.min).replace(/\$1?/g,_validity.name);break}if("undefined"!=typeof rule.extend.max&&_value.length>rule.extend.max){_validity.valid=!1,_validity.customErrorMsg=rule.message.replace(/\$2/g,"大于").replace(/\$3/g,rule.extend.max).replace(/\$1?/g,_validity.name);break}}break;case"reallength":if(rule.extend=$.extend({},rule.extend),rule.message=rule.message||"$1长度不能$2$3个字符！",""!==_value){if("undefined"!=typeof rule.extend.min&&_value.replace(/[\u4e00-\u9fa5]/g,"**").length<rule.extend.min){_validity.valid=!1,_validity.customErrorMsg=rule.message.replace(/\$2/g,"小于").replace(/\$3/g,rule.extend.min).replace(/\$1?/g,_validity.name);break}if("undefined"!=typeof rule.extend.max&&_value.replace(/[\u4e00-\u9fa5]/g,"**").length>rule.extend.max){_validity.valid=!1,_validity.customErrorMsg=rule.message.replace(/\$2/g,"大于").replace(/\$3/g,rule.extend.max).replace(/\$1?/g,_validity.name);break}}break;case"cn":rule.message=rule.message||"$应当由汉字组成！",""===_value||/^[\u4e00-\u9fa5]+$/.test(_value)||(_validity.valid=!1,_validity.customErrorMsg=rule.message.replace(/\$/g,_validity.name));break;case"repeat":if(rule.extend=$.extend({max:5},rule.extend),rule.message=rule.message||"$1不能重复输入$2次以上！",""!==_value&&(reg=new RegExp("(\\S)\\1{"+rule.extend.max+",}.*","g"),reg.test(_value))){_validity.valid=!1,_validity.customErrorMsg=rule.message.replace(/\$2/g,rule.extend.max).replace(/\$1?/g,_validity.name);break}break;case"not":if(rule.extend=$.extend({},rule.extend),rule.message=rule.message||"$输入不正确！",""!==_value&&rule.extend.type&&(-1!==rule.extend.type.indexOf("email")&&/[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,8}/.test(_value)||-1!==rule.extend.type.indexOf("mobile")&&/((\(\d{2,3}\))|(\d{3}\-))?(1[34578]\d{9})/.test(_value))){_validity.valid=!1,_validity.customErrorMsg=rule.message.replace(/\$1?/g,_validity.name);break}break;case"trim":""!==_value&&(_value=_value.replace(/^\s+|\s+$/g,""),$(_element).val(_value));break;case"parseAnsi":""!==_value&&$(_element).val(_value.replace(/[\uf06c\uf06e\uf075\uf0fc\uf0d8\uf0b2]\t?/g,"· "));break;case"pattern":"string"==typeof rule.extend&&(rule.extend=new RegExp(rule.extend,"ig")),rule.message=rule.message||"$不符合规范！",""===_value||rule.extend.test(_value)||(_validity.valid=!1,_validity.customErrorMsg=rule.message.replace(/\$/g,_validity.name));break;case"ajax":_ajax=that.config.ajax,status=!0,_ajax&&"object"==typeof _ajax[rule.extend]&&(_success=_ajax[rule.extend].success,_ajaxoptions={type:"post",cache:!1,async:!1},cachedata="",$.extend(_ajaxoptions,_ajax[rule.extend]),_ajax[rule.extend].success&&(_ajaxoptions.success=function(data){status=_ajax[rule.extend].success(data)}),_ajax[rule.extend].data&&"function"==typeof _ajaxoptions.data&&(_ajaxoptions.data=_ajaxoptions.data()),cachedata=$.param(_ajaxoptions.data),cache[_ajaxoptions.url]&&cache[_ajaxoptions.url].data===cachedata?status=cache[_ajaxoptions.url].status:(LT.ajax(_ajaxoptions),cache[_ajaxoptions.url]={data:cachedata,status:status}),status||(_validity.valid=!1,_validity.customErrorMsg=rule.message.replace(/\$/g,_validity.name)));break;case"repassword":_passwordlist=$(_element).closest("form").find("input:password"),_password=_passwordlist.not(":last").filter(":last"),rule.message=rule.message||"两次输入的密码不一致！",""!==_value&&1===_password.length&&_password.val()!==_value&&(_validity.valid=!1,_validity.customErrorMsg=rule.message.replace(/\$2/g,_password.attr("validate-title")||"").replace(/\$1/g,_validity.name));break;case"idcard":rule.message=rule.message||"$填写不正确！",""===_value||/^\d{17}[xX\d]$|^\d{15}$/.test(_value)||(_validity.valid=!1,_validity.customErrorMsg=rule.message.replace(/\$/g,_validity.name));break;case"dynrule":_dynrule=that.config.dynrule,_dynrule&&"function"==typeof _dynrule[rule.message]&&that._ruleCompile(_element,_dynrule[rule.message].call(_element),_validity);break;case"dyncheck":_dyncheck=that.config.dyncheck,_dyncheck&&"function"==typeof _dyncheck[rule.message]&&(_dynresult=_dyncheck[rule.message].call(_element),_dynresult&&_dynresult.customErrorMsg&&(_dynresult.customErrorMsg=_dynresult.customErrorMsg.replace(/\$/g,_validity.name)),$.extend(_validity,_dynresult))}if(!_validity.valid)break}},validate:function(_element){var that=this,$element=_element||$(that.element),elements=new Array;return $element.is("[validate-rules]")||($element=$element.find("[validate-rules]")),$element.each(function(){var validity={element:$(this),name:$(this).attr("validate-title")||"该字段",valid:!0,customErrorMsg:""},rules=new Array;try{rules=eval($(this).attr("validate-rules")||[])}catch(e){}that._ruleCompile(this,rules,validity),$(this).attr("data-valid",validity.valid).data("validity",validity),elements.push(validity)}),elements},scan:function(){var i,that=this,$form=$(that.element),result=that.validate(),data={valid:!0};for(i=0;i<result.length;i++)if(!result[i].valid){data.firstError=result[i],data.valid=!1;break}return data.result=result,that.config.scan&&that.config.scan.call($form,data),data},option:function(){var that=this;return 0===arguments.length?that.config:1===arguments.length?that.config[arguments[0]]:(that.config[arguments[0]]=arguments[1],that)},destroy:function(){var that=this;delete list[that.id]}},LTJQ.fn._init.prototype=LTJQ.fn,LTJQ.defaults={scan:$.noop,success:!1},$.fn[ns]=$.fn[ns]||function(){return LTJQ.apply(this,arguments)}}(window.jQuery,window);