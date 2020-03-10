if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env' });
}

const bodyParser = require('body-parser');
const app = require('express')();
const sendEmail = require('./sender');
const port = process.env.PORT;

// parse application/x-www-form-urlencoded and application/json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.listen(port, () => console.log(`Email Service API listening on port ${port}!`));

app.post('/email', (req, res) => {
  const {
    templateName,
    from,
    to,
    name,
    confirm_account_url,
    reset_password_url
  } = req.body;

  const data = {
    templateName,
    from,
    to,
    name,
    confirm_account_url,
    reset_password_url
  };

  //pass the data object to send the email
  sendEmail(data, res);
});