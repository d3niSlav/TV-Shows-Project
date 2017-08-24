<p align="center">
  <img alt="TV-Shows project logo" src="http://tv-shows-project.herokuapp.com/images/logo-black.png"/>
</p>

# TV-Shows Project #
Grab your device, no matter smartphone, tablet, laptop or PC, and browse to a number of TV Shows. Find your favorites or check some new shows - it's up to you. We give you actual information about all shows in out website - summary of a show, information about a season or a short description of an episode. We also have a weekly schedule for you to see what shows are on this week.

<p align="center">
  <img alt="Responsive design of the website" src="http://tv-shows-project.herokuapp.com/images/responsive.png"/>
</p>

* **TV Shows Catalogue** - Get all information about your favorite TV Shows. Browse through the season and view every episode. See the trailer or leave a review.
* **TV Shows Scheduler** - Are you curious what shows are now on the TV. Check our weekly schedule to track your favorite shows.
* **Personal User Profile** - Create a profile in our website, add shows to favorites or make a watchlist to keep track on every show you are watching. From your profile you can make reviews and discuss your favorite shows. Also there is a progress tracker to your watched shows where you can mark your progress and never forget which was the last episode you watched.
 
Feel free to contact us at any time. Enjoy your TV SHOWS.


## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* **Git** - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* **Node.js** - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
* **MongoDB** - [Download & Install MongoDB](http://www.mongodb.org/downloads), it is used to connect and manage manually the project database.
* **Bower** - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages. Make sure you've installed Node.js and npm first, then install bower globally using npm:
```bash
$ npm install -g bower
```
* **Gulp** - [Install gulp.js](http://gulpjs.com/) to makes things simple like never before. You are going to use it to generate source maps for the Sass to CSS compilation.
```bash
$ npm install gulp-cli -g
```

Next you need to set your credentials for the database and the mail.
* **For the database**:

Rename the file:
```xpath
./config/db.example.js
```
To:
```xpath
./config/db.js
```

Inside the *db.js* file enter your link to the database. If you are using [mlab.com](https://mlab.com/) here is an example, for a mlab database with name *"tv-shows"*:
```javascript
module.exports = {
    url: 'mongodb://<username>:<password>@<mlab database>/tv-shows',
};
```

* **For the mailing**:

Rename the file:
```xpath
./config/mail-authentication.example.js
```
To:
```xpath
./config/mail-authentication.js
```

Inside the *mail-authentication.js* file enter your credentials to your [gmail](https://gmail.com) account:
```javascript
module.exports = {
    auth: {
        user: '<gmail address>',
        pass: '<gmail password>'
    }
};
```

## Quick Install
Once you've downloaded and installed all the prerequisites, you're just a few steps away from starting the TV Shows website.

The `package.json` and `bower.json` files contain the list of modules you need to start the website service.

To install the dependencies, run this in the application folder from the command-line:

```bash
$ npm install
```

## Running Your Application

Run your application using npm:

```bash
$ npm start
```

Your application should run on port 8001 with the *development* environment configuration, so in your browser just go to [http://localhost:8001](http://localhost:8001)

That's it! Your application should be running.