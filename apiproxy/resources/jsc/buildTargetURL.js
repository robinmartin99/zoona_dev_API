 /***************************
  * Build 'setup' variables that will be applied in the target request flow
  * 
  * ? Maybe also handle sandbox mapping ?
  ***************************/

//== Our two navigation route variables
var proxy_basepath = context.getVariable("proxy.basepath");
var proxy_x_api_test = context.getVariable("request.header.x-api-test");

//== Some standard stuff
context.setVariable("setup.target.copy.pathsuffix", false);
context.setVariable("setup.target.copy.queryparams", false);

//== Mostly will be this
 var basePath = "/v1/";
 
//== Stuff for TestBed
if (proxy_basepath == "/test" || proxy_x_api_test == "test") {
    
    //=== For some reason you can no longer set just the basepath :(
    var suffix = context.getVariable("proxy.pathsuffix");
    context.setVariable("setup.targetBase",basePath.concat(suffix) );
}

//== More difficult mapping for Sandbox moved to separate proxy 
if (proxy_basepath == "/sand" || proxy_x_api_test == "sand") {
    basePath = "/";
    var suffix = context.getVariable("proxy.pathsuffix");
    context.setVariable("setup.targetBase",basePath.concat(suffix) );
}


