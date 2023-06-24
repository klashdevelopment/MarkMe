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