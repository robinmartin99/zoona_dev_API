 //== You cannot only set the basepath - set whole URL
 var host = context.getVariable("target.url");
 var basePath = context.getVariable("setup.targetBase");
 var newURL = host.concat(basePath);
 context.setVariable("target.url",newURL);