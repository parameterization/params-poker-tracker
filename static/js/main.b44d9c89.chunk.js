(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{13:function(e,t,a){},14:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(3),o=a.n(r),s=(a(13),a(1));var m=()=>{const[e,t]=Object(n.useState)([]),[a,r]=Object(n.useState)([]),[o,m]=Object(n.useState)({playerId:"",amount:"",groupId:"",buyIn:"",position:"",notes:""}),[c,d]=Object(n.useState)([]),[u,i]=Object(n.useState)(null),[p,b]=Object(n.useState)(0);Object(n.useEffect)(()=>{const e=localStorage.getItem("players"),a=localStorage.getItem("groups");e&&t(JSON.parse(e)),a&&r(JSON.parse(a)),y()},[]);const y=()=>{d([...e].sort((e,t)=>t.totalMoney-e.totalMoney))},g=e=>{t(e),localStorage.setItem("players",JSON.stringify(e)),y()},E=e=>{r(e),localStorage.setItem("groups",JSON.stringify(e))},N=e=>{i(e)};return l.a.createElement("div",{className:"p-4"},l.a.createElement("div",{className:"flex justify-between mb-6"},l.a.createElement("h1",{className:"text-2xl font-bold"},"Param's Poker Tracker"),l.a.createElement("div",{className:"flex gap-2"},l.a.createElement("button",{type:"button",className:"bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600",onClick:()=>{const e=JSON.parse(localStorage.getItem("players")||"[]"),a=JSON.parse(localStorage.getItem("groups")||"[]");t(e),r(a),y(),i(null),b(0)}},"Refresh Data"),l.a.createElement("button",{type:"button",className:"bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600",onClick:()=>{window.confirm("Are you sure you want to reset all data? This cannot be undone.")&&(localStorage.setItem("players","[]"),localStorage.setItem("groups","[]"),t([]),r([]),i(null),d([]),b(0),m({playerId:"",amount:"",groupId:"",buyIn:"",position:"",notes:""}))}},"Reset Data"))),l.a.createElement("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6"},l.a.createElement("div",{className:"space-y-4"},l.a.createElement("div",null,l.a.createElement("h2",{className:"text-xl font-bold mb-2"},"Add Player"),l.a.createElement("form",{onSubmit:t=>{t.preventDefault();const a=t.target.elements.name;(t=>{const a=t.trim();a&&(e.some(e=>e.name.toLowerCase()===a.toLowerCase())?alert("Player already exists"):g([...e,{name:a,totalMoney:0,gamesPlayed:0,winCount:0,history:[]}]))})(a.value),a.value=""},className:"flex gap-2"},l.a.createElement("input",{name:"name",type:"text",placeholder:"Player Name",className:"flex-grow p-2 border rounded"}),l.a.createElement("button",{type:"submit",className:"bg-green-500 text-white px-4 py-2 rounded"},"Add"))),l.a.createElement("div",null,l.a.createElement("h2",{className:"text-xl font-bold mb-2"},"Players"),l.a.createElement("div",{className:"border rounded"},e.map((t,a)=>l.a.createElement("div",{key:a,className:"p-2 flex justify-between items-center hover:bg-gray-50 border-b last:border-b-0"},l.a.createElement("span",{className:"cursor-pointer",onClick:()=>N(t)},t.name),l.a.createElement("button",{onClick:()=>(t=>{const a=e.filter((e,a)=>a!==t);g(a)})(a),className:"text-red-500 px-2 py-1 rounded hover:bg-red-50"},"Delete")))))),l.a.createElement("div",{className:"space-y-4"},l.a.createElement("div",null,l.a.createElement("h2",{className:"text-xl font-bold mb-2"},"Add Group"),l.a.createElement("form",{onSubmit:e=>{e.preventDefault();const t=e.target.elements.name;(e=>{const t=e.trim();t&&(a.some(e=>e.name.toLowerCase()===t.toLowerCase())?alert("Group already exists"):E([...a,{name:t,totalPot:0,gamesPlayed:0,history:[]}]))})(t.value),t.value=""},className:"flex gap-2"},l.a.createElement("input",{name:"name",type:"text",placeholder:"Group Name",className:"flex-grow p-2 border rounded"}),l.a.createElement("button",{type:"submit",className:"bg-green-500 text-white px-4 py-2 rounded"},"Add"))),l.a.createElement("div",null,l.a.createElement("h2",{className:"text-xl font-bold mb-2"},"Groups"),l.a.createElement("div",{className:"border rounded"},a.map((e,t)=>l.a.createElement("div",{key:t,className:"p-2 flex justify-between items-center hover:bg-gray-50 border-b last:border-b-0"},l.a.createElement("span",null,e.name),l.a.createElement("button",{onClick:()=>(e=>{const t=a.filter((t,a)=>a!==e);E(t)})(t),className:"text-red-500 px-2 py-1 rounded hover:bg-red-50"},"Delete"))))))),l.a.createElement("div",{className:"mt-8"},l.a.createElement("h2",{className:"text-xl font-bold mb-4"},"Update Money"),l.a.createElement("form",{onSubmit:t=>{t.preventDefault();const{playerId:a,amount:n,groupId:l,buyIn:r,position:c,notes:d}=o;if(!a||!n||!r)return void alert("Please select a player, enter an amount, and specify buy-in");const i=parseFloat(n),p=parseFloat(r),b=i-p,E=(new Date).toISOString(),v="".concat(l,"-").concat(E),x=e.map((e,t)=>t===parseInt(a)?Object(s.a)(Object(s.a)({},e),{},{totalMoney:e.totalMoney+b,gamesPlayed:e.gamesPlayed+1,winCount:b>0?e.winCount+1:e.winCount,history:[...e.history,{id:v,amount:i,buyIn:p,netResult:b,position:c,notes:d,timestamp:E}]}):e);g(x),y(),u&&parseInt(a)===e.indexOf(u)&&N(x[parseInt(a)]),m({playerId:"",amount:"",groupId:"",buyIn:"",position:"",notes:""})},className:"grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl"},l.a.createElement("select",{value:o.playerId,onChange:e=>m(Object(s.a)(Object(s.a)({},o),{},{playerId:e.target.value})),className:"p-2 border rounded"},l.a.createElement("option",{value:""},"Select Player"),e.map((e,t)=>l.a.createElement("option",{key:t,value:t},e.name))),l.a.createElement("input",{type:"number",placeholder:"Amount (Cashout)",value:o.amount,onChange:e=>m(Object(s.a)(Object(s.a)({},o),{},{amount:e.target.value})),className:"p-2 border rounded"}),l.a.createElement("select",{value:o.groupId,onChange:e=>m(Object(s.a)(Object(s.a)({},o),{},{groupId:e.target.value})),className:"p-2 border rounded"},l.a.createElement("option",{value:""},"Select Group"),a.map((e,t)=>l.a.createElement("option",{key:t,value:t},e.name))),l.a.createElement("input",{type:"number",placeholder:"Buy-in Amount",value:o.buyIn,onChange:e=>m(Object(s.a)(Object(s.a)({},o),{},{buyIn:e.target.value})),className:"p-2 border rounded"}),l.a.createElement("input",{placeholder:"Position (e.g., 1st, 2nd)",value:o.position,onChange:e=>m(Object(s.a)(Object(s.a)({},o),{},{position:e.target.value})),className:"p-2 border rounded"}),l.a.createElement("input",{placeholder:"Notes",value:o.notes,onChange:e=>m(Object(s.a)(Object(s.a)({},o),{},{notes:e.target.value})),className:"p-2 border rounded"}),l.a.createElement("div",{className:"md:col-span-2"},l.a.createElement("button",{type:"submit",className:"bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"},"Update")))),l.a.createElement("div",{className:"mt-8"},l.a.createElement("h2",{className:"text-xl font-bold mb-4"},"Leaderboard"),l.a.createElement("div",{className:"border rounded"},c.slice(10*p,10*(p+1)).map((e,t)=>l.a.createElement("div",{key:t,className:"p-2 flex justify-between items-center hover:bg-gray-50 border-b last:border-b-0 cursor-pointer",onClick:()=>N(e)},l.a.createElement("span",null,e.name),l.a.createElement("span",{className:e.totalMoney>=0?"text-green-600":"text-red-600"},"$",e.totalMoney)))),l.a.createElement("div",{className:"flex justify-between mt-2"},l.a.createElement("button",{onClick:()=>b(Math.max(0,p-1)),disabled:0===p,className:"px-4 py-2 bg-gray-100 rounded disabled:opacity-50"},"Previous"),l.a.createElement("button",{onClick:()=>b(p+1),disabled:10*(p+1)>=c.length,className:"px-4 py-2 bg-gray-100 rounded disabled:opacity-50"},"Next"))),u&&l.a.createElement("div",{className:"mt-8"},l.a.createElement("div",{className:"flex justify-between items-center mb-4"},l.a.createElement("h2",{className:"text-xl font-bold"},u.name,"'s Stats"),l.a.createElement("button",{onClick:()=>i(null),className:"text-gray-500 px-2 py-1 rounded hover:bg-gray-100"},"Close")),l.a.createElement("div",{className:"space-y-2"},l.a.createElement("p",null,l.a.createElement("strong",null,"Total Money:")," $",u.totalMoney),l.a.createElement("p",null,l.a.createElement("strong",null,"Games Played:")," ",u.gamesPlayed),l.a.createElement("p",null,l.a.createElement("strong",null,"Wins:")," ",u.winCount)),l.a.createElement("h3",{className:"text-lg font-bold mt-4 mb-2"},"Game History"),l.a.createElement("div",{className:"border rounded divide-y"},u.history.map((e,t)=>l.a.createElement("div",{key:t,className:"p-2"},l.a.createElement("div",{className:"text-sm text-gray-600"},new Date(e.timestamp).toLocaleString()),l.a.createElement("div",{className:"text-gray-600"},"Buy-in: $",e.buyIn," / Cashout: $",e.amount),l.a.createElement("div",{className:e.netResult>=0?"text-green-600 font-medium":"text-red-600 font-medium"},e.netResult>=0?"Profit":"Loss",": $",Math.abs(e.netResult)),e.position&&l.a.createElement("div",{className:"text-sm text-gray-600"},"Position: ",e.position),e.notes&&l.a.createElement("div",{className:"text-sm text-gray-600"},"Notes: ",e.notes))))))};var c=e=>{e&&e instanceof Function&&a.e(3).then(a.bind(null,15)).then(t=>{let{getCLS:a,getFID:n,getFCP:l,getLCP:r,getTTFB:o}=t;a(e),n(e),l(e),r(e),o(e)})};o.a.createRoot(document.getElementById("root")).render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(m,null))),c()},4:function(e,t,a){e.exports=a(14)}},[[4,1,2]]]);
//# sourceMappingURL=main.b44d9c89.chunk.js.map