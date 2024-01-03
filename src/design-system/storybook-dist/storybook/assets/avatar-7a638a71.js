import{j as l,a as o}from"./jsx-runtime-29545a09.js";import{c as n}from"./utils-e72801fa.js";const r={one:["fill-text-soft","text-text-soft"],two:["fill-icon-warning","text-icon-warning"],three:["fill-icon-success","text-icon-success"],four:["fill-icon-critical","text-icon-critical"],five:["fill-icon-secondary","text-icon-secondary"]},i=({size:e="md",color:a="one",image:t})=>{const s=!Object.keys(r).includes(a);return o("div",{style:s?{background:a}:{},className:n("pulsable pulsable-circle","relative flex flex-row items-center justify-center","outline-none transition-all","rounded-full","border border-border-default",{"w-8xl h-8xl p-lg":e==="lg","w-6xl h-6xl p-md":e==="md","w-5xl h-5xl p-md":e==="sm","w-4xl h-4xl p-md":e==="xs"},{"bg-surface-basic-default":!s}),children:[t&&l("span",{children:t}),e==="lg"&&!t&&l("svg",{width:"42",height:"49",viewBox:"0 0 42 49",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:n(`${r[a][0]}`),children:l("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M21.0002 21.0714C26.5756 21.0714 31.0953 16.4664 31.0953 10.7857C31.0953 5.10507 26.5756 0.5 21.0002 0.5C15.4248 0.5 10.9051 5.10507 10.9051 10.7857C10.9051 16.4664 15.4248 21.0714 21.0002 21.0714ZM21.0002 48.5C29.4828 48.5 37.0619 44.4813 42 38.2145C37.062 31.9475 29.4826 27.9286 20.9998 27.9286C12.5172 27.9286 4.93805 31.9473 0 38.214C4.93804 44.4811 12.5174 48.5 21.0002 48.5Z"})}),e==="md"&&!t&&l("svg",{width:"28",height:"31",viewBox:"0 0 28 31",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:n(`${r[a][0]}`),children:l("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M14.0001 13.3609C17.4786 13.3609 20.2985 10.4878 20.2985 6.94359C20.2985 3.39941 17.4786 0.526291 14.0001 0.526291C10.5216 0.526291 7.70174 3.39941 7.70174 6.94359C7.70174 10.4878 10.5216 13.3609 14.0001 13.3609ZM14.0001 30.4737C19.2924 30.4737 24.0211 27.9664 27.102 24.0566C24.0211 20.1465 19.2923 17.6391 13.9999 17.6391C8.70758 17.6391 3.97888 20.1464 0.89801 24.0562C3.97888 27.9663 8.70769 30.4737 14.0001 30.4737Z"})}),e==="sm"&&!t&&l("svg",{width:"22",height:"25",viewBox:"0 0 22 25",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:n(`${r[a][0]}`),children:l("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M11.0001 10.8058C13.7552 10.8058 15.9886 8.53022 15.9886 5.72317C15.9886 2.91612 13.7552 0.640549 11.0001 0.640549C8.24507 0.640549 6.01166 2.91612 6.01166 5.72317C6.01166 8.53022 8.24507 10.8058 11.0001 10.8058ZM11.0001 24.3595C15.1917 24.3595 18.9369 22.3736 21.377 19.277C18.9369 16.1801 15.1916 14.1942 10.9999 14.1942C6.8083 14.1942 3.06309 16.18 0.622986 19.2767C3.06309 22.3735 6.80839 24.3595 11.0001 24.3595Z"})}),e==="xs"&&!t&&l("svg",{width:"16",height:"17",viewBox:"0 0 16 17",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:n(`${r[a][0]}`),children:l("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M8.00007 7.2863C9.97373 7.2863 11.5737 5.65613 11.5737 3.64521C11.5737 1.63429 9.97373 0.00411987 8.00007 0.00411987C6.02641 0.00411987 4.42644 1.63429 4.42644 3.64521C4.42644 5.65613 6.02641 7.2863 8.00007 7.2863ZM8.00007 16.9959C11.0028 16.9959 13.6858 15.5733 15.4339 13.3549C13.6858 11.1364 11.0028 9.7137 7.99992 9.7137C4.99714 9.7137 2.31415 11.1363 0.566101 13.3547C2.31414 15.5732 4.9972 16.9959 8.00007 16.9959Z"})})]})},d=({size:e,color:a,image:t})=>l(i,{size:e,color:a,image:t});try{i.displayName="AvatarBase",i.__docgenInfo={description:"",displayName:"AvatarBase",props:{size:{defaultValue:{value:"md"},description:"",name:"size",required:!1,type:{name:"AvatarSizes"}},color:{defaultValue:{value:"one"},description:"",name:"color",required:!1,type:{name:"AvatarColors"}},image:{defaultValue:null,description:"",name:"image",required:!1,type:{name:"ReactNode"}}}}}catch{}try{d.displayName="Avatar",d.__docgenInfo={description:"",displayName:"Avatar",props:{size:{defaultValue:{value:"md"},description:"",name:"size",required:!1,type:{name:"AvatarSizes"}},color:{defaultValue:{value:"one"},description:"",name:"color",required:!1,type:{name:"AvatarColors"}},image:{defaultValue:null,description:"",name:"image",required:!1,type:{name:"ReactNode"}}}}}catch{}export{d as A,i as a};