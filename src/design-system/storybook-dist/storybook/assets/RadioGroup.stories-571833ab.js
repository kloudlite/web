import{a as E,j as p,F}from"./jsx-runtime-29545a09.js";import{r as a,R as L}from"./index-76fb7be0.js";import{c as P,d as O,_ as h,f as k,a as q,g as y}from"./index-8271c066.js";import{b as G,c as T,$ as j,a as K}from"./index-7437dbe9.js";import{$ as z}from"./index-2a7aefac.js";import{$ as U}from"./index-11a3acc1.js";import{$ as W}from"./index-2c2e1a29.js";import{c as g}from"./utils-e72801fa.js";import{B as Z}from"./bounce-it-356267b3.js";import"./_commonjsHelpers-de833af9.js";import"./index-d3ea75b5.js";import"./index-d3597871.js";import"./index-e131923d.js";import"./motion-e61dcc0d.js";const V="Radio",[H,N]=P(V),[X,Y]=H(V),J=a.forwardRef((e,d)=>{const{__scopeRadio:t,name:c,checked:r=!1,required:o,disabled:n,value:i="on",onCheck:l,...b}=e,[m,f]=a.useState(null),u=q(d,v=>f(v)),s=a.useRef(!1),$=m?!!m.closest("form"):!0;return a.createElement(X,{scope:t,checked:r,disabled:n},a.createElement(k.button,h({type:"button",role:"radio","aria-checked":r,"data-state":B(r),"data-disabled":n?"":void 0,disabled:n,value:i},b,{ref:u,onClick:y(e.onClick,v=>{r||l==null||l(),$&&(s.current=v.isPropagationStopped(),s.current||v.stopPropagation())})})),$&&a.createElement(ae,{control:m,bubbles:!s.current,name:c,value:i,checked:r,required:o,disabled:n,style:{transform:"translateX(-100%)"}}))}),Q="RadioIndicator",ee=a.forwardRef((e,d)=>{const{__scopeRadio:t,forceMount:c,...r}=e,o=Y(Q,t);return a.createElement(W,{present:c||o.checked},a.createElement(k.span,h({"data-state":B(o.checked),"data-disabled":o.disabled?"":void 0},r,{ref:d})))}),ae=e=>{const{control:d,checked:t,bubbles:c=!0,...r}=e,o=a.useRef(null),n=U(t),i=z(d);return a.useEffect(()=>{const l=o.current,b=window.HTMLInputElement.prototype,f=Object.getOwnPropertyDescriptor(b,"checked").set;if(n!==t&&f){const u=new Event("click",{bubbles:c});f.call(l,t),l.dispatchEvent(u)}},[n,t,c]),a.createElement("input",h({type:"radio","aria-hidden":!0,defaultChecked:t},r,{tabIndex:-1,ref:o,style:{...e.style,...i,position:"absolute",pointerEvents:"none",opacity:0,margin:0}}))};function B(e){return e?"checked":"unchecked"}const te=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],A="RadioGroup",[re,Ce]=P(A,[G,N]),S=G(),D=N(),[oe,ne]=re(A),ce=a.forwardRef((e,d)=>{const{__scopeRadioGroup:t,name:c,defaultValue:r,value:o,required:n=!1,disabled:i=!1,orientation:l,dir:b,loop:m=!0,onValueChange:f,...u}=e,s=S(t),$=T(b),[v,M]=O({prop:o,defaultProp:r,onChange:f});return a.createElement(oe,{scope:t,name:c,required:n,disabled:i,value:v,onValueChange:M},a.createElement(j,h({asChild:!0},s,{orientation:l,dir:$,loop:m}),a.createElement(k.div,h({role:"radiogroup","aria-required":n,"aria-orientation":l,"data-disabled":i?"":void 0,dir:$},u,{ref:d}))))}),de="RadioGroupItem",se=a.forwardRef((e,d)=>{const{__scopeRadioGroup:t,disabled:c,...r}=e,o=ne(de,t),n=o.disabled||c,i=S(t),l=D(t),b=a.useRef(null),m=q(d,b),f=o.value===r.value,u=a.useRef(!1);return a.useEffect(()=>{const s=v=>{te.includes(v.key)&&(u.current=!0)},$=()=>u.current=!1;return document.addEventListener("keydown",s),document.addEventListener("keyup",$),()=>{document.removeEventListener("keydown",s),document.removeEventListener("keyup",$)}},[]),a.createElement(K,h({asChild:!0},i,{focusable:!n,active:f}),a.createElement(J,h({disabled:n,required:o.required,checked:f},l,r,{name:o.name,ref:m,onCheck:()=>o.onValueChange(r.value),onKeyDown:y(s=>{s.key==="Enter"&&s.preventDefault()}),onFocus:y(r.onFocus,()=>{var s;u.current&&((s=b.current)===null||s===void 0||s.click())})})))}),ie=a.forwardRef((e,d)=>{const{__scopeRadioGroup:t,...c}=e,r=D(t);return a.createElement(ee,h({},r,c,{ref:d}))}),le=ce,fe=se,ue=ie,R=({disabled:e=!1,value:d="",children:t,className:c="",withBounceEffect:r=!0,labelPlacement:o="right"})=>{const n=a.useId(),i=()=>E("label",{htmlFor:n,className:g("flex items-center w-fit",{"cursor-pointer":!e,"flex-row-reverse":o==="left","flex-row":o==="right"},c),children:[p(fe,{className:g("w-2xl h-2xl outline-none rounded-full border ring-border-focus ring-offset-1 focus:ring-2 transition-all flex items-center justify-center border-border-default",{"hover:bg-surface-basic-hovered":!e,"data-[state=checked]:border-border-primary":!e,"data-[disabled]:border-border-disabled":e}),value:d,id:n,disabled:e,children:p(ue,{className:g("block w-lg h-lg rounded-full",{"bg-icon-disabled":e,"bg-surface-primary-default":!e})})}),p("div",{className:g({"text-text-disabled":e,"text-text-default cursor-pointer":!e},"bodyMd-medium pl-lg select-none flex-1"),children:t})]});return r?p(Z,{children:i()}):i()},_=({value:e,onChange:d=()=>{},label:t,disabled:c=!1,children:r,className:o="",labelPlacement:n="right",withBounceEffect:i=!0})=>E(le,{className:g("flex flex-col gap-y-xl",o),value:e,"aria-label":t||"Radio choice",disabled:c,onValueChange:d,children:[t&&p("span",{className:"bodyMd-medium",children:t}),L.Children.map(r,l=>a.cloneElement(l,{labelPlacement:n,withBounceEffect:i}))]});try{R.displayName="Item",R.__docgenInfo={description:"",displayName:"Item",props:{disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},value:{defaultValue:{value:""},description:"",name:"value",required:!1,type:{name:"string"}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}},withBounceEffect:{defaultValue:{value:"true"},description:"",name:"withBounceEffect",required:!1,type:{name:"boolean"}},labelPlacement:{defaultValue:{value:"right"},description:"",name:"labelPlacement",required:!1,type:{name:"labelPlacements"}}}}}catch{}try{_.displayName="Root",_.__docgenInfo={description:"",displayName:"Root",props:{value:{defaultValue:{value:""},description:"",name:"value",required:!1,type:{name:"string"}},onChange:{defaultValue:{value:"() => {}"},description:"",name:"onChange",required:!1,type:{name:"((value: string) => void)"}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string"}},disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}},labelPlacement:{defaultValue:{value:"right"},description:"",name:"labelPlacement",required:!1,type:{name:"labelPlacements"}},withBounceEffect:{defaultValue:{value:"true"},description:"",name:"withBounceEffect",required:!1,type:{name:"boolean"}}}}}catch{}const Ie={title:"Atoms/RadioGroup",component:_,tags:["autodocs"],argTypes:{}},x={args:{value:"lion",label:"Wild animals",children:E(F,{children:[p(R,{value:"tiger",withBounceEffect:!1,children:"Tiger"},"1"),p(R,{value:"lion",disabled:!0,withBounceEffect:!1,children:"Lion"},"2"),p(R,{value:"zebra",withBounceEffect:!1,children:"Zebra"},"3"),p(R,{value:"giraffe",disabled:!0,withBounceEffect:!1,children:"Giraffe"},"4")]})}};var w,C,I;x.parameters={...x.parameters,docs:{...(w=x.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    value: 'lion',
    label: 'Wild animals',
    children: <>
        <Radio.Item value="tiger" key="1" withBounceEffect={false}>
          Tiger
        </Radio.Item>
        <Radio.Item value="lion" key="2" disabled withBounceEffect={false}>
          Lion
        </Radio.Item>
        <Radio.Item value="zebra" key="3" withBounceEffect={false}>
          Zebra
        </Radio.Item>
        <Radio.Item value="giraffe" key="4" disabled withBounceEffect={false}>
          Giraffe
        </Radio.Item>
      </>
  }
}`,...(I=(C=x.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};const Pe=["DefaultRadioGroup"];export{x as DefaultRadioGroup,Pe as __namedExportsOrder,Ie as default};