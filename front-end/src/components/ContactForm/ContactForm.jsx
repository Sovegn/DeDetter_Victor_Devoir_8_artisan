import React, { useState } from 'react';
import { contactService } from '../../services/api';
import './ContactForm.css';

const ContactForm = ({ artisan }) => {
  const [formData, setFormData] = useState({
    nom_expediteur: '',
    email_expediteur: '',
    objet: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Effacer l'erreur pour ce champ
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nom_expediteur.trim()) {
      newErrors.nom_expediteur = 'Le nom est requis';
    }
    
    if (!formData.email_expediteur.trim()) {
      newErrors.email_expediteur = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email_expediteur)) {
      newErrors.email_expediteur = 'Format d\'email invalide';
    }
    
    if (!formData.objet.trim()) {
      newErrors.objet = 'L\'objet est requis';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrors({});

    try {
      await contactService.sendContact({
        artisan_id: artisan.id,
        ...formData
      });
      
      setSubmitStatus('success');
      setFormData({
        nom_expediteur: '',
        email_expediteur: '',
        objet: '',
        message: ''
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Contactez {artisan.nom}</h2>
      <p>Une réponse vous sera apportée sous 48h.</p>
      
      {submitStatus === 'success' && (
        <div className="alert alert-success" role="alert">
          <h3>Message envoyé avec succès !</h3>
          <p>Votre demande a été transmise à l'artisan. Une réponse vous sera apportée sous 48h.</p>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="alert alert-error" role="alert">
          <h3>Erreur lors de l'envoi</h3>
          <p>Une erreur est survenue. Veuillez réessayer plus tard.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form" noValidate>
        <div className="form-group">
          <label htmlFor="nom_expediteur" className="form-label">
            Nom <span className="required">*</span>
          </label>
          <input
            type="text"
            id="nom_expediteur"
            name="nom_expediteur"
            className={`form-control-custom ${errors.nom_expediteur ? 'is-invalid' : ''}`}
            value={formData.nom_expediteur}
            onChange={handleInputChange}
            aria-describedby={errors.nom_expediteur ? 'nom-error' : undefined}
            aria-required="true"
          />
          {errors.nom_expediteur && (
            <div id="nom-error" className="form-error" role="alert">
              {errors.nom_expediteur}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email_expediteur" className="form-label">
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email_expediteur"
            name="email_expediteur"
            className={`form-control-custom ${errors.email_expediteur ? 'is-invalid' : ''}`}
            value={formData.email_expediteur}
            onChange={handleInputChange}
            aria-describedby={errors.email_expediteur ? 'email-error' : undefined}
            aria-required="true"
          />
          {errors.email_expediteur && (
            <div id="email-error" className="form-error" role="alert">
              {errors.email_expediteur}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="objet" className="form-label">
            Objet <span className="required">*</span>
          </label>
          <input
            type="text"
            id="objet"
            name="objet"
            className={`form-control-custom ${errors.objet ? 'is-invalid' : ''}`}
            value={formData.objet}
            onChange={handleInputChange}
            aria-describedby={errors.objet ? 'objet-error' : undefined}
            aria-required="true"
          />
          {errors.objet && (
            <div id="objet-error" className="form-error" role="alert">
              {errors.objet}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Message <span className="required">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows="6"
            className={`form-control-custom ${errors.message ? 'is-invalid' : ''}`}
            value={formData.message}
            onChange={handleInputChange}
            aria-describedby={errors.message ? 'message-error' : undefined}
            aria-required="true"
          />
          {errors.message && (
            <div id="message-error" className="form-error" role="alert">
              {errors.message}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="btn-primary-custom submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;