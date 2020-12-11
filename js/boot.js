document.body.addEventListener("keypress", async () => {

	loginHtml = await fetch("./X/Xorg-login.html");
	loginHtml = await loginHtml.text();

	bootTimeMax = 5000; //ms
	var bootText = [
		"Setting up Interfaces ...",
		"Configuring Drivers ...",
		"Starting CPUController ...",
		"Setting up PC/SC Service ...",
		"Configuring NETappid ...",
		"Starting System Services ...",
		"Mounting /dev/sda ...",
		"Configuring the USB Controller ...",
		"Starting kernel logger ...",
		"Configuring eth0 ...",
		"Starting Gdroot ...",
		"Populating /dev with existing devices through uEvent ...",
		"Waiting for udev...",
		"Preparing NetworkProxyMirror ...",
		"Booting into LinuxGUI ...",
	];

	for (let i = 0; i < bootText.length; i++) {
		document.querySelector("boot_info").innerHTML += `<boot_msg>${bootText[i]} <span>[ OK ]</span></boot_msg>`;
		await delay(Math.random() * bootTimeMax / bootText.length)
		//     /\ Equal delay for each boot message
	}

	await delay(100);

	await (await (htmlEl.innerHTML = await loginHtml)) && getJS.LoadAllJsFromHead();

});
