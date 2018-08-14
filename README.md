
# MyBrandBug

> Web Application for MyBrandBug

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
You need to have these installed in order to work with the project:

* NodeJS
* Vue-cli (you need to have NodeJS first before installing this)

### Installing vue-cli
If vue-cli is not yet installed, run this command to install it. You only need to install vue-cli once. It should carry to your next vue projects
``` bash
# install the vue-cli from npm
npm install -g vue-cli
```

### Setting up your dev environment

``` bash
# clone from the repository
git clone https://<username>@bitbucket.org/mybusybee/mbb-frontend.git <project-name>

# cd into the project folder
cd <project-name>

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

### Working with the Project

The entry point for this project is the main.js file. It is located at
`
src/main.js
`

Notes:

* You will be only changing the files within the src folder
* create your own branch when contributing to this project
* after doing tweaks, build the app for production.
* proceed with commit, push, and creation of pull request

The app uses:

* Standard ESLint for linting JavaScript (See the rules at https://standardjs.com/)
* ES6 JavaScript (Read more about it at https://github.com/lukehoban/es6features)
* PugJS for HTML templates (See the sample at src/components/HelloWorld/hello-world.pug)
* Stylus for CSS templates (See the sample at src/components/HelloWorld/hello-world.styl)
* Axios for AJAX requests (https://github.com/axios/axios)
* Vuex for State Management (https://vuex.vuejs.org/guide/)
* Vue Router for routing (https://router.vuejs.org/guide/)

### Building the App for Production
``` bash
# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Built with
This Application is built with:

* VueJS for the Front End (https://vuejs.org/v2/guide/)
* Laravel for the Back End (https://laravel.com/docs/5.6/)


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

Check out the live website at [MyBrandBug.com](http://mybrandbug.com)

