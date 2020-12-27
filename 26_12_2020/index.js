const http = require('http');
const fs = require('fs');
const path = require('path');

let server_is_run = false;


http.createServer(function(req,res){

    if(req.url == '' || req.url == '/' || req.url == '/main'){
        res.write(fs.readFileSync('index.html'));
        res.write('<p>home</p>');
    }
    else if(req.url == '/history'){
        res.write(fs.readFileSync('index.html'));
        res.write('<p>history</p>');
    }
    else if(req.url == '/signup'){
        res.write(fs.readFileSync('src/templates/signUp.html'));
        // res.write(`<style>${fs.readFileSync('src/style/signUp.css')}</style>`);
    }
    else{
        
        let extName = path.extname(req.url);
        let res_item = null;
        let new_dir = req.url.slice(1,req.url.length);
        let file_exists = false;

        // console.log(extName);

        if(req.url == '/favicon.ico'){}

        else{
            if(extName){
                if(fs.existsSync(new_dir)){
                    res_item = fs.readFileSync(new_dir);
                    file_exists = true;
                }
                else{
                    // FILE NOT EXISTS -- ERROR
                }
                
            }
            if(extName == '.js' && file_exists){
                res.write(res_item);
            }
            else if(extName == '.css' && file_exists){
                res.write(res_item);
            }
            else if(extName == '.html' && file_exists){
                res.setHeader("Content-Type", "text/javascript");
                res.write(res_item);
            }
            else{
                res.write(fs.readFileSync('src/templates/404.html'));
                // res.write(`<style>${fs.readFileSync('')}</style>`);
                res.write(`<h2>Material <span class = 'not_exists' >${new_dir}</span> isn't exists</h2>`);
                res.end('<h1>404 sry..</h1>');
            }
        }
    }
    server_is_run = true;
    res.end();
}).listen(8080);



