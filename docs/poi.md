# Poi

You can use Poi to run the example if your app supposed to work in browser too:

- [x] Select `Do you need to compile ES2015 code?`
- [x] Select `Use egoist/poi to run and build example`

Then you will get 4 addtional npm scripts:

- `npm run example`: Run `example/index.js` with [Poi](https://github.com/egoist/poi)
- `npm run build:example`: Build `example/index.js` to `example/dist` folder with Poi.
- `npm run gh`: Push `example/dist` folder to github pages.
- `npm run deploy`: Basically `npm run build:example && npm run gh`

By default `example/index.js` does nothing, it simply imports `src/index.js` and logs it out.