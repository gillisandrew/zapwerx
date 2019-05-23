import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import pic1 from "../images/pic01.jpg";
import Contact from "../components/Contact";

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro
}) => (
  <div id="wrapper">
    <section id="intro" className="wrapper style1 fullscreen fade-up">
      <div className="inner">
        <h1>{heading}</h1>
        <p>{subheading}</p>
        <ul className="actions">
          <li>
            <a href="#one" className="button">
              Learn more
            </a>
          </li>
        </ul>
      </div>
    </section>
    <section id="one" className="wrapper style1 spotlights">
      <section>
        <a href="/#" className="image" alt="image">
          <img src={pic1} alt="" data-position="center center" />
        </a>
        <div className="content">
          <div className="inner">
            <h2>{mainpitch.title}</h2>
            <p>{mainpitch.description}</p>
            <ul className="actions">
              <li>
                <Link className="button" to="/about">
                  Learn more
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </section>
    <Contact />
  </div>
);

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array
  })
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <Sidebar />
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`;
