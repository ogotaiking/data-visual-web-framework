var i18n = require('i18n');
var languages =  ['en', 'en-US', 'zh-TW', 'zh', 'zh-CN'];

module.exports = function (req, res, next){
  var locale;
  //配置i18n
  i18n.configure({
    locales: languages,  //声明包含的语言
    register: res,
    directory: __dirname + '/lib',  //翻译json文件的路径
    defaultLocale: 'en',   //默认的语言
    indent: "\t",
    extension: '.js'  // 由于 JSON 不允许注释，所以用 js 会方便一点，也可以写成其他的，不过文件格式是 JSON
  });

 //客户端可以通过修改cookie进行语言切换控制
  if(req.cookies['locale']){
    locale = req.cookies['locale'];
  }
  else if(req.acceptsLanguages()){
    locale = req.acceptsLanguages()[0];
  }
  if(!~languages.indexOf(locale)) {
    locale = 'en';
  }
  // 设置i18n对这个请求所使用的语言
  res.setLocale(locale);
  next();
};
