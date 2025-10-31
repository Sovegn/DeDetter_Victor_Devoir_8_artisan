const { MessageContact, Artisan, Specialite, Categorie } = require('../models');
const createError = require('../middlewares/error');
const { sendContactEmail, sendConfirmationEmail } = require('../utils/emailService');

// Envoyer un message de contact
exports.sendContact = async (req, res, next) => {
  console.log('Données reçues:', req.body);
  try {
    const { artisan_id, nom_expediteur, email_expediteur, objet, message } = req.body;

    // Vérifier que l'artisan existe
    const artisan = await Artisan.findByPk(artisan_id, {
      include: [{
        model: Specialite,
        as: 'specialite',
        attributes: ['nom'],
        include: [{
          model: Categorie,
          as: 'categorie',
          attributes: ['nom']
        }]
      }]
    });

    if (!artisan) {
      return next(createError(404, "Artisan non trouvé"));
    }

    // Créer le message en base
    const newMessage = await MessageContact.create({
      artisan_id,
      nom_expediteur,
      email_expediteur,
      objet,
      message
    });

    // Préparer les données pour l'email
    const contactData = {
      nom_expediteur,
      email_expediteur,
      objet,
      message
    };

    try {
      // Envoyer l'email à l'artisan
      await sendContactEmail(artisan, contactData);
      
      // Envoyer l'email de confirmation au demandeur
      await sendConfirmationEmail(contactData);
      
      res.status(201).json({
        message: "Votre message a été envoyé avec succès ! L'artisan vous répondra sous 48h.",
        messageId: newMessage.id
      });
    } catch (emailError) {
      // Si l'envoi d'email échoue, on garde le message en base mais on informe l'utilisateur
      console.error('Erreur envoi email:', emailError);
      res.status(201).json({
        message: "Votre message a été enregistré. Nous traiterons votre demande dans les plus brefs délais.",
        messageId: newMessage.id,
        warning: "L'envoi automatique a échoué, mais votre demande sera traitée manuellement."
      });
    }

  } catch (error) {
    next(createError(500, "Erreur lors de l'envoi du message de contact", error.message));
  }
};
