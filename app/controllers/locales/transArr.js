module.exports = function (res,arr) {
  var resMsg = [];
  for (var i = 0; i < arr.length; i++) {
      resMsg.push(res.__(arr[i]));
  }
  //console.log(arr);
  //console.log(resMsg);
  return resMsg;
};
