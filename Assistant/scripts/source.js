const displayAnswer = (function() {
	const div = window.document.createElement('div');
	div.style.position = 'fixed';
	div.style.top = '50px';
	div.style.left = '50%';
	div.style.transform = 'translateX(-50%)';
	div.style.fontSize = '20px';
	div.style.zIndex = 9999;
	window.document.body.appendChild(div);
	return function(answerMsg) {
		div["innerText"] = answerMsg;
	};
})();
window.document.addEventListener('mousedown', function(e) {
	if (e["button"] == 2) {
		const question = e["target"]["innerText"].replace(/^\d+\.\s/, '');
		const data = {
			question: question
		};
		chrome.runtime.sendMessage(data, function(response) {
			displayAnswer("第" + e["target"]["innerText"].split('.')[0] + "题答案是" + response["answer"]);
		});
	}
});
