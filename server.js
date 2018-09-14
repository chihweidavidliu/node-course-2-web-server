const express = require('express');
const hbs = require('hbs');
const fs = require('fs')
let app = express();

app.set('view engine', 'hbs') // initiate hbs
hbs.registerPartials(__dirname + '/views/partials')


// middleware ( functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle)
app.use((req, res, next) => { // define middeware that logs all requests
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;

  //use fs to log requests to a file
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log("Unable to append to server.log.")
    }
  })

  // also log requests to the console
  console.log(log);
  next(); // this is necessary to tell the code to move on to the next piece of middeware
})


// app.use((req, res, next) => { // this middleware purposely excludes next() in order to set up a 'maintenance mode' with a 'be right back' splash page
//   res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public')); // middleware that sets up static directory in a folder of your choice - for your pages which don't need to be loaded dynamically



// helpers (a helper is a function that you might want to run over and over again within your templates)
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})


// set up pages
app.get('/', (req, res) => { // specify handler for the root of the website
  // res.send('<h1>Hello Express</h1>')
  res.render('home.hbs', {
    pageTitle: "Homepage",
    welcomeMessage: 'Welcome to my website',
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  })
})

app.get('/bad', (req, res) => {
  res.send({Error: "Error handling request"});
})


app.listen(3000, () => {
  console.log("Server is up on port 3000")
});
