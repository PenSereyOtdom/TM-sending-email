import nodeMailer from "nodemailer";

class Controller {
    // Sending Email Japan website
    async sendMail(req, res){
        let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EM_USER,
                pass: process.env.EM_PASS
            }
        });
        let mailOptions = {
            from: process.env.EM_USER,
            to: 'tamasato@jthink.co.jp',
            subject: req.body.subject,
            text: req.body.message, // plain text body
            html: `<p><b>名前 : </b>${req.body.name}</p>
              <p><b>メールアドレス : </b>${req.body.email}</p>
              <p><b>電話番号 : </b>${req.body.phone_number}</p>
              <p><b>住所 : </b>${req.body.place_address}</p>
              <p><b>件名 : </b>${req.body.subject}</p>
              <p><b>URL を入力 : </b>${req.body.enter_url}</p>
              <p><b>メッセージを入力してください :</b></p>
              <p style="
                  white-space: pre-line;
                  border: 1px solid #eee;
                  border-radius: 10px;
                  padding: 5px;
                  margin-top: -10px;
              ">${req.body.message}</p>`
            // html body
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                let status ={
                    error: true,
                    statusCode: 400,
                    data: error.toString()
                };
                return res.status(status.statusCode).send(status);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            let status = {
                error: false,
                statusCode: 200,
                data: 'Successfully'
            };
            return res.status(status.statusCode).send(status);
        });

    }
}
  
  export default Controller;