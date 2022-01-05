const exp = require('constants');
const express = require('express');
//const ejs = require('ejs');
const path = require('path');
const qrcode = require('qrcode');


const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'))

app.get('/', (req, res, next) => {
    res.render('index')
});

app.post('/generate', (req, res, next) => {
    const content = req.body.content;
    var opts = {};
    var color = {}
    if(req.body.errorCorrectionLevel){
        opts["errorCorrectionLevel"] = req.body.errorCorrectionLevel;
    }
    if(req.body.qMargin){
        opts["margin"] = req.body.qMargin;
    }
    if(req.body.qScale){
        opts["scale"] = req.body.qScale;
    }
    if(req.body.qWidth){
        opts["width"] = req.body.qWidth;
    }
    if(req.body.darkColor){
        color["dark"] = req.body.darkColor;
    }
    if(req.body.lightColor){
        color["light"] = req.body.lightColor;
    }
    opts["color"] = color;

    var passThru = {content, opts};

    qrcode.toDataURL(content, opts ,(err, src) => {
        if(err) {
            res.render('error', {Error: err});
        }
        res.render('qrcode', {
            qrCode_Source: src
        });
    });
});

app.post('/download', (req, res, next) => {

});

app.listen(port, console.log(`Listening to port ${port}`));