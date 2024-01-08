import{a as D,j as o}from"./jsx-runtime-29545a09.js";import{R as c}from"./index-76fb7be0.js";import{c as N}from"./utils-e72801fa.js";import{m as u}from"./motion-e61dcc0d.js";import{A as T}from"./index-add589df.js";import{S as I}from"./Spinner-6e10423b.js";const f=c.forwardRef((n,d)=>{const{onClick:s=()=>{},to:r="",LinkComponent:b=u.button,disabled:y=!1,suffix:v,prefix:g,block:h=!1,type:B="button",variant:e="primary",noRounded:M=!1,noBorder:q=!1,sharpLeft:p=!1,sharpRight:m=!1,selected:i=!1,iconOnly:a=!1,className:k="",content:H,size:l="md",loading:_=!1,tabIndex:R,toLabel:V,...C}=n;let t=b,x={};r&&(b===u.button?t=u.a:t=b),(t===u.button||t===u.a)&&(x={initial:{scale:1},whileTap:{scale:.99}});const w=!1;return D(t,{...C,...t==="a"?{href:r}:V?{[V]:r}:{to:r},disabled:y,onClick:s,...x,ref:d,type:B,tabIndex:R,className:N("pulsable",{"w-full":!!h,"w-fit":!h,selected:i},{"bodyMd-medium":!(e!=null&&e.includes("plain")),bodyMd:e==null?void 0:e.includes("plain")},{"pointer-events-none !text-text-disabled !bg-surface-basic-default":y,"!border-border-disabled":y&&!["plain","primary-plain","critical-plain","secondary-plain"].includes(e)},"relative ring-offset-1","outline-none shadow-button","flex flex-row gap-lg items-center justify-center","disabled:text-text-disabled",{"focus-visible:ring-2 focus:ring-border-focus focus:z-10":!w},{...!M&&{"rounded-none":p&&m,"rounded-r":p&&!m,"rounded-l":!p&&m,rounded:!p&&!m}},"transition-all","disabled:pointer-events-none",{"border-none":q,...!q&&{"border-border-default disabled:border-border-disabled":e==="basic"||e==="outline"||e==="secondary-outline","border-border-primary disabled:border-border-disabled":e==="primary"||e==="primary-outline","border-border-secondary disabled:border-border-disabled":e==="secondary","border-border-critical disabled:border-border-disabled":e==="critical-outline"||e==="critical","border-border-purple":e==="purple","border-border-warning":e==="warning","border-border-tertiary":e==="tertiary","border-none":e==="plain"||e==="primary-plain"||e==="critical-plain"||e==="secondary-plain",border:!(e==="plain"||e==="primary-plain"||e==="critical-plain"||e==="secondary-plain")}},{"bg-surface-basic-default hover:bg-surface-basic-hovered active:bg-surface-basic-pressed disabled:bg-surface-basic-default":e==="basic","bg-surface-basic-pressed hover:bg-surface-basic-pressed active:bg-surface-basic-pressed disabled:bg-surface-basic-default":e==="basic"&&i,"bg-surface-primary-default hover:bg-surface-primary-hovered active:bg-surface-primary-pressed disabled:bg-surface-basic-default":e==="primary","bg-surface-secondary-default hover:bg-surface-secondary-hovered active:bg-surface-secondary-pressed disabled:bg-surface-basic-default":e==="secondary","bg-surface-critical-default hover:bg-surface-critical-hovered active:bg-surface-critical-pressed disabled:bg-surface-basic-default":e==="critical","bg-none hover:bg-surface-critical-subdued active:bg-surface-critical-subdued":e==="critical-outline","bg-none hover:bg-surface-primary-subdued active:bg-surface-primary-subdued":e==="primary-outline","bg-none hover:bg-surface-secondary-subdued active:bg-surface-secondary-subdued":e==="secondary-outline","bg-none hover:bg-surface-basic-hovered active:bg-surface-basic-pressed":e==="outline","bg-surface-basic-pressed shadow-none hover:bg-surface-basic-hovered active:bg-surface-basic-pressed hover:shadow-button active:shadow-button":e==="outline"&&i,"bg-none shadow-none":(e==="plain"||e==="primary-plain"||e==="secondary-plain"||e==="critical-plain")&&!a,"bg-surface-basic-pressed shadow-none active:shadow-button":e==="plain"&&!a&&i,"bg-none shadow-none hover:bg-surface-basic-hovered active:bg-surface-basic-pressed active:shadow-button":e==="plain"&&a,"bg-surface-basic-pressed shadow-none hover:bg-surface-basic-hovered active:bg-surface-basic-pressed active:shadow-button":e==="plain"&&a&&i,"bg-surface-purple-default hover:bg-surface-purple-hovered active:bg-surface-purple-pressed":e==="purple","bg-surface-tertiary-default hover:bg-surface-tertiary-hovered active:bg-surface-tertiary-pressed":e==="tertiary","bg-surface-warning-default hover:bg-surface-warning-hovered active:bg-surface-warning-pressed":e==="warning"},{"text-text-default":e==="basic"||e==="plain"||e==="outline","text-text-on-primary":e==="primary"||e==="critical"||e==="secondary"||e==="secondary-outline"||e==="tertiary"||e==="purple"||e==="warning","text-text-critical":e==="critical-outline"||e==="critical-plain","text-text-primary":e==="primary-outline"||e==="primary-plain","text-text-secondary":e==="secondary-plain"},{"focus:underline":w},{"hover:underline":e==="plain"||e==="primary-plain"||e==="critical-plain"||e==="secondary-plain"},{underline:i&&!a&&e==="plain"},{...!a&&!(e==="plain"||e==="primary-plain"||e==="critical-plain"||e==="secondary-plain")&&{"py-md px-lg":l==="sm","py-lg px-2xl":l==="md","py-xl px-4xl":l==="lg","py-2xl px-6xl":l==="xl","py-2xl px-9xl":l==="2xl"}},{...!a&&(e==="plain"||e==="primary-plain"||e==="critical-plain"||e==="secondary-plain")&&{"py-sm px-md":l==="md","py-md px-lg":l==="lg"}},{"p-lg":a&&l==="md","p-md":a&&l==="sm","p-sm":a&&l==="xs"},k),children:[o(T,{children:_&&o(u.span,{initial:{width:0},animate:{width:"auto",paddingRight:0},exit:{width:0},className:"flex items-center justify-center aspect-square overflow-hidden",children:o("span",{className:"animate-spin",children:o(I,{color:"currentColor",weight:2,size:18})})})}),!!g&&c.cloneElement(g,{size:16,color:"currentColor"}),!a&&H,!!v&&c.cloneElement(v,{size:16,color:"currentColor"})]})}),E=c.forwardRef((n,d)=>{const{icon:s,block:r}=n;return o(f,{...n,ref:d,iconOnly:!0,content:null,prefix:s,block:!!r})}),L=c.forwardRef((n,d)=>{const{block:s}=n;return o(f,{...n,iconOnly:!1,ref:d,block:!!s})});try{f.displayName="ButtonBase",f.__docgenInfo={description:"",displayName:"ButtonBase",props:{disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"submit"'},{value:'"button"'}]}},prefix:{defaultValue:null,description:"",name:"prefix",required:!1,type:{name:"Element"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"MouseEventHandler<HTMLButtonElement>"}},loading:{defaultValue:null,description:"",name:"loading",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},suffix:{defaultValue:null,description:"",name:"suffix",required:!1,type:{name:"Element"}},value:{defaultValue:null,description:"",name:"value",required:!1,type:{name:"any"}},tabIndex:{defaultValue:null,description:"",name:"tabIndex",required:!1,type:{name:"number"}},onKeyDown:{defaultValue:null,description:"",name:"onKeyDown",required:!1,type:{name:"KeyboardEventHandler<HTMLButtonElement>"}},onMouseDown:{defaultValue:null,description:"",name:"onMouseDown",required:!1,type:{name:"MouseEventHandler<HTMLButtonElement>"}},onPointerDown:{defaultValue:null,description:"",name:"onPointerDown",required:!1,type:{name:"MouseEventHandler<HTMLButtonElement>"}},noRounded:{defaultValue:null,description:"",name:"noRounded",required:!1,type:{name:"boolean"}},noBorder:{defaultValue:null,description:"",name:"noBorder",required:!1,type:{name:"boolean"}},sharpLeft:{defaultValue:null,description:"",name:"sharpLeft",required:!1,type:{name:"boolean"}},sharpRight:{defaultValue:null,description:"",name:"sharpRight",required:!1,type:{name:"boolean"}},iconOnly:{defaultValue:null,description:"",name:"iconOnly",required:!1,type:{name:"boolean"}},content:{defaultValue:null,description:"",name:"content",required:!0,type:{name:"ReactNode"}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"warning"'},{value:'"critical"'},{value:'"outline"'},{value:'"basic"'},{value:'"plain"'},{value:'"primary"'},{value:'"primary-outline"'},{value:'"secondary"'},{value:'"secondary-outline"'},{value:'"critical-outline"'},{value:'"primary-plain"'},{value:'"secondary-plain"'},{value:'"critical-plain"'},{value:'"purple"'},{value:'"tertiary"'}]}},to:{defaultValue:null,description:"",name:"to",required:!1,type:{name:"string"}},LinkComponent:{defaultValue:null,description:"",name:"LinkComponent",required:!1,type:{name:"any"}},block:{defaultValue:null,description:"",name:"block",required:!1,type:{name:"boolean"}},selected:{defaultValue:null,description:"",name:"selected",required:!1,type:{name:"boolean"}},toLabel:{defaultValue:null,description:"",name:"toLabel",required:!1,type:{name:"string"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"2xl"'}]}}}}}catch{}try{E.displayName="IconButton",E.__docgenInfo={description:"",displayName:"IconButton",props:{icon:{defaultValue:null,description:"",name:"icon",required:!0,type:{name:"Element"}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"outline"'},{value:'"basic"'},{value:'"plain"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xs"'},{value:'"sm"'},{value:'"md"'}]}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"MouseEventHandler<HTMLButtonElement>"}},onMouseDown:{defaultValue:null,description:"",name:"onMouseDown",required:!1,type:{name:"MouseEventHandler<HTMLButtonElement>"}},onPointerDown:{defaultValue:null,description:"",name:"onPointerDown",required:!1,type:{name:"MouseEventHandler<HTMLButtonElement>"}},onKeyDown:{defaultValue:null,description:"",name:"onKeyDown",required:!1,type:{name:"KeyboardEventHandler<HTMLButtonElement>"}},to:{defaultValue:null,description:"",name:"to",required:!1,type:{name:"string"}},LinkComponent:{defaultValue:null,description:"",name:"LinkComponent",required:!1,type:{name:"any"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},block:{defaultValue:null,description:"",name:"block",required:!1,type:{name:"boolean"}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"submit"'},{value:'"button"'}]}},selected:{defaultValue:null,description:"",name:"selected",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},value:{defaultValue:null,description:"",name:"value",required:!1,type:{name:"any"}},toLabel:{defaultValue:null,description:"",name:"toLabel",required:!1,type:{name:"string"}}}}}catch{}try{L.displayName="Button",L.__docgenInfo={description:"",displayName:"Button",props:{suffix:{defaultValue:null,description:"",name:"suffix",required:!1,type:{name:"Element"}},prefix:{defaultValue:null,description:"",name:"prefix",required:!1,type:{name:"Element"}},noRounded:{defaultValue:null,description:"",name:"noRounded",required:!1,type:{name:"boolean"}},noBorder:{defaultValue:null,description:"",name:"noBorder",required:!1,type:{name:"boolean"}},sharpLeft:{defaultValue:null,description:"",name:"sharpLeft",required:!1,type:{name:"boolean"}},sharpRight:{defaultValue:null,description:"",name:"sharpRight",required:!1,type:{name:"boolean"}},iconOnly:{defaultValue:null,description:"",name:"iconOnly",required:!1,type:{name:"boolean"}},content:{defaultValue:null,description:"",name:"content",required:!0,type:{name:"ReactNode"}},loading:{defaultValue:null,description:"",name:"loading",required:!1,type:{name:"boolean"}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"warning"'},{value:'"critical"'},{value:'"outline"'},{value:'"basic"'},{value:'"plain"'},{value:'"primary"'},{value:'"primary-outline"'},{value:'"secondary"'},{value:'"secondary-outline"'},{value:'"critical-outline"'},{value:'"primary-plain"'},{value:'"secondary-plain"'},{value:'"critical-plain"'},{value:'"purple"'},{value:'"tertiary"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"2xl"'}]}},tabIndex:{defaultValue:null,description:"",name:"tabIndex",required:!1,type:{name:"number"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"MouseEventHandler<HTMLButtonElement>"}},onMouseDown:{defaultValue:null,description:"",name:"onMouseDown",required:!1,type:{name:"MouseEventHandler<HTMLButtonElement>"}},onPointerDown:{defaultValue:null,description:"",name:"onPointerDown",required:!1,type:{name:"MouseEventHandler<HTMLButtonElement>"}},onKeyDown:{defaultValue:null,description:"",name:"onKeyDown",required:!1,type:{name:"KeyboardEventHandler<HTMLButtonElement>"}},to:{defaultValue:null,description:"",name:"to",required:!1,type:{name:"string"}},LinkComponent:{defaultValue:null,description:"",name:"LinkComponent",required:!1,type:{name:"any"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},block:{defaultValue:null,description:"",name:"block",required:!1,type:{name:"boolean"}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"submit"'},{value:'"button"'}]}},selected:{defaultValue:null,description:"",name:"selected",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},value:{defaultValue:null,description:"",name:"value",required:!1,type:{name:"any"}},toLabel:{defaultValue:null,description:"",name:"toLabel",required:!1,type:{name:"string"}}}}}catch{}export{L as B,E as I,f as a};
