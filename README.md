# webrtc

> A SkyWay sample on Vue.js
> Video chat and screen share

## Screenshot
![image](https://cdn-ak.f.st-hatena.com/images/fotolife/t/tmegos/20180407/20180407113904.png)

## Build Setup

``` bash
# install dependencies
npm install

# modify your key
sed -e 's/SkyWay key/[Your SkyWay key]/' src/credentials.js.sample > src/credentials.js

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
