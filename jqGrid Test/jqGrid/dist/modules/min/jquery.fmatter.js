!function(r){"use strict";"function"==typeof define&&define.amd?define(["jquery","./grid.base"],function(e){return r(e)}):"object"==typeof module&&module.exports?module.exports=function(e,t){return e||(e=window),void 0===t&&(t="undefined"!=typeof window?require("jquery"):require("jquery")(e)),require("./grid.base"),r(t),t}:r(jQuery)}(function(x){"use strict";x.jgrid=x.jgrid||{};var g=x.jgrid,v=g.getMethod("getGridRes"),b=x.fn.jqGrid;x.fmatter=x.fmatter||{};var y=x.fmatter,w=function(e,t){var r=e.formatoptions||{};return r.hasOwnProperty(t)?r[t]:(e.editoptions||{})[t]},C=function(e){return String(e).replace(/\'/g,"&#39;")},o=function(e){var t,r,i=e.colModel||e.cm,n=!1!==i.title?" title='"+C(e.colName||i.name)+"'":"",o=function(e){return w(i,e)},a=o("checkedClass"),l=o("uncheckedClass"),s=o("value"),c="string"==typeof s&&s.split(":")[0]||"Yes",u="string"==typeof s&&s.split(":")[1]||"No",d=function(e){return"<i class='"+C(e)+"'"+n+"></i>"},f=o("disabled");void 0===f&&(f=g.formatter.checkbox.disabled);var m=b.getIconRes.call(this,"checkbox.checked"),p=b.getIconRes.call(this,"checkbox.checkedClasses"),h=b.getIconRes.call(this,"checkbox.unchecked");return!0===f&&(a||l||m||h)?(t=d(a||m),r=d(l||h),a=p||(a||m)):(t="<input type='checkbox' checked='checked'"+(n+=!(a="")===f?" disabled='disabled'":"")+" />",r="<input type='checkbox'"+n+" />"),{checkedClasses:a,checked:t,unchecked:r,yes:c,no:u}},n={1:1,x:1,true:1,yes:1,y:1,on:1},a={0:1,false:1,no:1,n:1,off:1};x.extend(!0,g,{formatter:{date:{parseRe:/[#%\\\/:_;.,\t\s\-]/,masks:{ISO8601Long:"Y-m-d H:i:s",ISO8601Short:"Y-m-d",SortableDateTime:"Y-m-d\\TH:i:s",UniversalSortableDateTime:"Y-m-d H:i:sO"},reformatAfterEdit:!0,userLocalTime:!1},baseLinkUrl:"",showAction:"",target:"",checkbox:{disabled:!0,defaultValue:!1},idName:"id"},cmTemplate:{integerStr:{formatter:"integer",align:"right",sorttype:"integer",searchoptions:{sopt:["eq","ne","lt","le","gt","ge"]}},integer:{formatter:"integer",align:"right",sorttype:"integer",convertOnSave:function(e){var t=e.newValue;return isNaN(t)?t:parseInt(t,10)},searchoptions:{sopt:["eq","ne","lt","le","gt","ge"]}},numberStr:{formatter:"number",align:"right",sorttype:"number",searchoptions:{sopt:["eq","ne","lt","le","gt","ge"]}},number:{formatter:"number",align:"right",sorttype:"number",convertOnSave:function(e){var t=e.newValue;return isNaN(t)?t:parseFloat(t)},searchoptions:{sopt:["eq","ne","lt","le","gt","ge"]}},booleanCheckbox:{align:"center",formatter:"checkbox",sorttype:"boolean",edittype:"checkbox",editoptions:{value:"true:false",defaultValue:"false"},convertOnSave:function(e){var t=e.newValue,r=o.call(this,e),i=String(t).toLowerCase();return n[i]||i===r.yes.toLowerCase()?t=!0:(a[i]||i===r.no.toLowerCase())&&(t=!1),t},stype:"checkbox",searchoptions:{sopt:["eq"],value:"true:false"}},actions:function(){return{formatter:"actions",width:(null!=this.p&&(b.isInCommonIconClass.call(this,"fa")||b.isInCommonIconClass.call(this,"glyphicon"))?x(this).jqGrid("isBootstrapGuiStyle")?45:39:40)+(g.cellWidth()?5:0),align:"center",label:"",autoResizable:!1,title:!1,frozen:!0,fixed:!0,hidedlg:!0,resizable:!1,sortable:!1,search:!1,editable:!1,viewable:!1}}}}),g.cmTemplate.booleanCheckboxFa=g.cmTemplate.booleanCheckbox,x.extend(y,{isObject:function(e){return e&&("object"==typeof e||x.isFunction(e))||!1},isNumber:function(e){return"number"==typeof e&&isFinite(e)},isValue:function(e){return this.isObject(e)||"string"==typeof e||this.isNumber(e)||"boolean"==typeof e},isEmpty:function(e){return("string"==typeof e||!this.isValue(e))&&(!this.isValue(e)||""===(e=x.trim(e).replace(/&nbsp;/gi,"").replace(/&#160;/gi,"")))},NumberFormat:function(e,t){var r=y.isNumber;if(r(e)||(e*=1),r(e)){var i,n=e<0,o=String(e),a=t.decimalSeparator||".";if(r(t.decimalPlaces)){var l=t.decimalPlaces;if(i=(o=String(Number(Math.round(e+"e"+l)+"e-"+l))).lastIndexOf("."),0<l)for(i<0?i=(o+=a).length-1:"."!==a&&(o=o.replace(".",a));o.length-1-i<l;)o+="0"}if(t.thousandsSeparator){var s=t.thousandsSeparator;i=-1<(i=o.lastIndexOf(a))?i:o.length;var c,u=void 0===t.decimalSeparator?"":o.substring(i),d=-1;for(c=i;0<c;c--)++d%3==0&&c!==i&&(!n||1<c)&&(u=s+u),u=o.charAt(c-1)+u;o=u}return o}return e}});var k=function(e,t,r,i,n){var o=t;r=x.extend({},v.call(x(this),"formatter"),r);try{o=x.fn.fmatter[e].call(this,t,r,i,n)}catch(e){}return o};(x.fn.fmatter=k).getCellBuilder=function(e,t,r){var i=null!=x.fn.fmatter[e]?x.fn.fmatter[e].getCellBuilder:null;return x.isFunction(i)?i.call(this,x.extend({},v.call(x(this),"formatter"),t),r):null};var j=k.defaultFormat=function(e,t){return y.isValue(e)&&""!==e?e:t.defaultValue||"&#160;"},i=function(e,t,r){if(void 0===e||y.isEmpty(e)){var i=w(r,"defaultValue");void 0===i&&(i=t.no),e=i}return e=String(e).toLowerCase(),n[e]||e===t.yes.toLowerCase()?t.checked:t.unchecked};k.email=function(e,t){return y.isEmpty(e)?j(e,t):"<a href='mailto:"+C(e)+"'>"+e+"</a>"},(k.checkbox=function(e,t){var r=o.call(this,t);return i(e,r,t.colModel)}).getCellBuilder=function(e){var t,r=e.colModel;return e.colName=e.colName||this.p.colNames[e.pos],t=o.call(this,e),function(e){return i(e,t,r)}},k.checkbox.unformat=function(e,t,r){var i=o.call(this,t),n=x(r);return(i.checkedClasses?g.hasAllClasses(n.children("i,svg"),i.checkedClasses):n.children("input").is(":checked"))?i.yes:i.no},(k.checkboxFontAwesome4=k.checkbox).getCellBuilder=k.checkbox.getCellBuilder,k.checkboxFontAwesome4.unformat=k.checkbox.unformat,k.link=function(e,t){var r=t.colModel,i="",n={target:t.target};return null!=r&&(n=x.extend({},n,r.formatoptions||{})),n.target&&(i="target="+n.target),y.isEmpty(e)?j(e,n):"<a "+i+" href='"+C(e)+"'>"+e+"</a>"},(k.showlink=function(t,r,i){var e,n,o,a=this,l=r.colModel,s={baseLinkUrl:r.baseLinkUrl,showAction:r.showAction,addParam:r.addParam||"",target:r.target,idName:r.idName,hrefDefaultValue:"#"},c="",u=function(e){return x.isFunction(e)?e.call(a,{cellValue:t,rowid:r.rowId,rowData:i,options:s}):e||""};return null!=l&&(s=x.extend({},s,l.formatoptions||{})),s.target&&(c="target="+u(s.target)),e=u(s.baseLinkUrl)+u(s.showAction),n=s.idName?encodeURIComponent(u(s.idName))+"="+encodeURIComponent(u(s.rowId)||r.rowId):"","object"==typeof(o=u(s.addParam))&&null!==o&&(o=(""!==n?"&":"")+x.param(o)),""===(e+=n||o?"?"+n+o:"")&&(e=u(s.hrefDefaultValue)),"string"==typeof t||y.isNumber(t)||x.isFunction(s.cellValue)?"<a "+c+" href='"+C(e)+"'>"+(x.isFunction(s.cellValue)?u(s.cellValue):t)+"</a>":j(t,s)}).getCellBuilder=function(e){var u={baseLinkUrl:e.baseLinkUrl,showAction:e.showAction,addParam:e.addParam||"",target:e.target,idName:e.idName,hrefDefaultValue:"#"},t=e.colModel;return null!=t&&(u=x.extend({},u,t.formatoptions||{})),function(t,e,r){var i,n,o,a=this,l=e.rowId,s="",c=function(e){return x.isFunction(e)?e.call(a,{cellValue:t,rowid:l,rowData:r,options:u}):e||""};return u.target&&(s="target="+c(u.target)),i=c(u.baseLinkUrl)+c(u.showAction),n=u.idName?encodeURIComponent(c(u.idName))+"="+encodeURIComponent(c(l)||e.rowId):"","object"==typeof(o=c(u.addParam))&&null!==o&&(o=(""!==n?"&":"")+x.param(o)),""===(i+=n||o?"?"+n+o:"")&&(i=c(u.hrefDefaultValue)),"string"==typeof t||y.isNumber(t)||x.isFunction(u.cellValue)?"<a "+s+" href='"+C(i)+"'>"+(x.isFunction(u.cellValue)?c(u.cellValue):t)+"</a>":j(t,u)}},k.showlink.pageFinalization=function(e){var t,r,i,o=x(this),a=this.p,n=a.colModel[e],l=a.autoResizing.wrapperClassName,s=this.rows,c=s.length,u=function(e){var t=x(this).closest("tr.jqgrow>td"),r=t.parent(),i=t[0].cellIndex,n=a.colModel[i];if(0<r.length)return n.formatoptions.onClick.call(o[0],{iCol:i,iRow:r[0].rowIndex,rowid:r.attr("id"),cm:n,cmName:n.name,cellValue:x(this).text(),a:this,event:e})};if(null!=n.formatoptions&&x.isFunction(n.formatoptions.onClick))for(t=0;t<c;t++)r=s[t],x(r).hasClass("jqgrow")&&(i=r.cells[e],n.autoResizable&&null!=i&&x(i.firstChild).hasClass(l)&&(i=i.firstChild),null!=i&&x(i.firstChild).on("click",u))};var l=function(e,t){return e=t.prefix?t.prefix+e:e,t.suffix?e+t.suffix:e},r=function(e,t,r){var i=t.colModel,n=x.extend({},t[r]);return null!=i&&(n=x.extend({},n,i.formatoptions||{})),y.isEmpty(e)?l(n.defaultValue,n):l(y.NumberFormat(e,n),n)};k.integer=function(e,t){return r(e,t,"integer")},k.number=function(e,t){return r(e,t,"number")},k.currency=function(e,t){return r(e,t,"currency")};var t=function(e,t){var r=e.colModel,i=x.extend({},e[t]);null!=r&&(i=x.extend({},i,r.formatoptions||{}));var n=y.NumberFormat,o=i.defaultValue?l(i.defaultValue,i):"";return function(e){return y.isEmpty(e)?o:l(n(e,i),i)}};k.integer.getCellBuilder=function(e){return t(e,"integer")},k.number.getCellBuilder=function(e){return t(e,"number")},k.currency.getCellBuilder=function(e){return t(e,"currency")},(k.date=function(e,t,r,i){var n=t.colModel,o=x.extend({},t.date);return null!=n&&(o=x.extend({},o,n.formatoptions||{})),o.reformatAfterEdit||"edit"!==i?y.isEmpty(e)?j(e,o):g.parseDate.call(this,o.srcformat,e,o.newformat,o):j(e,o)}).getCellBuilder=function(e,t){var r=x.extend({},e.date);null!=e.colModel&&(r=x.extend({},r,e.colModel.formatoptions||{}));var i=g.parseDate,n=r.srcformat,o=r.newformat;return r.reformatAfterEdit||"edit"!==t?function(e){return y.isEmpty(e)?j(e,r):i.call(this,n,e,o,r)}:function(e){return j(e,r)}},(k.select=function(e,t){var r,i=[],n=t.colModel,o=x.extend({},n.editoptions||{},n.formatoptions||{}),a="function"==typeof o.value?o.value():o.value,l=o.separator||":",s=o.delimiter||";";if(a){var c,u=!0===o.multiple,d=[],f=function(e,t){if(0<t)return e};if(u&&(d=x.map(String(e).split(","),function(e){return x.trim(e)})),"string"==typeof a){var m,p,h=a.split(s);for(m=0;m<h.length;m++)if(2<(c=h[m].split(l)).length&&(c[1]=x.map(c,f).join(l)),p=x.trim(c[0]),o.defaultValue===p&&(r=c[1]),u)-1<x.inArray(p,d)&&i.push(c[1]);else if(p===x.trim(e)){i=[c[1]];break}}else y.isObject(a)&&(r=a[o.defaultValue],i=u?x.map(d,function(e){return a[e]}):[void 0===a[e]?"":a[e]])}return""!==(e=i.join(", "))?e:void 0!==o.defaultValue?r:j(e,o)}).getCellBuilder=function(e){var n,t,r,i,o=e.colModel,a=k.defaultFormat,l=x.extend({},o.editoptions||{},o.formatoptions||{}),s="function"==typeof l.value?l.value():l.value,c=l.separator||":",u=l.delimiter||";",d=void 0!==l.defaultValue,f=!0===l.multiple,m={},p=function(e,t){if(0<t)return e};if("string"==typeof s)for(i=(r=s.split(u)).length-1;0<=i;i--)2<(t=r[i].split(c)).length&&(t[1]=x.map(t,p).join(c)),m[x.trim(t[0])]=t[1];else{if(!y.isObject(s))return function(e){return e?String(e):a(e,l)};m=s}return d&&(n=m[l.defaultValue]),f?function(e){var t,r=[],i=x.map(String(e).split(","),function(e){return x.trim(e)});for(t=0;t<i.length;t++)e=i[t],m.hasOwnProperty(e)&&r.push(m[e]);return""!==(e=r.join(", "))?e:d?n:a(e,l)}:function(e){var t=m[String(e)];return""!==t&&void 0!==t?t:d?n:a(e,l)}},k.rowactions=function(e,t){var r,i,n,o,a=x(this).closest("tr.jqgrow>td"),l=a.parent(),s=l.attr("id"),c=x(this).closest("table.ui-jqgrid-btable").attr("id").replace(/_frozen([^_]*)$/,"$1"),u=x("#"+g.jqID(c)),d=u[0],f=d.p,m=g.getRelativeRect.call(d,l).top,p=f.colModel[a[0].cellIndex],h=x.extend(!0,{extraparam:{}},g.actionsNav||{},f.actionsNavOptions||{},p.formatoptions||{});switch(void 0!==f.editOptions&&(h.editOptions=x.extend(!0,h.editOptions||{},f.editOptions)),void 0!==f.delOptions&&(h.delOptions=f.delOptions),l.hasClass("jqgrid-new-row")&&(h.extraparam[f.prmNames.oper]=f.prmNames.addoper),o={keys:h.keys,oneditfunc:h.onEdit,successfunc:h.onSuccess,url:h.url,extraparam:h.extraparam,aftersavefunc:h.afterSave,errorfunc:h.onError,afterrestorefunc:h.afterRestore,restoreAfterError:h.restoreAfterError,mtype:h.mtype},!f.multiselect&&s!==f.selrow||f.multiselect&&x.inArray(s,f.selarrrow)<0?u.jqGrid("setSelection",s,!0,e):g.fullBoolFeedback.call(d,"onSelectRow","jqGridSelectRow",s,!0,e),t){case"edit":u.jqGrid("editRow",s,o);break;case"save":u.jqGrid("saveRow",s,o);break;case"cancel":u.jqGrid("restoreRow",s,h.afterRestore);break;case"del":h.delOptions=h.delOptions||{},void 0===h.delOptions.top&&(h.delOptions.top=m),u.jqGrid("delGridRow",s,h.delOptions);break;case"formedit":h.editOptions=h.editOptions||{},void 0===h.editOptions.top&&(h.editOptions.top=m,h.editOptions.recreateForm=!0),u.jqGrid("editGridRow",s,h.editOptions);break;default:if(null!=h.custom&&0<h.custom.length)for(i=h.custom.length,r=0;r<i;r++)(n=h.custom[r]).action===t&&x.isFunction(n.onClick)&&n.onClick.call(d,{rowid:s,event:e,action:t,options:n})}return e.stopPropagation&&e.stopPropagation(),!1},(k.actions=function(e,t,r,i){var n,o,a,l=t.rowId,s="",c=x(this),u={},d=v.call(c,"edit")||{},f=x.extend({editbutton:!0,delbutton:!0,editformbutton:!1,commonIconClass:"ui-icon",editicon:"ui-icon-pencil",delicon:"ui-icon-trash",saveicon:"ui-icon-disk",cancelicon:"ui-icon-cancel",savetitle:d.bSubmit||"",canceltitle:d.bCancel||""},v.call(c,"nav")||{},g.nav||{},this.p.navOptions||{},v.call(c,"actionsNav")||{},g.actionsNav||{},this.p.actionsNavOptions||{},(t.colModel||{}).formatoptions||{}),m=[{action:"edit",actionName:"formedit",display:f.editformbutton},{action:"edit",display:!f.editformbutton&&f.editbutton},{action:"del",idPrefix:"Delete",display:f.delbutton},{action:"save",display:f.editformbutton||f.editbutton,hidden:!0},{action:"cancel",display:f.editformbutton||f.editbutton,hidden:!0}],p=function(e){var t,r=e.action,i=e.actionName||r,n=void 0!==e.idPrefix?e.idPrefix:r.charAt(0).toUpperCase()+r.substring(1);return"<div title='"+C(f[r+"title"])+(e.hidden?"' style='display:none;":"")+"' class='"+C(c.jqGrid("getGuiStyles","actionsButton","ui-pg-div ui-inline-"+r))+"' "+(null!==n?"id='j"+C(n+"Button_"+l):"")+"' data-jqactionname=\""+i+'" '+(e.noHovering?"":'\' data-jqhovering="1" ')+"><span class='"+C((t=r,g.mergeCssClasses(f.commonIconClass,f[t+"icon"])))+"'></span></div>"},h=null!=f.custom?f.custom.length-1:-1;if(void 0===l||y.isEmpty(l))return"";if(x.isFunction(f.isDisplayButtons))try{u=f.isDisplayButtons.call(this,f,r,i)||{}}catch(e){}for(;0<=h;)m["first"===(a=f.custom[h--]).position?"unshift":"push"](a);for(n=0,h=m.length;n<h;n++)!1!==(o=x.extend({},m[n],u[m[n].action]||{})).display&&(s+=p(o));return"<div class='"+C(c.jqGrid("getGuiStyles","actionsDiv","ui-jqgrid-actions"))+"'>"+s+"</div>"}).pageFinalization=function(e){var t,r,i,s,c=x(this),u=this.p,n=u.colModel[e],o=u.autoResizing.wrapperClassName,a=c.jqGrid("getGuiStyles","states.hover"),l=this.rows,d=this.grid.fbRows,f=l.length,m=(s=n.name,function(e,t){var r,i,n=0,o=u.colModel,a=o.length,l=u.iColByName[s];for(i=0;i<a&&!0===o[i].frozen;i++)n=i;null!=t&&null!=t.cells&&(r=x(t.cells[l]).children(".ui-jqgrid-actions"),o[l].frozen&&u.frozenColumns&&l<=n&&(r=r.add(x(c[0].grid.fbRows[t.rowIndex].cells[l]).children(".ui-jqgrid-actions"))),e?(r.find(">.ui-inline-edit,>.ui-inline-del").show(),r.find(">.ui-inline-save,>.ui-inline-cancel").hide()):(r.find(">.ui-inline-edit,>.ui-inline-del").hide(),r.find(">.ui-inline-save,>.ui-inline-cancel").show()))}),p=function(e,t){var r=c.jqGrid("getGridRowById",t);return m(!0,r),!1},h=function(e,t){var r=c.jqGrid("getGridRowById",t);return m(!1,r),!1},g=function(e){1===x(e.target).closest("div.ui-pg-div").data("jqhovering")&&x(this).addClass(a)},v=function(e){1===x(e.target).closest("div.ui-pg-div").data("jqhovering")&&x(this).removeClass(a)},b=function(e){return k.rowactions.call(this,e,x(e.target).closest("div.ui-pg-div").data("jqactionname"))},y=function(e,t){t&&null!=e&&x(e.firstChild).hasClass(o)&&(e=e.firstChild),null!=e&&(x(e.firstChild).on("click",b),x(e.firstChild).children("div.ui-pg-div").on("mouseover",g).on("mouseout",v))},w=(i=n.name,function(e,t){var r=u.iColByName[i];y(t.tr.cells[r],u.colModel[r].autoResizable)});for(null!=n.formatoptions&&n.formatoptions.editformbutton||(c.off("jqGridInlineAfterRestoreRow.jqGridFormatter jqGridInlineAfterSaveRow.jqGridFormatter",p),c.on("jqGridInlineAfterRestoreRow.jqGridFormatter jqGridInlineAfterSaveRow.jqGridFormatter",p),c.off("jqGridInlineEditRow.jqGridFormatter",h),c.on("jqGridInlineEditRow.jqGridFormatter",h),c.off("jqGridAfterAddRow.jqGridFormatter",w),c.on("jqGridAfterAddRow.jqGridFormatter",w)),t=0;t<f;t++)r=l[t],x(r).hasClass("jqgrow")&&(y(r.cells[e],n.autoResizable),null!=d&&null!=d[t]&&y(d[t].cells[e],n.autoResizable))},x.unformat=function(e,t,r,i){var n,o=t.colModel,a=o.formatter,l=this.p,s=o.formatoptions||{},c=o.unformat||k[a]&&k[a].unformat;if(e instanceof jQuery&&0<e.length&&(e=e[0]),l.treeGrid&&null!=e&&x(e.firstChild).hasClass("tree-wrap")&&(x(e.lastChild).hasClass("cell-wrapper")||x(e.lastChild).hasClass("cell-wrapperleaf"))&&(e=e.lastChild),o.autoResizable&&null!=e&&x(e.firstChild).hasClass(l.autoResizing.wrapperClassName)&&(e=e.firstChild),void 0!==c&&x.isFunction(c))n=c.call(this,x(e).text(),t,e);else if(void 0!==a&&"string"==typeof a){var u=x(this),d=function(e,t){return void 0!==s[t]?s[t]:v.call(u,"formatter."+e+"."+t)},f=function(e,t){var r=d(e,"thousandsSeparator").replace(/([\.\*\_\'\(\)\{\}\+\?\\])/g,"\\$1");return t.replace(new RegExp(r,"g"),"")};switch(a){case"integer":n=f("integer",x(e).text());break;case"number":n=f("number",x(e).text()).replace(d("number","decimalSeparator"),".");break;case"currency":n=x(e).text();var m=d("currency","prefix"),p=d("currency","suffix");m&&m.length&&(n=n.substr(m.length)),p&&p.length&&(n=n.substr(0,n.length-p.length)),n=f("number",n).replace(d("number","decimalSeparator"),".");break;case"checkbox":n=k.checkbox.unformat(e,t,e);break;case"select":n=x.unformat.select(e,t,r,i);break;case"actions":return"";default:n=x(e).text()}}return n=void 0!==n?n:!0===i?x(e).text():g.htmlDecode(x(e).html())},x.unformat.select=function(e,t,r,i){var n=[],o=x(e).text(),a=t.colModel;if(!0===i)return o;var l=x.extend({},a.editoptions||{},a.formatoptions||{}),s=void 0===l.separator?":":l.separator,c=void 0===l.delimiter?";":l.delimiter;if(l.value){var u,d="function"==typeof l.value?l.value():l.value,f=!0===l.multiple,m=[],p=function(e,t){if(0<t)return e};if(f&&(m=o.split(","),m=x.map(m,function(e){return x.trim(e)})),"string"==typeof d){var h,g=d.split(c),v=0;for(h=0;h<g.length;h++)if(2<(u=g[h].split(s)).length&&(u[1]=x.map(u,p).join(s)),f)-1<x.inArray(x.trim(u[1]),m)&&(n[v]=u[0],v++);else if(x.trim(u[1])===x.trim(o)){n[0]=u[0];break}}else(y.isObject(d)||x.isArray(d))&&(f||(m[0]=o),n=x.map(m,function(r){var i;if(x.each(d,function(e,t){if(t===r)return i=e,!1}),void 0!==i)return i}));return n.join(", ")}return o||""},x.unformat.date=function(e,t){var r=x.extend(!0,{},v.call(x(this),"formatter.date"),g.formatter.date||{},t.formatoptions||{});return y.isEmpty(e)?"":g.parseDate.call(this,r.newformat,e,r.srcformat,r)}});
//# sourceMappingURL=jquery.fmatter.js.map