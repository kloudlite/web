import{a as N,j as B}from"./jsx-runtime-29545a09.js";import{r as E}from"./index-76fb7be0.js";import{c as W}from"./utils-e72801fa.js";import{I as j}from"./Info-593bb6af.js";import"./_commonjsHelpers-de833af9.js";import"./index-e131923d.js";import"./context-494caab9.js";const t=({type:e="neutral",children:v,icon:o})=>{const w={size:12,color:"currentColor"};return N("div",{className:W("flex gap-md items-center h-3xl py-sm px-lg w-fit rounded-full bodySm border select-none pulsable",{"border-border-default bg-surface-basic-default text-text-default":e==="neutral","border-border-primary bg-surface-primary-subdued text-text-primary":e==="info","border-border-success bg-surface-success-subdued text-text-success":e==="success","border-border-warning bg-surface-warning-subdued text-text-warning":e==="warning","border-border-critical bg-surface-critical-subdued text-text-critical":e==="critical"}),children:[!!o&&E.cloneElement(o,w),v]})};try{t.displayName="Badge",t.__docgenInfo={description:"",displayName:"Badge",props:{type:{defaultValue:{value:"neutral"},description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"neutral"'},{value:'"info"'},{value:'"success"'},{value:'"warning"'},{value:'"critical"'}]}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"Element"}}}}}catch{}const P={title:"Atoms/Badge",component:t,tags:["autodocs"],argTypes:{}},r={args:{type:"neutral",children:"Neutral"}},a={args:{type:"critical",children:"critical"}},s={args:{type:"info",children:"Info"}},c={args:{type:"success",children:"Success",icon:B(j,{})}},n={args:{type:"warning",children:"Warning"}};var i,d,u;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    type: 'neutral',
    children: 'Neutral'
  }
}`,...(u=(d=r.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var l,p,m;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    type: 'critical',
    children: 'critical'
  }
}`,...(m=(p=a.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var g,f,b;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    type: 'info',
    children: 'Info'
  }
}`,...(b=(f=s.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var y,x,h;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    type: 'success',
    children: 'Success',
    icon: <InfoIcon />
  }
}`,...(h=(x=c.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var _,S,I;n.parameters={...n.parameters,docs:{...(_=n.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    type: 'warning',
    children: 'Warning'
  }
}`,...(I=(S=n.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};const T=["Neutral","Danger","Info","Success","Warning"];export{a as Danger,s as Info,r as Neutral,c as Success,n as Warning,T as __namedExportsOrder,P as default};
