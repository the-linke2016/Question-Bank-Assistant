//contentscript.js
const displayAnswer = (function() {
	const div = window.document.createElement('div');
	div.style.position = 'fixed';
	div.style.top = '2px';
	div.style.left = '5%';
	div.style.transform = 'translateX(-50%)';
	div.style.fontSize = '1px';
	div.style.zIndex = 9999;
	window.document.body.appendChild(div);
	return function(answerMsg) {
		div["innerText"] = answerMsg;
	};
})();
window.document.addEventListener('mousedown', function(e) {
	if (e["button"] == 2) {
		// const question = e["target"]["innerText"].replace(/^\d+\.\s/, '');
		const question = window.getSelection?window.getSelection().toString():document.selection.createRange().text;
		const data = {
			question: question
		};
		console.log(question);
		chrome.runtime.sendMessage(data, function(response) {
			//displayAnswer("第" + e["target"]["innerText"].split('.')[0] + "题答案是：" + response["answer"]);
			displayAnswer(e["target"]["innerText"].split('.')[0] + "****" + response["answer"]);
		});
	}
});


//background.js
chrome.runtime.onMessage.addListener(async function(
  requestData,
  sender,
  sendResponse
) {
  $.ajax({
    url: 'http://qaquery.applinzi.com/qa/qa.php',
    type: 'POST',
    data: requestData,
    dataType: 'json',
    async: false,
    success: function(data) {
      sendResponse(data);
			// console.log(data)
    },
    error: function(error) {
      sendResponse({ answer: '获取答案失败' });
			// console.log(error);
    },
  });
});

