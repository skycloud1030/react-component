(this.webpackJsonp=this.webpackJsonp||[]).push([[2],{307:function(e,t,n){"use strict";n(277),n(272);var a=n(103),r=n.n(a),i=n(154),c=n.n(i),o=(n(304),n(302),n(411),function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3e4,n=null,a=null,r=!1,i=new Promise(function(e,t){n=function(){t("Request timed out!!")}}),c=new Promise(function(e,t){a=function(){!r&&t("Ajax Abort")}}),o=setTimeout(function(){n()},t),l=e.then(function(e){return clearTimeout(o),r=!0,e}),s=Promise.race([i,c,l]);return s.abort=a,s}),l=n(412),s=n.n(l),u=(n(323),n(413)),m=n.n(u),f=n(344),h=n.n(f),p=[{name:"machine710",ip:"127.0.0.1"},{name:"machine720",ip:"127.0.0.2"},{name:"machine510",ip:"127.0.0.3"},{name:"machine310",ip:"127.0.0.4"}],d=["System","Security","Configuration"],v=["Start compression task for 0 volumes","Apply changes; modules: iscsitarget","Change iSCSI target settings of lab07-clone","Start deduplication task for 0 volumes"],g=["Info","Warning","Error"];n.d(t,"a",function(){return b});var b=function e(){var t=this;r()(this,e),c()(this,"postAPI",function(e,n){var a={method:"post",body:JSON.stringify(n)};return t.RESTfulCall(e,a)}),c()(this,"RESTfulCall",function(e,t){return o(function(e){return new Promise(function(t){switch(e){case"/api/logs":t(m()(1e3,function(){var e=h.a.random.arrayElement(p);return{name:e.name,ip:e.ip,catalog:h.a.random.arrayElement(d),content:h.a.random.arrayElement(v),level:h.a.random.arrayElement(g),time:h.a.date.between("2019-04-20","2019-04-28")}}));break;case"/api/dashboard":t(m()(50,function(){return{name:"Machine_"+h.a.random.number()}}));break;case"/api/dashboard/state":var n=h.a.internet.ip();t({physical_total:s()(549755813888,1099511627776),physical_used:s()(549755813888,522268023193.6),healthy:h.a.random.boolean(),ip:n,ipv4:n,ipv6:h.a.internet.ipv6(),model:"P710"});break;default:t([])}})}("/api".concat(e)).then(function(e){return e.json?e.json():e}).then(function(e){return new Promise(function(t){setTimeout(function(){t(e)},100)})}).catch(function(e){return Promise.reject(e)}))})}},344:function(e,t,n){e.exports=n(263)(4)},566:function(e,t,n){var a=n(567);"string"==typeof a&&(a=[[e.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(89)(a,r);a.locals&&(e.exports=a.locals)},567:function(e,t,n){(t=e.exports=n(88)(!1)).push([e.i,".progress_center_1bEug {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 180px;\n}\n\n.progress_subTitle_3WDq- {\n  font-size: 14px;\n  margin-top: 12px;\n}\n",""]),t.locals={center:"progress_center_1bEug",subTitle:"progress_subTitle_3WDq-"}},601:function(e,t,n){var a=n(602);"string"==typeof a&&(a=[[e.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(89)(a,r);a.locals&&(e.exports=a.locals)},602:function(e,t,n){(t=e.exports=n(88)(!1)).push([e.i,".machine_title_3r4gi {\n  min-height: 32px;\n}\n.machine_healthy_1TUMJ {\n  color: #52c41a;\n  margin-right: 8px;\n  font-size: 26px;\n  vertical-align: middle;\n}\n.machine_error_3n1xm {\n  color: #f5222d;\n  margin-right: 8px;\n  font-size: 26px;\n  vertical-align: middle;\n}\n.machine_loading_1Yijf {\n  color: #1890ff;\n  margin-right: 8px;\n  font-size: 26px;\n  vertical-align: middle;\n}\n",""]),t.locals={title:"machine_title_3r4gi",healthy:"machine_healthy_1TUMJ",error:"machine_error_3n1xm",loading:"machine_loading_1Yijf"}},690:function(e,t,n){"use strict";n.r(t);var a=n(422),r=n.n(a),i=n(417),c=n.n(i),o=n(638),l=n.n(o),s=n(432),u=n.n(s),m=n(282),f=n.n(m),h=n(1),p=n.n(h),d=n(415),v=n.n(d),g=n(603),b=n.n(g),y=(n(323),n(21)),E=n.n(y),_=n(582),x=n.n(_),j=n(501),S=n.n(j),T=n(502),w=n.n(T),k=n(558),O=n.n(k),I=n(392),N=n.n(I),C=n(561),P=n.n(C),R=n(562),A=n.n(R),J=n(565),q=n.n(J),z=n(566),M=n.n(z),W=n(568),F=n(127),D={error:"#f5222d",warning:"#faad14",success:"#52c41a"};var H=p.a.memo(function(e){var t=Object(W.a)({init:!0,value:0,color:D.default,total:""}),n=f()(t,2),a=n[0],r=n[1];return Object(h.useEffect)(function(){var t,n=e.capacity,a=n.physical_total,i=void 0===a?0:a,c=n.physical_used,o=void 0===c?0:c,l=A()(function(e){return P()(e,i)},function(e){return N()(e,2)},O()(100),w.a)(o);switch(!0){case l>=90:t=D.error;break;case l>=70:t=D.warning;break;case l>=0:t=D.success}r({init:!1,value:S()(l,0),text:S()(l,"N/A"),color:t,total:q()(i).format("0.[0] b")})},[e.capacity]),p.a.createElement("div",{className:M.a.center},a.init?null:p.a.createElement(F.a,{query:"(max-width: 576px)"},function(e){return p.a.createElement(x.a,{type:"circle",width:e?120:160,strokeWidth:8,strokeColor:a.color,percent:a.value,format:function(){return p.a.createElement(p.a.Fragment,null,p.a.createElement("div",{className:M.a.title,style:{color:a.color}},"".concat(a.text," %")),p.a.createElement("div",{className:M.a.subTitle,style:{color:a.color}},"".concat(a.total)))}})}))}),U=n(307),Y=n(601),B=n.n(Y);var G=p.a.memo(function(e){var t=Object(h.useState)(function(){return new U.a}),n=f()(t,1)[0],a=Object(h.useState)(!0),r=f()(a,2),i=r[0],c=r[1],o=Object(h.useState)([]),l=f()(o,2),s=l[0],u=l[1],m=Object(h.useState)({healthy:"loading"}),d=f()(m,2),g=d[0],y=d[1];Object(h.useEffect)(function(){var e,t=n.RESTfulCall("/dashboard/state");return t.then(function(t){var n=t.physical_total,a=t.physical_used,r=t.healthy,i=t.ip;e=setTimeout(function(){u({physical_total:n,physical_used:a}),c(!1),y({healthy:r?"success":"error",ip:i})},800)}),function(){t&&t.abort(),e&&clearTimeout(e)}},[]);var _=Object(h.useMemo)(function(){var t,n=g.healthy,a=g.ip;switch(n){case"success":t=p.a.createElement(E.a,{type:"check-circle",theme:"filled",className:B.a.healthy});break;case"error":t=p.a.createElement(E.a,{type:"close-circle",theme:"filled",className:B.a.error});break;default:t=p.a.createElement(E.a,{type:"sync",spin:!0,className:B.a.loading})}return p.a.createElement(p.a.Fragment,null,p.a.createElement("div",{className:B.a.title},t," ",e.name),p.a.createElement("div",{className:B.a.title,style:{marginTop:8}},a?p.a.createElement(b.a,{color:"volcano"},a):null))},[e.name,g]);return p.a.createElement(v.a,{title:_,loading:i,bodyStyle:{minHeight:230}},p.a.createElement(H,{capacity:s}))}),K=n(689);function L(e){var t=Object(h.useRef)(null),n=Object(K.a)(t),a=Object(h.useState)(!1),r=f()(a,2),i=r[0],c=r[1],o=e.height,l=e.throttle,s=void 0===l?200:l;return Object(h.useEffect)(function(){var t;switch(!0){case e.unmountIfInvisible:t=setTimeout(function(){return c("visible"===n)},s);break;case"visible"===n:t=setTimeout(function(){return c(!0)},s)}return function(){return t&&clearTimeout(t)}},[n]),p.a.createElement("div",{ref:t,style:{minHeight:o,width:"100%"}},i?e.children:null)}t.default=p.a.memo(function(){var e=Object(h.useState)([]),t=f()(e,2),n=t[0],a=t[1],i=Object(h.useState)(function(){return new U.a}),o=f()(i,1)[0];return Object(h.useEffect)(function(){var e=o.RESTfulCall("/dashboard");return e.then(function(e){return a(e)}),function(){return e&&e.abort()}},[]),p.a.createElement(p.a.Fragment,null,p.a.createElement(l.a,{grid:{xxl:3,lg:2,md:1,xs:1}},p.a.createElement(c.a,{gutter:16},u()(n,function(e,t){return p.a.createElement(l.a.Item,{key:t},p.a.createElement(L,{height:340,throttle:200,unmountIfInvisible:!0},p.a.createElement(G,e)))}))),p.a.createElement(r.a,null))})}}]);