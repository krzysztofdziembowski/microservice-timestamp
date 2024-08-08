// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  let input = req.params.date;
  console.log(input)

  if (!input) {
    handleEmptyDate(res)
  } else if (ms = Number(input)) {
    handleDateInMs(ms, res)
  } else {
    handleDateInString(input, res)
  }

  res.json({ error : "Invalid Date" })
})

const handleEmptyDate = (res) => {
  let date = new Date();
  let ms = date.getTime();
  res.json({
    "unix": ms,
    "utc": date.toUTCString()
  })
}

const handleDateInMs = (ms, res) => {
  let date = new Date(ms)
  if(date)
    res.json({
    "unix": ms,
    "utc": date.toUTCString()
  })
}

const handleDateInString = (dateString, res) => {
  let date = new Date(dateString)
  if(isDateValid(date)) {
    ms = Number(date.getTime())
    res.json({
      "unix": ms,
      "utc": date.toUTCString()
    })
  } else {
    res.json({ error : "Invalid Date" })
  }
}

function isDateValid(date) {
  return date instanceof Date && !isNaN(date)
}

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
