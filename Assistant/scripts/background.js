chrome.runtime.onMessage.addListener(async function(
  requestData,
  sender,
  sendResponse
) {
  $.ajax({
    url: 'http://qaquery.applinzi.com/qa.php',
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

