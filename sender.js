const sgMail = require("@sendgrid/mail");

module.exports = sendEmail = (data) => {
  sgMail.setApiKey(process.env.SENDGRID_API);

  templates = {
    password_reset_confirm: "4980d32f-8a18-453f-bfab-527d49e81e3a",
    password_reset: "8f919725-bcbf-46f1-aac8-2ac2d37e3400",
    confirm_account: "d-cb3ca7e305be4329b8fff35bb9de3d60",
  };

  const msg = {
    to: data.to,
    from: data.from,
    templateId: templates[data.templateName],
    subject: data.subject,
    dynamic_template_data: {
      name: data.name,
      reset_password_url: data.reset_password_url,
      confirm_account_url: data.confirm_account_url,
    }
  };

  sgMail.send(msg, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log('result', result)
      console.log('Email sent successfully');
    }
  });
}