const brevo = require('@getbrevo/brevo');

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, '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');

let sendSmtpEmail = new brevo.SendSmtpEmail();

sendSmtpEmail.subject = "My {{params.subject}}";
sendSmtpEmail.htmlContent = "<html><body><h1>{{params.parameter}}</h1></body></html>";
sendSmtpEmail.sender = { name: "kumaran", email: "kumarans2k16@gmail.com" };
sendSmtpEmail.to = [{ email: "kumaranselvaraj08@gmail.com", name: "kumaran" }];
sendSmtpEmail.replyTo = { email: "example@brevo.com", name: "sample-name" };
sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
sendSmtpEmail.params = {
  parameter: "This email is a confirmation message for resetting the password",
  subject: "Reset password validation"
};

module.exports.forgotPassword = async (req, res) => {
  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('API called successfully. Returned data:', data);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};
