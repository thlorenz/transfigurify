# transfigurify [![build status](https://secure.travis-ci.org/thlorenz/transfigurify.png)](http://travis-ci.org/thlorenz/transfigurify)

Configure which [browserify](https://github.com/substack/node-browserify) transforms get applied to your package via an environment variable.

#### package.json

```json
{
  "browserify": {
    "transform": [
      "hbsfy",
      "transfigurify"
    ]
  },
  "transfigurify": {
    "test": [
      "brfs"
    ]
  },
  "dependencies": {
    "brfs": "0.0.9",
    "hbsfy": "~0.1.3",
    "transfigurify": "~0.1.0"
  }
}
```

In this configuration the `hbsfy` transform runs always, but the `brfs` transform is applied only if
`TRANSFIGURIFY_ENV=test`, i.e:

    TRANSFIGURIFY_ENV=test browserify main.js > bundle.js

## Examples

Please review and try this [full example](https://github.com/thlorenz/transfigurify/tree/master/example) to get a better
understanding of how transfigurify works.

Reading the [tests](https://github.com/thlorenz/transfigurify/tree/master/test) is also benefitial to that end.

## Installation

    npm install transfigurify

## API

<!-- START docme generated API please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN docme TO UPDATE -->

<div>
<div class="jsdoc-githubify">
<section>
<article>
<div class="container-overview">
<dl class="details">
</dl>
</div>
<dl>
<dt>
<h4 class="name" id="transfigurify::env"><span class="type-signature"></span>transfigurify::env<span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>The env variable which is used by transfigurify to determine which transforms config in the <code>package.json</code> to use
in order to apply transforms.</p>
<p>You need to set this or provide it via the <code>TRANSFIGURIFY_ENV</code> environment variable.</p>
<pre><code class="lang-js">// setting from javascript
transfigurify.env = 'test';</code></pre>
<pre><code class="lang-sh"># setting from command line
TRANSFIGURIFY_ENV=test browserify -t transfigurify ...</code></pre>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/transfigurify/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/transfigurify/blob/master/index.js#L57">lineno 57</a>
</li>
</ul></dd>
</dl>
</dd>
</dl>
<dl>
<dt>
<h4 class="name" id="transfigurify"><span class="type-signature"></span>transfigurify<span class="signature">(file)</span><span class="type-signature"> &rarr; {TransformStream}</span></h4>
</dt>
<dd>
<div class="description">
<p>browserify transform which applies a set of browserify transforms that are configured inside <code>package.json</code>.
Multiple sets can be configured and a matching one selected depending on the <code>TRANSFIGURIFY_ENV</code> environment variable.</p>
<p>This variable can also be set directly via <code>transfigurify.env='x'</code>.</p>
<p>If no matching configuration is found or the environment variable wasn't set a through stream is returned which
means that the file will not be transformed by transfigurify.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>file</code></td>
<td class="type">
<span class="param-type">string</span>
</td>
<td class="description last"><p>file whose content is to be transformed</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/transfigurify/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/transfigurify/blob/master/index.js#L10">lineno 10</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>transform that is composed of the transforms that were configured for the environment (if any)</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">TransformStream</span>
</dd>
</dl>
</dd>
</dl>
</article>
</section>
</div>

*generated with [docme](https://github.com/thlorenz/docme)*
</div>
<!-- END docme generated API please keep comment here to allow auto update -->

## License

MIT
