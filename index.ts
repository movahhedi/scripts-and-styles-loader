export const RelativePath2Url = (path: string) => new URL(path, document.baseURI).href;

/**
 * Checks whether a Script (JS) file is previously loaded.
 *
 * The comparing URLs must be exactly the same (`===`).
 * No extra slashes or query-strings. It's also case-sensitive.
```js
if (IsScriptLoaded(myScriptUrl)) {
    console.log("Script is loaded!");
}
```
 * @param url The URL of the script file
 * @returns A boolean whether ot not the JS file is previously loaded.
 */
export function IsScriptLoaded(url: string): boolean {
	let scripts = document.getElementsByTagName("script");
	for (let i = scripts.length; i--; ) if (scripts[i].src == RelativePath2Url(url)) return true;
	return false;
}

/**
 * Checks whether a style (CSS) file is previously loaded.
 *
 * The comparing URLs must be exactly the same (`===`).
 * No extra slashes or query-strings. It's also case-sensitive.
```js
if (IsStyleLoaded(myStyleUrl)) {
    console.log("Style is loaded!");
}
```
 * @param url The URL of the style file
 * @returns A boolean whether ot not the CSS file is previously loaded.
 */
export function IsStyleLoaded(url: string): boolean {
	let styles = document.getElementsByTagName("link");
	for (let i = styles.length; i--; ) if (styles[i].href == RelativePath2Url(url)) return true;
	return false;
}

/**
 * Loads a script (JS) file.
```js
LoadScript(myScriptUrl)
    .then(() => console.log("Script loaded!"));
```
 * @param url The URL of the script file
 * @returns A Promise
 */
export const LoadScript = (url: string): Promise<any> =>
	new Promise((resolve, reject) => {
		try {
			let script = document.createElement("script");
			script.type = "text/javascript";
			script.onload = resolve;
			script.onerror = reject;
			script.src = url;
			document.head.appendChild(script);

			// document.head.appendChild(<script type="text/javascript" onLoad={resolve} onError={reject} src={url}></script>);
		} catch (error) {
			reject(error);
		}
	});

/**
 * Loads a style (CSS) file.
```js
LoadStyle(myStyleUrl)
    .then(() => console.log("Style loaded!"));
```
 * @param url The URL of the style file
 * @returns A Promise
 */
export const LoadStyle = (url: string): Promise<any> =>
	new Promise((resolve, reject) => {
		try {
			let style = document.createElement("link");
			style.type = "text/css";
			style.rel = "stylesheet";
			style.onload = resolve;
			style.onerror = reject;
			style.href = url;
			document.head.appendChild(style);

			// document.head.appendChild(<link rel="stylesheet" type="text/css" onLoad={resolve} onError={reject} href={url} />);
		} catch (error) {
			reject(error);
		}
	});

/**
 * Loads a script (JS) file if it's not previously loaded.
 *
 * The comparing URLs must be exactly the same (`===`).
 * No extra slashes or query-strings. It's also case-sensitive.
```js
LoadScriptIfNew(myScriptUrl)
    .then(() => console.log("Script loaded!"));
```
 * @param url The URL of the script file
 * @returns A Promise
 */
export const LoadScriptIfNew = (url: string): Promise<any> => (IsScriptLoaded(url) ? Promise.resolve() : LoadScript(url));

/**
 * Loads a style (CSS) file if it's not previously loaded.
 *
 * The comparing URLs must be exactly the same (`===`).
 * No extra slashes or query-strings. It's also case-sensitive.
```js
LoadStyleIfNew(myStyleUrl)
    .then(() => console.log("Style loaded!"));
```
 * @param url The URL of the style file
 * @returns A Promise
 */
export const LoadStyleIfNew = (url: string): Promise<any> => (IsStyleLoaded(url) ? Promise.resolve() : LoadStyle(url));
