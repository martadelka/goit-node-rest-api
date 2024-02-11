import dotenv from "dotenv";
dotenv.config();
import sendgrid from "@sendgrid/mail";

const { SENDGRID_API_KEY, SENDER_EMAIL } = process.env;

sendgrid.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: `${SENDER_EMAIL}` };
  await sendgrid.send(email);
  return true;
};

export default sendEmail;