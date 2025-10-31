const nodemailer = require('nodemailer');
const ENV = require('../config');


const createTransport = () => {
  if (!ENV.EMAIL_HOST || !ENV.EMAIL_USER || !ENV.EMAIL_PASS) {
    console.warn(' Configuration email incomplète. Les emails ne seront pas envoyés.');
    return null;
  }

  return nodemailer.createTransport({
    host: ENV.EMAIL_HOST,
    port: ENV.EMAIL_PORT,
    secure: false,
    auth: {
      user: ENV.EMAIL_USER,
      pass: ENV.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};


const transport = createTransport();
if (transport) {
  transport.verify((error, success) => {
    if (error) {
      console.log(' Erreur configuration email:', error.message);
    } else {
      console.log(' Serveur email prêt');
    }
  });
}


const sendContactEmail = async (artisan, contactData) => {
  const transporter = createTransport();
  if (!transporter) {
    throw new Error('Configuration email manquante');
  }

  const mailOptions = {
    from: ENV.EMAIL_FROM || ENV.EMAIL_USER,
    to: artisan.email,
    subject: `Nouvelle demande de contact - ${contactData.objet}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <header style="background-color: #2c5f8c; color: white; padding: 20px; text-align: center;">
          <h1>Trouve ton artisan</h1>
          <p>Région Auvergne-Rhône-Alpes</p>
        </header>
        
        <main style="padding: 20px;">
          <h2>Nouvelle demande de contact</h2>
          <p>Bonjour <strong>${artisan.nom}</strong>,</p>
          <p>Vous avez reçu une nouvelle demande de contact via la plateforme Trouve ton artisan :</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Nom :</strong> ${contactData.nom_expediteur}</p>
            <p><strong>Email :</strong> ${contactData.email_expediteur}</p>
            <p><strong>Objet :</strong> ${contactData.objet}</p>
            <p><strong>Message :</strong></p>
            <p style="background-color: white; padding: 10px; border-radius: 3px;">${contactData.message}</p>
          </div>
          
          <p>Vous pouvez répondre directement à cette personne en utilisant l'adresse email : <strong>${contactData.email_expediteur}</strong></p>
          
          <div style="background-color: #e8f4fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Rappel :</strong> Nous vous recommandons de répondre sous 48h pour maintenir une excellente qualité de service.</p>
          </div>
        </main>
        
        <footer style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px;">
          <p>Région Auvergne-Rhône-Alpes</p>
          <p>101 cours Charlemagne, CS 20033, 69269 LYON CEDEX 02</p>
          <p>+33 (0)4 26 73 40 00</p>
        </footer>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(' Email envoyé à l\'artisan:', info.messageId);
    
    
    if (ENV.EMAIL_HOST === 'smtp.ethereal.email') {
      console.log(' Prévisualisation Ethereal:', nodemailer.getTestMessageUrl(info));
    }
    
    return info;
  } catch (error) {
    console.error(' Erreur envoi email artisan:', error);
    throw error;
  }
};


const sendConfirmationEmail = async (contactData) => {
  const transporter = createTransport();
  if (!transporter) {
    throw new Error('Configuration email manquante');
  }

  const mailOptions = {
    from: ENV.EMAIL_FROM || ENV.EMAIL_USER,
    to: contactData.email_expediteur,
    subject: 'Confirmation de votre demande - Trouve ton artisan',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <header style="background-color: #2c5f8c; color: white; padding: 20px; text-align: center;">
          <h1>Trouve ton artisan</h1>
          <p>Région Auvergne-Rhône-Alpes</p>
        </header>
        
        <main style="padding: 20px;">
          <h2>Confirmation de votre demande</h2>
          <p>Bonjour <strong>${contactData.nom_expediteur}</strong>,</p>
          <p>Nous avons bien reçu votre demande de contact concernant : <strong>${contactData.objet}</strong></p>
          
          <div style="background-color: #e8f4fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong> Votre message a été transmis à l'artisan</strong></p>
            <p>L'artisan vous répondra directement par email sous 48h.</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Récapitulatif de votre demande :</strong></p>
            <p><strong>Objet :</strong> ${contactData.objet}</p>
            <p><strong>Message :</strong></p>
            <p style="background-color: white; padding: 10px; border-radius: 3px;">${contactData.message}</p>
          </div>
          
          <p>Merci d'avoir utilisé notre plateforme pour trouver votre artisan.</p>
        </main>
        
        <footer style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px;">
          <p>Région Auvergne-Rhône-Alpes</p>
          <p>101 cours Charlemagne, CS 20033, 69269 LYON CEDEX 02</p>
          <p>+33 (0)4 26 73 40 00</p>
        </footer>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(' Email de confirmation envoyé:', info.messageId);
    
    
    if (ENV.EMAIL_HOST === 'smtp.ethereal.email') {
      console.log(' Prévisualisation Ethereal:', nodemailer.getTestMessageUrl(info));
    }
    
    return info;
  } catch (error) {
    console.error(' Erreur envoi email confirmation:', error);
    throw error;
  }
};

module.exports = {
  sendContactEmail,
  sendConfirmationEmail
};