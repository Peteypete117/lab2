var http = require('http');
var i = 0
var serverArray = [3333,2222,1111]

http.createServer( callServer ).listen(9999);
console.info("Server running ....");

function callServer(req, res)
{
  if(req.url == "/hello")
  {
    if(i == 2)
    {
      i = 0 
    }
    else
    {
      i += 1
    }
    http.get("http://localhost:" + serverArray[i], function(response) 
    {
      var str = '';
      //another chunk of data has been received, so append it to `str`
      response.on('data', function (chunk) 
      {
        str += chunk;
      });
      
      //the whole response has been received, so we just print it out here
      response.on('end', function () 
      { 
        res.writeHead(200,{"Content-Type":"text/html"})
        res.end(str)
      });
    }).on('error', function (e) 
    {
      callServer(req, res)
    });
  }
}
  