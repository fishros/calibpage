var te=Object.defineProperty;var k=Object.getOwnPropertySymbols;var H=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable;var P=(t,e,u)=>e in t?te(t,e,{enumerable:!0,configurable:!0,writable:!0,value:u}):t[e]=u,q=(t,e)=>{for(var u in e||(e={}))H.call(e,u)&&P(t,u,e[u]);if(k)for(var u of k(e))I.call(e,u)&&P(t,u,e[u]);return t};var $=(t,e)=>{var u={};for(var m in t)H.call(t,m)&&e.indexOf(m)<0&&(u[m]=t[m]);if(t!=null&&k)for(var m of k(t))e.indexOf(m)<0&&I.call(t,m)&&(u[m]=t[m]);return u};import{l as ue,d as R,r as N,a as W,o as oe,E as O,b as ae,c as ne,e as le,f as se,g as re,h as ie,i as me,j as de,k as ce,m as ge,n as pe,p as fe,q as Fe,s as he,t as S,w as d,u as x,v as B,x as s,y as _,z as J,A as _e,F as be,B as z,C as v,D as Be,G as Ee,H as ye,I as we}from"./vendor.3fb533a1.js";const Ce=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))m(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&m(n)}).observe(document,{childList:!0,subtree:!0});function u(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function m(o){if(o.ep)return;o.ep=!0;const r=u(o);fetch(o.href,r)}};Ce();const T=async(t,e,o={})=>{var r=o,{data:u}=r,m=$(r,["data"]);console.log(t,"apiHost");const n=q({method:"GET"},m);return n.method.toUpperCase()==="GET"?(e+=`?${ue.stringify(u)}`,console.log("endponit",e)):n.body=JSON.stringify(u||{}),window.fetch(`${t}/${e}`,n).then(async g=>{const f=await g.json();return g.ok?f.data:Promise.reject(f)})},ve=t=>{let e="";try{e=JSON.stringify(t)}catch(u){console.warn(u)}return e},Te=t=>{let e;try{e=JSON.parse(t)}catch(u){console.warn(u)}return e},Z=(t,e)=>{window.localStorage.setItem(t,ve(e))},K=t=>{const e=window.localStorage.getItem(t);return Te(e||"")},Ae=()=>{const e=window.location.href.split("?")[1];if(!e)return{};const u=e.split("&"),m={};return u.forEach(o=>{const[r,n]=o.split("=");m[r]=decodeURIComponent(n)}),m},De=t=>{let e=new Date(t),u=e.getMonth()+1,m="-"+(u<10?"0"+u:u),o=e.getDate(),r="-"+(o<10?"0"+o:o),n=e.getHours(),g=" "+(n<10?"0"+n:n),f=e.getMinutes(),l=":"+(f<10?"0"+f:f),h=e.getSeconds(),E=":"+(h<10?"0"+h:h);return e.getFullYear()+m+r+g+l+E};var Q=(t,e)=>{const u=t.__vccOpts||t;for(const[m,o]of e)u[m]=o;return u};const Ve=R({name:"Home",setup(){let t,e=N();const u=N(),m=N("calibpage");let o=Ae(),r=o==null?void 0:o.apihost,n=o==null?void 0:o.msgid,g=Object.keys(o).length!==0;console.log(o,r,n,g);const f=N(),l=W({username:"",github:"",originText:"",latestText:"",newText:"",email:""}),h=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,E=/^https:\/\/github.com.*$/,A=W({username:[{min:2,max:25,message:"\u6635\u79F0\u957F\u5EA6\u9700\u8981\u4E3A2\u523025\u4E4B\u95F4",trigger:"blur"}],github:[{validator:(p,i,c)=>{i===""?c(new Error("\u8BF7\u8F93\u5165\u60A8\u7684github\u4E3B\u9875\u5730\u5740")):E.test(l.github)||c(new Error("github\u4E3B\u9875\u5730\u5740\u4E0D\u6B63\u786E\uFF0C\u8BF7\u4EE5https://github.com\u5F00\u5934")),c()},required:!0,trigger:"blur"}],newText:[{validator:(p,i,c)=>{i===""?c(new Error("\u8BF7\u8F93\u5165\u60A8\u6821\u51C6\u4E4B\u540E\u7684\u5185\u5BB9")):(l.newText.trim()===l.latestText&&c(new Error("\u8BF7\u8F93\u5165\u60A8\u6821\u51C6\u4E4B\u540E\u7684\u5185\u5BB9")),c())},required:!0,trigger:"blur"}],email:[{validator:(p,i,c)=>{i===""?c(new Error("\u8BF7\u8F93\u5165\u60A8\u7684\u90AE\u7BB1\u5730\u5740")):h.test(l.email)||c(new Error("\u90AE\u7BB1\u683C\u5F0F\u4E0D\u6B63\u786E")),c()},required:!0,trigger:"blur"}]}),y=async()=>{if(g){const p=K("tw");await T(r,"next_msg",{data:{msgid:parseInt(n,10)+1}}).then(i=>{if(l.originText=i==null?void 0:i.msgen,l.latestText=i==null?void 0:i.msgzh,l.newText=i==null?void 0:i.msgzh,n=i==null?void 0:i.msgid,p){const{name:c,github:F,email:w}=p;l.username=c,l.github=F,l.email=w}})}},D=async()=>{const p=K("tw");await T(r,"get_msg",{data:{msgid:n},method:"post"}).then(i=>{if(l.originText=i.msgen,l.latestText=i.msgzh,l.newText=i.msgzh,u.value=i.change_log,p){const{name:c,github:F,email:w}=p;l.username=c,l.github=F,l.email=w}})};oe(async()=>{g?(await D(),await V()):O.info("\u8BF7\u4ECE\u4E2D\u6587\u7F51\u9875\u9762\u8FDB\u5165")}),ae(async()=>{g&&(await V(),O.success("\u5DF2\u66F4\u65B0\u6392\u884C\u699C"))});const L=()=>{f.value.validate(p=>{if(p){const c={calibmsg:l.newText.trim(),msgid:n,name:l.username,github:l.github,email:l.email};T(r,"calib_msg",{data:c,method:"POST"}).then(async F=>{x({message:`\u63D0\u4EA4\u6210\u529F\uFF0C\u68D2\u68D2\u54D2\uFF01\u606D\u559C\u60A8\u5DF2\u7D2F\u8BA1\u6821\u51C6${F.calibcount}\u8BCD\u6C47`,type:"success",duration:6e3});const C=c,{calibmsg:w,msgid:ee}=C,M=$(C,["calibmsg","msgid"]);Z("tw",M),await D()}).catch(F=>{x.error(F)})}else O({title:"Error",message:"\u8F93\u5165\u6709\u8BEF\uFF0C\u8BF7\u68C0\u67E5\u60A8\u8F93\u5165\u7684\u5185\u5BB9",type:"error"})})},b=p=>{const c={calibmsg:l.newText.trim(),msgid:n,name:l.username,github:l.github,email:l.email,status:p};T(r,"calib_msg",{data:c,method:"POST"}).then(F=>{x({message:`\u63D0\u4EA4\u6210\u529F\uFF0C\u68D2\u68D2\u54D2\uFF01\u606D\u559C\u60A8\u5DF2\u7D2F\u8BA1\u6821\u51C6${F.calibcount}\u8BCD\u6C47`,type:"success",duration:6e3});const C=c,{calibmsg:w,msgid:ee}=C,M=$(C,["calibmsg","msgid"]);Z("tw",M)}).catch(F=>{x.error(F)})},a=(p,i)=>{console.log(p,i)},V=()=>{T(r,"calib_rank").then(p=>{console.log(p,"rankres"),e.value=p,console.log(e.value,"rankData")})};return{form:l,submitForm:L,submitFormWithStatus:b,data:t,rules:A,getNextMsg:y,formRef:f,changeLog:u,formatGMT:De,handleClickTab:a,rankData:e,activeName:m}}}),ke={class:"container"},$e=_("h2",{class:"title"},"\u5F00\u6E90\u4E92\u52A9\uFF0C\u5171\u540C\u63D0\u9AD8",-1),Ne={class:"btns"},Se=v("\u6807\u8BB0\u6807\u9898"),xe=v("\u6807\u8BB0\u65E0\u9700\u7FFB\u8BD1"),ze=v("\u63D0\u4EA4"),Le=v("\u4E0B\u4E00\u6761"),Me=_("h3",{class:"logTitle"},"\u6821\u51C6\u66F4\u65B0\u8BB0\u5F55\uFF1A",-1),Oe={class:"calibmsg-title"},je=["href"],Ue={key:1},Ge=["href"];function He(t,e,u,m,o,r){const n=ne,g=le,f=se,l=re,h=ie,E=me,j=de,U=ce,G=ge,A=pe,y=fe,D=Fe,L=he;return B(),S(L,{modelValue:t.activeName,"onUpdate:modelValue":e[8]||(e[8]=b=>t.activeName=b),onTabClick:t.handleClickTab,value:""},{default:d(()=>[s(A,{label:"\u6821\u51C6\u9875",name:"calibpage"},{default:d(()=>{var b;return[_("div",ke,[$e,s(E,{ref:"formRef",model:t.form,"label-width":"auto",rules:t.rules},{default:d(()=>[s(l,{justify:"center",align:"center"},{default:d(()=>[s(f,{span:8},{default:d(()=>[s(g,{label:"\u6635\u79F0\uFF1A",prop:"username"},{default:d(()=>[s(n,{modelValue:t.form.username,"onUpdate:modelValue":e[0]||(e[0]=a=>t.form.username=a),placeholder:"\u8BF7\u8F93\u5165\u60A8\u7684\u6635\u79F0"},null,8,["modelValue"])]),_:1})]),_:1}),s(f,{span:8},{default:d(()=>[s(g,{label:"github\u4E3B\u9875\uFF1A",prop:"github"},{default:d(()=>[s(n,{modelValue:t.form.github,"onUpdate:modelValue":e[1]||(e[1]=a=>t.form.github=a),placeholder:"\u8BF7\u8F93\u5165\u60A8\u7684github\u4E3B\u9875\u5730\u5740"},null,8,["modelValue"])]),_:1})]),_:1}),s(f,{span:8},{default:d(()=>[s(g,{label:"\u90AE\u7BB1\uFF1A",prop:"email"},{default:d(()=>[s(n,{modelValue:t.form.email,"onUpdate:modelValue":e[2]||(e[2]=a=>t.form.email=a),placeholder:"\u8BF7\u8F93\u5165\u60A8\u7684\u90AE\u7BB1\u5730\u5740"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),s(g,{label:"\u539F\u6587\u5185\u5BB9\uFF1A"},{default:d(()=>[s(n,{modelValue:t.form.originText,"onUpdate:modelValue":e[3]||(e[3]=a=>t.form.originText=a),type:"textarea",readonly:"",autosize:""},null,8,["modelValue"])]),_:1}),s(g,{label:"\u4E0A\u4E00\u7248\u672C\u7FFB\u8BD1\u5185\u5BB9\uFF1A"},{default:d(()=>[s(n,{modelValue:t.form.latestText,"onUpdate:modelValue":e[4]||(e[4]=a=>t.form.latestText=a),type:"textarea",autosize:"",readonly:""},null,8,["modelValue"])]),_:1}),s(g,{label:"\u65B0\u7684\u7FFB\u8BD1\u5185\u5BB9\uFF1A",prop:"newText"},{default:d(()=>[s(n,{modelValue:t.form.newText,"onUpdate:modelValue":e[5]||(e[5]=a=>t.form.newText=a),type:"textarea",autosize:"",placeholder:"\u8BF7\u8F93\u5165\u60A8\u6821\u51C6\u4E4B\u540E\u7684\u5185\u5BB9"},null,8,["modelValue"])]),_:1}),s(g,null,{default:d(()=>[_("div",Ne,[_("div",null,[s(h,{type:"primary",onClick:e[6]||(e[6]=a=>t.submitFormWithStatus(200))},{default:d(()=>[Se]),_:1}),s(h,{type:"primary",onClick:e[7]||(e[7]=a=>t.submitFormWithStatus(201))},{default:d(()=>[xe]),_:1})]),_("div",null,[s(h,{type:"primary",onClick:t.submitForm},{default:d(()=>[ze]),_:1},8,["onClick"]),s(h,{type:"primary",onClick:t.getNextMsg},{default:d(()=>[Le]),_:1},8,["onClick"])])])]),_:1})]),_:1},8,["model","rules"]),Me,((b=t.changeLog)==null?void 0:b.length)>0?(B(),S(G,{key:0},{default:d(()=>[(B(!0),J(be,null,_e(t.changeLog,(a,V)=>(B(),S(U,{placement:"top",key:V,timestamp:t.formatGMT(a==null?void 0:a.update_time)},{default:d(()=>[s(j,null,{default:d(()=>[_("h4",Oe,[_("a",{href:a==null?void 0:a.github,target:"_blank"},z(a==null?void 0:a.contributor),9,je),v(" \u66F4\u65B0\u4E8E "+z(t.formatGMT(a==null?void 0:a.update_time)),1)]),_("p",null,z(a==null?void 0:a.calibmsg),1)]),_:2},1024)]),_:2},1032,["timestamp"]))),128))]),_:1})):(B(),J("p",Ue,"\u5F53\u524D\u6682\u65E0\u6821\u51C6\u5185\u5BB9\uFF0C\u5FEB\u6765\u6821\u51C6\u5427~"))])]}),_:1}),s(A,{label:"\u6392\u884C\u699C",name:"rank"},{default:d(()=>[s(D,{data:t.rankData,style:{width:"70%"},"header-cell-style":{"text-align":"center",color:"#333"},border:""},{default:d(()=>[s(y,{type:"index",label:"\u6392\u540D",align:"center",width:"180"}),s(y,{prop:"name",label:"\u8D21\u732E\u8005\u540D\u79F0",align:"center"},{default:d(b=>[_("a",{href:b.row.github},z(b.row.name),9,Ge)]),_:1}),s(y,{prop:"p_count",label:"\u6821\u51C6\u6BB5\u843D\u603B\u8BA1",align:"center"})]),_:1},8,["data"])]),_:1})]),_:1},8,["modelValue","onTabClick"])}var Y=Q(Ve,[["render",He]]);const Ie=R({components:{Home:Y},name:"App",setup(){return{}}});function Pe(t,e,u,m,o,r){const n=Be("home");return B(),S(n)}var qe=Q(Ie,[["render",Pe]]);const Re=[{path:"/",redirect:"/home"},{path:"/home/:msgid",name:"Home",component:Y}],We=Ee({history:ye(),routes:Re}),X=we(qe);X.use(We);X.mount("#app");