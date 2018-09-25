var http = require('http');
var fs = require('fs');
var formidable = require('formidable');

// html file containing upload form
var upload_html = fs.readFileSync("upload.html");
var success_html = fs.readFileSync("success.html");

// replace this with the location to save uploaded files
// fs.createWriteStream("uploaded")
var upload_path = "./uploaded/";
var PORT = 8080;

http.createServer(function (req, res) {
    if (req.url == '/') {
        res.writeHead(200);
        res.write(upload_html);
        return res.end();
    } else if (req.url == '/upload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            // oldpath : temporary folder to which file is saved to
            var oldpath = files.filetoupload.path;
            var newpath = upload_path + files.filetoupload.name;
            // copy the file to a new location
            fs.rename(oldpath, newpath, function (err) {
                if (err) {
                    res.write(upload_html);
                    res.end();
                    return;
                }
                // you may respond with another html page
                // res.write('File uploaded!');
                res.write(success_html);
                res.end();
            });
        });
    }
}).listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});