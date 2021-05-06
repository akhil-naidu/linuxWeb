function parseDir(e,t=null,s=null){let r=isDefined(t)?t.currentDirectory:"/";return!isDefined(s)&&isDefined(e)&&(s=e["@s"]),isDefined(s)&&(s=s.endsWith("/")?s.slice(0,-1):s,r=isTextEmpty(s)?"/":".."==s?r.split("/").slice(0,-1).join("/"):s.startsWith("/")?s:r+(r.endsWith("/")?"":"/")+s),!r.startsWith("/")&&(r="/"+r),r}system={started:!1,activeUser:"",encPassword:"bf0dbd74174039131b667de9f31b5d8012baaf82011b934b2cc0e3bd53a02a1f",global:{volume:50,brightness:100,doNotDisturb:!1,css:{}},accounts:{root:{username:"root",privileged:!0,encPassword:"bf0dbd74174039131b667de9f31b5d8012baaf82011b934b2cc0e3bd53a02a1f",settings:{}},user1:{username:"user1",privileged:!1,encPassword:"bf0dbd74174039131b667de9f31b5d8012baaf82011b934b2cc0e3bd53a02a1f",settings:{background:{type:"cssVar",variable:"user-background",value:"url('https://cdn.pling.com/img//hive/content-pre1/155710-1.jpg')"},profilePictureUrl:"https://p.favim.com/orig/2018/10/01/cartoon-profile-picture-cute-Favim.com-6346120.jpg"}}},validatePassword:function(e,t){return!!isDefined(system.accounts[e])&&sha256(btoa(t))==system.accounts[e].encPassword},changeBrightness:function(e){this.global.brightness=e,document.querySelector("html").style.filter=`brightness(${system.global.brightness/100})`},changeVolume:function(e){this.global.volume=e,X.services.volume.update()},startup:function(){if(this.started)return!1;this.started=!0,(async()=>{system.build=await(async()=>(await fetch("./build.ver")).text())()})(),X.initialize()},cli:{i:function(e=!1,t=!1){if(!e||!t)return!1;let s=null,r=e.trim(),n=!1;r.includes(">")&&([r,n]=r.split(">"),n=parseDir(null,t,n.trim())),argArray=(r+" ").split(" ");let i=argArray.splice(0,1)[0].trim();if(0!=argArray.length&&(1!=argArray.length||0!==argArray[0].trim().length)){s={"@":[],$raw:r};let e="",t="";for(let r=0;r<argArray.length;r++)if(x=argArray[r].trim(),x.startsWith("-")&&x.length>1)isTextEmpty(e)||(obj=this.appendToOptions(e,"",s),e=""),e=x.startsWith("--")&&x.length>2?"-"+x.replaceAll("-",""):x.replaceAll("-","");else{if(isTextEmpty(e))s["@"].push(x);else{if(x.startsWith('"')){t+=x.slice(1)+" ";for(let e=r+1;e<argArray.length;e++){let s=argArray[e]+" ";if(console.log(s,"j",e,"i",r),s.startsWith("-")){r=e;break}if(s.includes('"')){t+=s.split('"')[0],r=e;break}t+=s}x=t,t=""}obj=this.appendToOptions(e,x,s)}e=""}s["@s"]=s["@"].join(" ").trim()}try{const e=null!=system.cli.commands[i]?system.cli.commands[i].method(s,t):i+": command not found";if(!n)return e;fileSystem.write(n,1,e,777)}catch(e){throw`${i}: ${e}`}},appendToOptions:function(e,t,s){if(e.startsWith("-"))s["-"+e]=t;else if(!isTextEmpty(e))for(const r of e)s["-"+r]=t;return s},commands:{help:{shortHelp:"Displays help pages for commands",help:"Displays a help page for commands\n      \nUSAGE\n  help\n  help <command>",method:e=>{let t="";if(null==e)t="-----help-----\n",t+="For more information about a specific command type: help <command>\n\n",t+=Object.entries(system.cli.commands).map(e=>`${e[0].length>15&&e[0].slice(0,12)+"..."||e[0]}    ${e[0].length<8?"    ":""}${e[1].shortHelp??"*No short help available*"}\n`).join("");else{let s=e["@"][0];null==system.cli.commands[s]||null==system.cli.commands[s].help?t=`No help for '${s}' try: help help`:(t=`----- ${s} help-----\n\n`,t+=system.cli.commands[s].help+"\n")}return t}},uname:{shortHelp:"Prints System Information",help:"Prints System Information",method:e=>"linuxWEB"},whoami:{shortHelp:"Prints Username Information",help:"Prints System Information",method:e=>"root"},clear:{shortHelp:"Prints Username Information",help:"Prints System Information",method:(e,t)=>{t.clear()}},echo:{shortHelp:"Echos your message back to you",help:"Echos your message back to you\n\nUSAGE\n  echo <message>\n   ----------------\n  echo Hello Word",method:e=>{if(null!=e){let t=e["@s"];return t=t.trim(),'"'==t[0]&&'"'==t.slice(-1)&&(t=t.slice(1,-1)[0]),t}}},app:{shortHelp:"Starts an app",help:"Starts an app\n\nUSAGE\n  app <app name>\n  ----------------\n  app terminal\n  app notepad",method:e=>{if(!isDefined(e))return system.cli.commands.app.help;let t=e["@s"];if(null==apps[t])throw t+": No such app";processes.create(t)}},shutdown:{shortHelp:"Shoots the computer",help:"Makes computer go beep boob RIP.\n\nUSAGE\n  shutdown",method:()=>{system.shutdown()}},restart:{shortHelp:"Restarts",help:"Restarts the computer\n\nUSAGE\n  restart",method:()=>{system.restart()}},logout:{shortHelp:"Logouts",help:"Restarts the computer\n\nUSAGE\n  logout",method:()=>{system.logout()}},lock:{shortHelp:"Locks the screen",help:"Locks the screen\n\nUSAGE\n  lock",method:()=>{X.lockScreen.lock()}},exit:{shortHelp:"Exits the terminal window",help:"Exits the terminal window\n\nUSAGE\n  exit",method:(e,t)=>{processes.remove(t.elementId)}},kill:{shortHelp:"Kills a process by pid",help:"Kills a running process\n\nUSAGE\n  kill <process pid>\n  ----------------\n  kill 1",method:e=>{console.log(e);let t=e["@s"];if(isNaN(Number(t)))throw t+" - Must be a number";if(!isDefined(processes.pid[t]))throw t+" - No such process";processes.remove("pid"+t)}},killall:{shortHelp:"Kills processes",help:"Kills all running processes of a name\n\nUSAGE\n  killall <process name>\n  ----------------\n  killall terminal\n  killall google",method:e=>{let t=e["@s"];if(processList=processes.getRunningInstanceList(t),!isValid(processList)||0==processList)throw t+" - No processes found";for(const e of processList)processes.remove("pid"+e.id)}},remind:{shortHelp:"Create a reminder",help:"Create a reminder\n\nUSAGE\n  remind <message> -t <seconds>\n  ----------------\n  remind Sleep in the shed -t 180,\n  remind Go to bed -t 3600",method:e=>{const t=e["@s"],s=e["-t"];if(isNaN(Number(s)))throw" -t: must be a number";if(!isValid(t)||0==t.length)throw"message - Cannot be empty";setTimeout(()=>{X.notification.create("Reminder",t,"","",!1,!0)},1e3*s)}},ls:{shortHelp:"List the contents of a directory",help:"List the Contents of the current or provided directory\n\nUSAGE\n  ls <directory>\n  ----------------\n  ls\n  ls /home",method:(e,t)=>{path=parseDir(e,t);let s=!1,r=fileSystem.getDir(path,!1,!0,0),n=`Contents of '${path}' :\n`;return isDefined(e)&&(s=!!isDefined(e["-l"])),Object.entries(r).forEach(e=>{if("\\0"!=e[0]){if(s){let t=1==fileSystem.getType(e[1])?"-":"d",s=fileSystem.getPermissions(e[1]);n+=`${t} ${s}`}n+=` ${e[0]}\n`}}),n.slice(0,-1)}},cd:{shortHelp:"Changes Directory",help:"Changes the current directory or display the current directory\n\nUSAGE\n  cd <directory>\n  ----------------\n  cd\n  cd /home",method:(e,t)=>{path=parseDir(e,t),t.setCurrentDirectory(path)}},cat:{shortHelp:"Displays file content",help:"Displays the contents of a file\n\nUSAGE\n     cat <path/to/file>\n  ----------------\n  cat example.txt\n  cat /home/example.txt",method:(e,t)=>(path=parseDir(e,t),fileSystem.read(path))},mkdir:{shortHelp:"Create a Directory",help:"Create a Directory\n\nUSAGE\n  mkdir <directory> or <path/to/directory>\n  ----------------\n  mkdir project\n  mkdir /var/www",method:(e,t)=>{path=parseDir(e,t),fileSystem.write(path,0,null,777)}},touch:{shortHelp:"Creates a file",help:"Creates a file\n\nUSAGE\n  touch <path/to/file>\n  ----------------\n  touch example.txt\n  touch /home/example.txt",method:(e,t)=>{path=parseDir(e,t),fileSystem.write(path,1,"",777)}},write:{shortHelp:"Writes to a file",help:"Writes to a file\n\nUSAGE\n  write <text> -f <path/to/file>\n  ----------------\n  write Hello -f example.txt\n  write Hi! -f /home/example.txt",method:(e,t)=>{if(null==e||!isDefined(e["-f"]))throw"Path must be specified with -f!";if(isTextEmpty(e["-f"]))throw"-f: Path can't be empty!";dir=e["-f"],text=e["@s"],path=parseDir(e,t,dir),fileSystem.write(path,1,text,755)}},rm:{shortHelp:"Removes a file",help:"Removes a file\n\nUSAGE\n  rm <path/to/file>\n  ----------------\n  rm example.txt",method:(e,t)=>{if(null==e)throw"Path must be specified";dir=e["@s"],path=parseDir(e,t,dir),fileSystem.removeFile(path,isDefined(e["-f"]))}},rmdir:{shortHelp:"Removes a directory",help:"Removes a directory\n\nUSAGE\n  rmdir <path/to/dir>\n  ----------------\n  rmdir var/example",method:(e,t)=>{if(null==e)throw"Path must be specified";dir=e["@s"],path=parseDir(e,t,dir),console.log(isDefined(e["-f"]),e["-f"]);try{fileSystem.removeDir(path,isDefined(e["-f"]))}catch(e){if(e.startsWith("Error 10"))throw"That directory is not empty";throw e}}},top:{shortHelp:"Lists the active processes",help:"List the active processes\nUSAGE\n  top",method:function(e,t){t.initUpdate(this.update,e)},update:function(e,t,s=null){if(obj=processes.getPidObject()){ret="PID    AppName\n";for(const e of Object.values(obj))ret+=`${e.id}    ${e.appName} \n`;return ret}}}}},shutdown:()=>page.changePage("./views/shutdown.html"),logout:async()=>{for(const e of jsSources)await page.loadJs(e);page.changePage("./views/X.html","system.startup();")},restart:()=>page.changePage("./views/shutdown.html","afterShutdown='restart'",!1)};