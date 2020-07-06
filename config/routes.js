
import EmailController from '../src/controllers/EmailController';

export default (app) => {

  app.post(`/api/send-email`, EmailController.sendMail);

}