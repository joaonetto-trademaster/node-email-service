const sgMail = require("@sendgrid/mail");

module.exports = sendEmail = (data, res) => {
  let msg;
  sgMail.setApiKey(process.env.SENDGRID_NODE_API);

  templates = {
    password_reset: "d-b95d5b8fa5674b808f8d1c50707aea97",
    welcome: "d-33166d09969e4a25a9c57530c3abc098",
  };

  msg = {
    to: data.to,
    from: data.from,
    templateId: templates[data.templateName],
    dynamic_template_data: {
      name: data.name
    }
  };

  switch (data.templateName) {
    case 'welcome':
      msg = {
        ...msg,
        dynamic_template_data: {
          ...msg.dynamic_template_data,
          email: data.to,
          password: data.password,
        }
      };
      break;

    case 'password_reset':
      msg = {
        ...msg,
        dynamic_template_data: {
          ...msg.dynamic_template_data,
          reset_password_url: data.reset_password_url,
        }
      };
      break;

    default:
      throw new Error('Template inválido!');
  }

  (async () => {
    try {
      await sgMail.send(msg);
      res.json({ success: true, message: `Email sent to: ${data.to}` });
    } catch (err) {
      console.error(err.toString());
    }
  })();
}