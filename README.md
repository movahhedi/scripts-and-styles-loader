# Scripts and Styles Loader

A simple alternative for dynamic importing JS and CSS files.

To load a script (JS) file, simply use:
```js
import { LoadScript } from "scripts-and-styles-loader";

LoadScript("https://use.fontawesome.com/releases/v6.3.0/js/all.js")
	.then(() => {
		console.log("Script loaded!");
	});
```

To load a style (CSS) file, use:
```js
import { LoadStyle } from "scripts-and-styles-loader";

LoadStyle("https://use.fontawesome.com/releases/v6.3.0/css/all.css")
	.then(() => {
		console.log("Style loaded!");
	});
```

You can also check if a file is previously loaded by using `IsScriptLoaded()` and `IsStyleLoaded()`:
```js
const myScriptUrl = "https://use.fontawesome.com/releases/v6.3.0/js/all.js",
      myStyleUrl = "https://use.fontawesome.com/releases/v6.3.0/css/all.css";

if (IsScriptLoaded(myScriptUrl)) {
		console.log("Script is loaded!");
}
if (IsStyleLoaded(myStyleUrl)) {
		console.log("Style is loaded!");
}
```

Or a *one-functioner* to make sure the script/style loads once:
```js
LoadScriptIfNew(myScriptUrl)
	.then(() => {
		console.log("Script is loaded!");
	})
	.then(() => LoadScriptIfNew(myScriptUrl))
	.then(() => {
		console.log("Not loaded again!");
	});

LoadStyleIfNew(myStyleUrl)
	.then(() => {
		console.log("Style is loaded!");
	})
	.then(() => LoadStyleIfNew(myStyleUrl))
	.then(() => {
		console.log("Not loaded again!");
	});
```


**Important**: For `IsScriptLoaded`, `IsStyleLoaded`, `LoadScriptIfNew` and `LoadStyleIfNew` to work properly, the comparing URLs must be exactly the same (`===`). No extra slashes or query-strings. It's also case-sensitive.

## License
Developed by [Shahab Movahhedi](https://shmovahhedi.com).

MIT licensed.
