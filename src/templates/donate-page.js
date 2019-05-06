import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Content, { HTMLContent } from '../components/Content'

import { Paypal } from './../components/paypal/'

//this is the container for CMS data for About.
export const DonatePageTemplate = ({
  title,
  content,
  contentComponent,
  paypalID,
}) => {
  const PageContent = contentComponent || Content

  return (
    <div className="grid-wrapper">
      <div className="col-8">
        <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
          {title}
        </h2>
        <PageContent className="content" content={content} />
      </div>
      <div className="col-4">
        <Paypal paypalID={paypalID} />
      </div>
    </div>
  )
}

DonatePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

// this is the page container for Donate
const DonatePage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout contactEnabled={true}>
      <Helmet title={'Donate : ' + `${data.site.siteMetadata.title}`}>
        <meta
          name="description"
          content={`${data.site.siteMetadata.description}`}
        />
      </Helmet>
      <DonatePageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        paypalID={post.frontmatter.paypalID}
      />
    </Layout>
  )
}

DonatePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default DonatePage

export const donatePageQuery = graphql`
  query DonatePage($id: String!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        paypalID
      }
    }
  }
`
