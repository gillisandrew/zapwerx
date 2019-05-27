import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import Contact from "../components/Contact";

function toKebabCase(input) {
  return input.toLowerCase().replace(/([^a-z]+)/g, '-')
}

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

const Section = ({heading, content, style}) => {
  return (
    <section id={toKebabCase(heading)} className={``}>
      <div class="image"></div>
      <div className={'content'}>
        <h2>{heading}</h2>
        <p>{content}</p>
      </div>
    </section>
  )
}
export const IndexPageTemplate = ({
  heading,
  subheading,
  address,
  sections
}) => (
  <div id="wrapper">
    <Intro heading={heading} subheading={subheading}/>
    <div className="wrapper style2 spotlights">
      {sections.map((section) => <Section {...section} />)}
    </div>
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
      <Sidebar tabs={[
        { content: 'Welcome', href: '#intro' },
        ...frontmatter.sections.map(section => ({ content: section.heading, href: `#${toKebabCase(section.heading)}`})),
        { content: 'Get in touch', href: '#contact' },
        ]}/>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        address={frontmatter.address}
        sections={frontmatter.sections}
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
        sections {
          content
          heading
        }
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
