import nodemailer from "nodemailer";

export const emailAdapter = {
  async sendEmail(email: string, subject: string, message: string) {
    let transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'backlesson05@gmail.com',
        pass: 'wbiuabbwypkxeoko',
      },
    });

    let info = await transport.sendMail({
      from: '"Akzhan" <backlesson05@gmail.com>', // sender address
      to: email,
      subject: subject,
      html: message,
    });

    return info;

  }
}