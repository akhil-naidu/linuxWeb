
function RNG(){
    return Math.random()*Math.random()*100
    
}
boot();    
function boot(){
i=0

job1 = "<span class='ok'>[ OK ]</span>Stopped Login Service. <br><span class='ok'>[ OK ]</span> Stopped Permit User Sessions. <br><span class='ok'>[ OK ]</span> Stopped target Remote File Systems. <br><span class='ok'>[ OK ]</span> Stopped target Remote File Systems (Pre). <br><span class='ok'>[ OK ]</span> Stopped Deferred execution scheduler. <br><span class='ok'>[ OK ]</span> Started Unattended Upgrades. <br><span class='ok'>[ OK ]</span> Stopped System Logging Service. <br><span class='ok'>[ OK ]</span> Stopped Accounts Service. <br><span class='ok'>[ OK ]</span> Stopped OpenBSD Secure Shell server. <br><span class='ok'>[ OK ]</span> Stopped target Network.  <br>Stopping ifup for eth0... <br><span class='ok'>[ OK ]</span> Stopped target Basic System. <br><span class='ok'>[ OK ]</span> Stopped target Slices. <br><span class='ok'>[ OK ]</span> Removed slice User and Session Slice. <br><span class='ok'>[ OK ]</span> Stopped target Paths. <br><span class='ok'>[ OK ]</span> Stopped target Sockets. <br><span class='ok'>[ OK ]</span> Closed UUID daemon activation socket. <br><span class='ok'>[ OK ]</span> Closed ACPID Listen Socket. <br><span class='ok'>[ OK ]</span> Closed Syslog Socket. <br><span class='ok'>[ OK ]</span> Closed D -Bus System Message Bus Socket. <br><span class='ok'>[ OK ]</span> Stopped target System Initialization. <br><span class='ok'>[ OK ]</span> Stopped target Swap.  <br>Stopping Network Time Synchronization... <br>Stopping LSB: Raise network interfaces.... <br><span class='ok'>[ OK ]</span> Stopped Apply Kernel Variables.  <br>Stopping Apply Kernel Variables... <br><span class='ok'>[ OK ]</span> Stopped Load Kernel Modules.  <br>Stopping Load Kernel Modules... <br>Stopping Update UIMP about System Boot/Shutdown... <br><span class='ok'>[ OK ]</span> Stopped target Encrypted Volumes. <br><span class='ok'>[ OK ]</span> Stopped Update UTAP about System Boot/Shutdown. <br><span class='ok'>[ OK ]</span> Stopped Network Time Synchronization. <br><span class='ok'>[ OK ]</span> Stopped LSB: Raise network interfaces.. <br>Stopping Load/Save Random Seed... <br><span class='ok'>[ OK ]</span> Stopped Load/Save Random Seed. <br><span class='ok'>[ OK ]</span> Stopped ifup for eth0. <br><span class='ok'>[ OK ]</span> Stopped Create Volatile Files and Directories. <br>Stopping Create Volatile Files and Directories... <br><span class='ok'>[ OK ]</span> Stopped target Local File Systems. <br>Unmounting /run/user/1000... <br>Unmounting /boot/efl... <br>Stopping Monitoring of LUNE mirrors, snapshots etc.  using dmeuentd or progress polling... <br><span class='ok'>[ OK ]</span> Removed slice system-ifup.slice. <br><span class='ok'>[ OK ]</span> Unmounted /run/user/1000. <br><span class='ok'>[ OK ]</span> Unmounted /boot/ell. <br>Unmounting /boot... <br><span class='ok'>[ OK ]</span> Unmounted /boot. <br><span class='ok'>[ OK ]</span> Stopped target Local File Systems (Pre). <br><span class='ok'>[ OK ]</span> Stopped Remount Root and Kernel File Systems. <br>Stopping Remount Root and Kernel File Systems... <br><span class='ok'>[ OK ]</span> Stopped Create Static Device Nodes in /dev. <br>Stopping Create Static Device Nodes in /deo... <br><span class='ok'>[ OK ]</span> Reached target Shutdown. ";
text = job1.split("<br>") 
a=setTimeout(printText,RNG());

}

function redirect(){window.location="./LoginGUI.php"}

function printText(){
    
    window.scrollTo(0,document.body.scrollHeight);
    document.getElementById("text1").innerHTML += "<br>"+text[i];
    i+=1;
    if (i<text.length){a=setTimeout(printText,RNG())}else{ setTimeout( function(){document.getElementById("text1").innerHTML=""},3000)}

}


function enter(e){
    code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13 && i>=text.length) {
        
        window.location="./Boot.php";
    }}




