apps={terminal:{name:"linuxWEB Terminal",path:"apps.terminal",version:"1.2.0",icon:"./img/terminal.svg",createData:{title:"Terminal",bodyColor:"black",textColor:"white",bodyBorder:!1,bodyBorderSize:"0px",opacity:.9,padding:"10px 5px",getHTML:function(){return`\n                <terminal_main>linuxWEB terminal version ${apps.terminal.version}<br></terminal_main>\n                <terminal_buffer></terminal_buffer>\n\t\t\t\t<terminal_input><span>${this.methods.getPrefix()}</span><input type=text></terminal_input>\n\t\t\t\t`},methods:{commandHistory:[],currentHistoryNumber:-1,currentCommand:"",updateInitialized:!1,currentDirectory:"/",user:system.activeUser,updateUserName:function(){this.user=system.activeUser},getPrefix:function(){return this.updateUserName(),`[${this.user} ${this.currentDirectory}] $&nbsp`},addText:function(e){inputElement=this.getProcessElementBody().querySelector("terminal_input > input"),isDefined(e)&&(e=escapeHtml(e.toString()).replace(/\n/g,"<br>").replaceAll("    ","&Tab;"),this.getProcessElementBody().querySelector("terminal_main").innerHTML+=e+"<br>",inputElement.scrollIntoView(!1))},clear:function(){this.getProcessElementBody().querySelector("terminal_main").innerHTML=""},setCurrentDirectory:function(e){if(dirObj=fileSystem.getDir(e),!isDefined(dirObj))throw e+": Path not found.";if(!fileSystem.isDir(dirObj))throw e+": Not a directory";this.currentDirectory=e},initUpdate:function(e,t,n){this.updateInitialized=!0,this.startUpdateLoop(e,t,n),this.getProcessElementBody().querySelector("terminal_input > span").style.display="none"},startUpdateLoop:function(e,t,n=null,i=1e3){terminal=this,terminalBuffer=terminal.getProcessElementBody().querySelector("terminal_buffer"),terminalBuffer.innerHTML=escapeHtml(e(terminal,t,n)).replaceAll("    ","&Tab;"),this.getProcessElementBody().querySelector("terminal_input > input").scrollIntoView(!1),setTimeout(()=>{terminal.updateInitialized&&terminal.startUpdateLoop(e,t,n,i)},i)},stopUpdateLoop:function(){this.updateInitialized=!1},onFocus:function(e){let t=this.getProcessElementBody().querySelector("terminal_input > input"),n=this.getProcessElementBody().querySelector("terminal_main");document.activeElement!=t&&!elementIsInEventPath(e,n)&&t.focus()},addToCommandHistory:function(e){this.commandHistory.length>30&&this.commandHistory.pop(),this.commandHistory.unshift(e)}}},InitiateProcessVariables:function(e=null){return null!=e&&{body:e.getProcessElementBody(),main:e.getProcessElementBody().querySelector("terminal_main"),inputPrefix:e.getProcessElementBody().querySelector("terminal_input"),input:e.getProcessElementBody().querySelector("terminal_input > input"),buffer:e.getProcessElementBody().querySelector("terminal_buffer")}},onStart:function(e){console.log("onStart Initialized: ",e),terminalElement=this.InitiateProcessVariables(e),terminalElement.input.setAttribute("onkeydown",this.path+`.parseCommand(event,this,processes.pid[${e.id}])`)},parseCommand:async function(e,t,n){let i=this.InitiateProcessVariables(n);if(n.updateInitialized)return e.ctrlKey&&"c"==e.key.toLowerCase()?(n.updateInitialized=!1,n.addText(i.buffer.innerHTML),i.buffer.innerHTML="",n.getProcessElementBody().querySelector("terminal_input > span").style.display="",!1):(e.preventDefault(),!1);if(e.code.includes("Enter")){let e=t.value,r=`${i.inputPrefix.innerText}${e}`;if(n.addText(r),isTextEmpty(e))return!1;try{text=system.cli.i(e,n),i.inputPrefix.querySelector("span").innerHTML=n.getPrefix(),n.currentHistoryNumber=-1,n.addText(text)}catch(e){n.addText(e)}t.value="",n.addToCommandHistory(e)}else"ArrowUp"==e.code?(-1==n.currentHistoryNumber&&(n.currentCommand=t.value),this.getFromCommandHistory(n,1)):"ArrowDown"==e.code&&this.getFromCommandHistory(n,-1)},getFromCommandHistory:function(e,t){let n=e.commandHistory[e.currentHistoryNumber+t];if(e.currentHistoryNumber+t<-1)return!1;terminalElement=apps.terminal.InitiateProcessVariables(e),null!=n?(terminalElement.input.value=n,e.currentHistoryNumber=e.currentHistoryNumber+t):e.currentHistoryNumber>e.currentHistoryNumber+t&&(terminalElement.input.value=e.currentCommand,e.currentHistoryNumber=-1),setTimeout(()=>{terminalElement.input.selectionStart=terminalElement.input.selectionEnd=terminalElement.input.value.length},0)}},settings:{name:"Settings",icon:"./img/settings.svg",layout:{selected:0,0:{name:"About",iconTag:"about_icon",getPanelHTML:function(){return`\n                    <h1>About</h1>\n                    <hr>\n                    <span>Build: ${system.build}</span>\n                    <div>Most icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>\n                `}},1:{name:"Appearance",iconTag:"appearance_icon",getPanelHTML:function(){return"\n                    <h1>Appearance Settings</h1>\n                    <hr>\n                "}},2:{name:"Desktop",iconTag:"desktop_icon",getPanelHTML:function(){return"\n                    <h1>Desktop Settings</h1>\n                    <hr>\n                "}},3:{name:"Sound",iconTag:"volume_icon",getPanelHTML:function(){return"\n                    <h1>Sound Settings</h1>\n                    <hr>\n                "}},4:{name:"User",iconTag:"user_icon",getPanelHTML:function(){return"\n                    <h1>User Settings</h1>\n                    <hr>\n                "}}},createData:{title:"Settings",fullHeight:!0,fullWidth:!0,minWidth:500,minHeight:500,onlyOneInstanceAllowed:!0,getHTML:function(){return`<div id='settingsAppContainer'><div id="sidebarMenu">${Object.entries(apps.settings.layout).map(e=>([menuItemId,menuItem]=[e[0],e[1]],"object"!=typeof menuItem?"":`<menuItem ${apps.settings.layout.selected==menuItemId&&"class='selected'"} onclick='apps.settings.switchToPanel(${menuItemId},false,this)'><${menuItem.iconTag}></${menuItem.iconTag}>${menuItem.name}</menuItem>`)).join("")}</div><div id='contentPanel'>${apps.settings.switchToPanel(0,!0)}</div></div>`}},switchToPanel:function(e,t=!1,n){let i=this.layout[e].getPanelHTML();return t?i:(document.querySelectorAll("#settingsAppContainer .selected").forEach(e=>e.classList.remove("selected")),document.querySelector("#settingsAppContainer > #contentPanel").innerHTML=i,n.classList.add("selected"),!0)}},google:{name:"Google Website",createData:{title:"Google Search",fullHeight:!0,fullWidth:!0,minWidth:1e3,minHeight:500,getHTML:function(){return"<iframe style='height:100%;' src=\"https://www.google.com/webhp?igu=1\"></iframe>"}}},notepad:{name:"Notepad",icon:"./img/notepad.svg",createData:{title:"Notepad - Untitled Document",fullWidth:!0,fullHeight:!0,getHTML:function(){return"<textarea></textarea>"},methods:{onFocus:function(){let e=this.getProcessElementBody().querySelector("textarea");document.activeElement!=e&&e.focus()}}}}};