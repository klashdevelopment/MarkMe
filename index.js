const marked = require('marked');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const {Markme} = require('./api');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.use('/mark', (req, res)=>{
    var markme = new Markme();
    res.json({result: markme.parse(req.body.source, false)});
});

app.use('/example', (req, res) => {
    res.end(require('fs').readFileSync('public/index.html', {encoding: 'utf-8'}));
})

app.use('/mark/withCode', (req, res) => {
    var theme = req.query.theme;
    if (req.query.theme == null) {
        theme = 'atom-one-dark';
    }
    var markme = new Markme(theme);
    res.json({result: markme.parse(req.body.source, true)});
})

app.listen(process.env.PORT||3000, ()=>{
    console.log("MarkMe is listening! https://localhost:3000 for development");
});