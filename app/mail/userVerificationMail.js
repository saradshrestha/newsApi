const userVerificationEmail = async (userEmail) => {
    try {
      // Send mail with defined transport object
      await transporter.sendMail({
        from: process.env.MAIL_FROM || "info@testmail.com",
        to: userEmail,
        subject: 'Welcome to Our Application!',
        text: 'Thank you for registering with us. We hope you enjoy using our application!'
      });
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };