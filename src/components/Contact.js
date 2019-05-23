import React from "react";
import { navigate } from "gatsby-link";
import PropTypes from "prop-types";

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const Contact = ({address}) => {
    return (
      <section id="contact" className="wrapper style1 fade-up">
        <div className="inner">
          <h2>Get in touch</h2>
          <p>
            Phasellus convallis elit id ullamcorper pulvinar. Duis aliquam
            turpis mauris, eu ultricies erat malesuada quis. Aliquam dapibus,
            lacus eget hendrerit bibendum, urna est aliquam sem, sit amet
            imperdiet est velit quis lorem.
          </p>
          <div className="split style1">
            <section>
              <ContactForm/>
            </section>
            <section>
              <ul className="contact">
                <li>
                  <ContactPoint title="Address">
                    <Address {...address} />
                  </ContactPoint>
                </li>
                <li>
                  <ContactPoint title="Email">
                    <a href="#">user@untitled.tld</a>
                  </ContactPoint>
                </li>
                <li>
                  <ContactPoint title="Phone">
                    <span>(000) 000-0000</span>
                  </ContactPoint>
                </li>
                <li>
                  <ContactPoint title="Social">
                    <ul className="icons">
                      <li>
                        <a href="#" className="fa-twitter">
                          <span className="label">Twitter</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="fa-facebook">
                          <span className="label">Facebook</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="fa-github">
                          <span className="label">GitHub</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="fa-instagram">
                          <span className="label">Instagram</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="fa-linkedin">
                          <span className="label">LinkedIn</span>
                        </a>
                      </li>
                    </ul>
                  </ContactPoint>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </section>
    );
  }
const ContactPoint = ({ title, children }) => (
  <>
    <h3>{title}</h3>
    {children}
  </>
);
const Address = ({ line1, line2, city, postalCode, country, as = <li /> }) => (
  <>
    <span>
      {line1}
      <br />
      {line2}
      <br />
      {city} {postalCode}
      <br />
      {country}
    </span>
  </>
);

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValidated: false };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error));
  };
  render() {
    return (
      <form
        name="contact"
        method="post"
        action="/contact/thanks/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={this.handleSubmit}
      >
        <input type="hidden" name="form-name" value="contact" />
        <div hidden>
          <label>
            Don’t fill this out:{" "}
            <input name="bot-field" onChange={this.handleChange} />
          </label>
        </div>
        <div className="fields">
          <div className="field half">
            <label htmlFor={"name"}>Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={this.handleChange}
            />
          </div>
          <div className="field half">
            <label htmlFor={"email"}>Email</label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor={"message"}>Message</label>
            <textarea
              rows="5"
              className="textarea"
              name={"message"}
              onChange={this.handleChange}
              id={"message"}
              required={true}
            />
          </div>
        </div>
        <ul className="actions">
          <li>
            <button className="button submit" type={"submit"}>
              Send Message
            </button>
          </li>
        </ul>
      </form>
    );
  }
}

ContactPoint.propTypes = {
  title: PropTypes.string
};

Address.propTypes = {
  line1: PropTypes.string,
  line2: PropTypes.string,
  city: PropTypes.string,
  postalCode: PropTypes.string,
  country: PropTypes.string
};

Contact.propTypes = {
  address: PropTypes.shape(Address.propTypes)
};

export default Contact