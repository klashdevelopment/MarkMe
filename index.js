const marked = require('marked');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

class Markme {
    codeStyle = "atom-one-dark";

    // https://github.com/highlightjs/highlight.js/tree/main/src/styles - codeStyle
    constructor(codeStyle = "atom-one-dark") {
        this.codeStyle = codeStyle;
    }
    parse(src, usesCode = true) {
        var code = `<div class="markme-content">
${marked.marked(src, {langPrefix: 'language-'})}
${usesCode ? `<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/${this.codeStyle}.min.css"><script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
<script>hljs.highlightAll()</script>` : ``}</div>`;
        return code;
    }
}

module.exports = {Markme, mark: function(src, codeTheme='atom-one-dark', usesCode=true){return new Markme(codeTheme).parse(src, usesCode);}};

app.use('/mark', (req, res)=>{
    var markme = new Markme();
    res.json({result: markme.parse(req.body.source, false)});
});

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