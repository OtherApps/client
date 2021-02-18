ar needle = require('needle');

main();

function main(){
// Ask user for url  to download
var url =""; 

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})


readline.question(`What url would you like to download?`, url => {
  console.log(`Now downloading ${url}!`)
  readline.close()
  needle.get(url, function(error, response) {
  if (!error && response.statusCode == 200)
    //console.log(response.body);

getVideo(url);

});
	
})


	
}

function getVideo(url2){
	// Will download in the  current  folder  
	
var parse=require('url-parse');
var url= parse(url2,true)
var path = require('path')
var filename =path.basename(url.pathname);

FileName2=decodeURI(filename);

	needle.get(url2, { output: FileName2 }, function(err, resp, body) {
  // you can dump any response to a file, not only binaries.

console.log("All done with ${FileName2}/r"); 
  
});

}	
