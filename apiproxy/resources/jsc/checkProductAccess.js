 /*********************************
  * Check Dev kee is for product / path we are on.
  * 
  ********************************/ 
var allowedBasePaths = context.getVariable("verifyapikey.checkAPIKey.apiproduct.BasePaths");
var thisBase = context.getVariable("proxy.basepath");
var allowed = allowedBasePaths.includes(thisBase); 
context.setVariable("baseAccessAllowed",allowed);