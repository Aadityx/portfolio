import { useState } from 'react';
import { 
  Mail, 
  Copy, 
  Check, 
  ArrowUpRight, 
  Send,
  MessageSquare,
  ArrowUp
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './BrandIcons';
import '../styles/contact.css';

function Contact() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const emailAddress = "aadityasp.26@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    // Open default mail client with prefilled details
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    setFormSubmitted(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="section-wrapper contact-section">
      <div className="container">
        <div className="section-header">
          <div className="section-kicker">06 / GET IN TOUCH</div>
          <h2 className="section-title">Contact Me</h2>
          <div className="section-divider" />
        </div>

        <div className="contact-container-grid">
          {/* Left Column: Direct Contact Hub */}
          <div className="contact-cards-column">
            {/* Email Card */}
            <div className="contact-item-card glass-panel">
              <div className="contact-icon-box">
                <Mail size={22} className="contact-card-icon" />
              </div>
              <div className="contact-details">
                <span className="contact-label">Email</span>
                <a href={`mailto:${emailAddress}`} className="contact-value">
                  {emailAddress}
                </a>
              </div>
              <div className="contact-actions-row">
                <button
                  type="button"
                  className="copy-btn"
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <a
                  href={`mailto:${emailAddress}`}
                  className="contact-external-link"
                  aria-label="Send email"
                >
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </div>

            {/* LinkedIn Card */}
            <div className="contact-item-card glass-panel">
              <div className="contact-icon-box">
                <LinkedinIcon size={22} className="contact-card-icon" />
              </div>
              <div className="contact-details">
                <span className="contact-label">LinkedIn</span>
                <a
                  href="https://linkedin.com/in/aadityx2607"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-value"
                >
                  aadityx2607
                </a>
              </div>
              <a
                href="https://linkedin.com/in/aadityx2607"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-external-link"
                aria-label="Visit LinkedIn profile"
              >
                <ArrowUpRight size={18} />
              </a>
            </div>

            {/* GitHub Card */}
            <div className="contact-item-card glass-panel">
              <div className="contact-icon-box">
                <GithubIcon size={22} className="contact-card-icon" />
              </div>
              <div className="contact-details">
                <span className="contact-label">GitHub</span>
                <a
                  href="https://github.com/Aadityx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-value"
                >
                  github.com/Aadityx
                </a>
              </div>
              <a
                href="https://github.com/Aadityx"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-external-link"
                aria-label="Visit GitHub profile"
              >
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="contact-form-column glass-panel">
            <div className="form-header">
              <div className="form-icon-pill">
                <MessageSquare size={16} />
                <span>Send a Message</span>
              </div>
              <p className="form-desc">
                Have a question, collaboration idea, or opportunity? Drop a message directly.
              </p>
            </div>

            {formSubmitted ? (
              <div className="form-success-box">
                <Check size={28} className="success-icon" />
                <h4 className="success-title">Message Client Opened</h4>
                <p className="success-desc">
                  Your mail client has been opened with your message. Thank you for reaching out!
                </p>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setFormSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="contact-name">Your Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">Your Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    required
                    rows="4"
                    placeholder="Hello Aaditya, I would like to discuss..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-primary form-submit-btn">
                  <span>Send Message</span>
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Closing Footer Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            <span>© {new Date().getFullYear()} Aadityx. All rights reserved.</span>
            <span className="footer-sep">•</span>
            <span>Crafted with Minimal Luxury & 3D Engineering</span>
          </div>

          <button
            type="button"
            className="back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Contact;
