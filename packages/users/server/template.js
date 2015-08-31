'use strict';

module.exports = {
  /*forgot_password_email: function(user, req, token, mailOptions) {
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
  }*/
  forgot_password_email: function(user,mailOptions) {
      mailOptions.html = [
        'Hi,<br><br>We have received a request to reset the password for your account.<br><a href = "http://localhost:3000/#!/reset/'+user.email+'">Reset Password</a><br><br>Simplified Communications..!!<br>Team Omail'
      ].join('\n\n');
      mailOptions.subject = 'Omail Password Reset Request';
      return mailOptions;
  },

  signup_email: function(user,mailOptions) {
      mailOptions.html = [
        'Hi ' + user.firstname + ',<br><br>Thank you for signing up for a Omail Trial Account. You are just one step away from using your account.<br><a href = "http://localhost:3000/activate/'+user.activationtoken+'">Activate Account</a><br><br>Simplified Communications..!!<br>Team Omail'
      ].join('\n\n');
      mailOptions.subject = 'Omail Activation Mail';
      return mailOptions;
  }
};

