// Stand alone server must install express serve-index http formidable url fs multer path uuid ytd1-core 

const express = require('express')
const serveIndex = require('serve-index')
var http = require('http');
var formidable = require('formidable');
const url = require('url');
var fs = require('fs');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid').v4;

const ytdl = require('ytdl-core');
const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'K:/mp3/uploads/')
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        // or 
        // uuid, or fieldname
        cb(null, originalname);
    }
})
const upload = multer({ storage }); // or simply { dest: 'uploads/' }


app.use(
  '/ftp',
  express.static('K:/mp3/'),
  serveIndex('K:/mp3/',{"icons":true, stylesheet: "./styles.css"})
)
app.get('/', (req, res) => {
 loadFile(res,"./html/index.html"); 
 
  
})

app.use('/2021', express.static("I://LVE"), serveIndex('I:/LVE/',{"icons":"true"}));


 






app.get('/yt', (req, res) => {
 loadFile(res,"./html/youtube.html"); 
 
  
})
app.get('/video',(req,res)=>{
	pat="./media/";
	file_name=pat+"1.mp4";
	
	showVideo(req,res,file_name);

	
})
app.get('/download', (req, res) => {
    var url = req.query.url;    
    res.header("Content-Disposition", 'attachment;\  filename="Video.webm');    
	ytdl(url, {format: 'webm'}).pipe(res);
});


app.get('/stream',(req,res)=>{
	
	loadFile(res,"./html/showvideo.html");
	
})


app.post('/upload', upload.array('avatar'), (req, res) => {
   loadFile(res,"./html/index.html"); 

//   return res.json({ status: 'OK', uploaded: req.files.length });
});


function showVideo(req2,res2,filename){

const path = filename
var path2 = require('path');
const stat = fs.statSync(path)
const fileSize = stat.size
const range = req2.headers.range
 const ext = path2.extname(filename);
 
if (range) {
	console.log("New method of loading videos");
const parts = range.replace(/bytes=/, "").split("-")
const start = parseInt(parts[0], 10)
const end = parts[1]
? parseInt(parts[1], 20)
: fileSize-1
 
const chunksize = (end-start)+1
const file = fs.createReadStream(path, {start, end})

console.log("Sending " + chunksize);

const head = {
'Content-Range': `bytes ${start}-${end}/${fileSize}`,
'Accept-Ranges': 'bytes',
'Content-Length': chunksize,
'Content-Type': 'video/${ext}',
}
 
res2.writeHead(206, head)
file.pipe(res2)
} else {
	
	console.log("Old method of loading videos");
const head = {
'Content-Length': fileSize,
'Content-Type': 'video/${ext}',
}
res2.writeHead(200, head)
fs.createReadStream(path).pipe(res2)
}
	 


}
function loadFile(response,filename){




response.writeHead(200, {'Content-Type': 'text/html'});
	fs.readFile('./'+filename, null, function (error, data) {
        if (error) {
            response.writeHead(404);
            respone.write('Whoops! File not found!');
        } else {
            response.write(data);
        }
      response.end();
    });


  
}

app.listen(3000, () => console.log('ðŸš€ is on port 3000...'))
