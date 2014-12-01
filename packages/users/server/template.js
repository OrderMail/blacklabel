'use strict';

module.exports = {
  forgot_password_email: function(user, req, token, mailOptions) {
    mailOptions.html = [
      'Hi ' + user.name + ',',
      'We have received a request to reset the password for your account.',
      'If you made this request, please click on the link below or paste this into your browser to complete the process:',
      'http://' + req.headers.host + '/#!/reset/' + token,
      'This link will work for 1 hour or until your password is reset.',
      'If you did not ask to change your password, please ignore this email and your account will remain unchanged.'
    ].join('\n\n');
    mailOptions.subject = 'Resetting the password';
    return mailOptions;
  },


  user_registration_email: function(user, req, mailOptions) {
    console.log('************user_registration_email template******');
    mailOptions.html = [
      'Hi,',
      'We have received a user registration request to approve/reject of ' + user.name +'.',
      'User has following details:',
      'Name: '+user.name,
      'Age: '+user.age,
      'Email address: '+user.email,
      'Company: '+user.Company,
    ].join('\n\n');
    mailOptions.subject = 'User Registration';
    return mailOptions;
  }
};
