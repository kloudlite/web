import{j as o,a as y}from"./jsx-runtime-29545a09.js";import{$ as N,a as $}from"./index-7437dbe9.js";import{r as n,R as v}from"./index-76fb7be0.js";import{c as m}from"./utils-e72801fa.js";import{m as b}from"./motion-e61dcc0d.js";import{L as E}from"./index-858efc6d.js";const w=({to:e="",label:t,active:r=!1,fitted:s=!1,onClick:d=()=>{},LinkComponent:f="div",variant:l="plain",size:u="md",prefix:c})=>{let a=f||"div";e&&(f==="div"?a="a":a=f);const[p,x]=n.useState(!1);return y("div",{onMouseEnter:()=>{x(!0)},onMouseLeave:()=>{x(!1)},className:m("outline-none flex flex-col relative group bodyMd-medium hover:text-text-default active:text-text-default transition-all cursor-pointer",{"text-text-default":r,"text-text-soft":!r,"hover:bg-surface-basic-hovered active:bg-surface-basic-pressed rounded-lg":l==="filled"}),children:[l==="plain"&&o("div",{className:"h-md bg-none w-full z-0"}),o($,{asChild:!0,focusable:!0,onKeyDown:i=>{["Enter"," "].includes(i.key)&&d(i)},children:y(a,{...e?a==="a"?{href:e}:{to:e}:{},prefetch:"intent",onClick:d,className:m("z-10 tab-item gap-lg outline-none flex flex-row items-center w-max","ring-offset-0 focus-visible:ring-2 focus-visible:ring-border-focus",{...(!s||l==="filled")&&{"px-2xl py-lg":u==="md","px-lg py-md":u==="sm","rounded-lg":!0},...s&&{"py-md":l!=="filled"}}),children:[!!c&&v.cloneElement(c,{size:16,color:"currentColor"}),typeof t=="function"?t(r):t]})}),r&&l==="plain"&&o(b.div,{layoutId:"underline",className:m("h-md bg-surface-primary-pressed z-10 absolute bottom-0 w-full")}),l==="filled"&&r&&o(b.span,{layoutId:"bubble",className:"absolute inset-0 rounded-lg bg-surface-basic-default border border-border-default shadow-button",transition:{type:"spring",bounce:.1,duration:.3}}),l==="plain"&&p&&o(b.div,{layoutId:"hoverd-underline",className:"h-md bg-border-default group-active:bg-border-tertiary bg-none absolute bottom-0 w-full z-0"}),l==="plain"&&o("div",{className:"h-md bg-none w-full z-0"})]})},T=({to:e,label:t,prefix:r,value:s})=>o(w,{to:e,label:t,prefix:r}),C=n.forwardRef(({variant:e="plain",size:t="md",fitted:r=!1,onChange:s=()=>{},value:d,LinkComponent:f,className:l="",basePath:u="",children:c},a)=>{const[p,x]=n.useState(d);let i=n.useId();return i=n.useMemo(()=>i,[c,d,u,t,e]),n.useEffect(()=>{s&&s(p)},[p]),o(N,{orientation:"horizontal",loop:!0,className:m("flex flex-row items-center transition-all","snap-x",{"md:gap-4xl":t==="md"&&e!=="filled","gap-lg":t==="sm"||e==="filled"},l),ref:a,asChild:!0,children:o(b.div,{layout:!0,layoutRoot:!0,children:o(E,{id:i,children:v.Children.map(c,h=>{if(!h)throw Error("Tab child is required");const g=h.props;return o(b.div,{className:m("snap-start",{"px-xl md:px-0":e==="plain"}),children:o(w,{...g,onClick:()=>{x(g.value)},fitted:r,to:u+(g.to||""),active:d===g.value,LinkComponent:f,variant:e,size:t})})})})})})}),R={Tab:T,Root:C},B=R;export{B as T};
