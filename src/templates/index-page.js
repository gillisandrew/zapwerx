import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import Contact from "../components/Contact";

const Intro = ({heading, subheading}) => {
  if(heading && subheading) {
    return (
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
    )
  }else {
    return null
  }
}

export const IndexPageTemplate = ({
  heading,
  subheading,
  address
}) => (
  <div id="wrapper">
    <Intro heading={heading} subheading={subheading}/>
    <Contact address={address}/>
  </div>
);

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
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
        address={frontmatter.address}
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
        address {
          line1
          line2
          city
          postalCode
        }
      }
    }
  }
`;
