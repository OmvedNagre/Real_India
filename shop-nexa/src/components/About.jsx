import React from 'react'
import styled from 'styled-components';
import Footer from './Footer'
import Navbar from './short-components/Navbar'

const AboutContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem;
  color: #333;
`;

const Section = styled.section`
  margin-bottom: 2rem;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: #222;
  }

  p {
    font-size: 1.1rem;
    color: #555;
  }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.main`
  flex: 1;
`;

function About() {
  return (
    <PageWrapper>
      <Navbar />
      <ContentWrapper>
        <AboutContainer>
          <Section>
            <h2>Who We Are</h2>
            <p>We are a dedicated team passionate about delivering quality and innovation in everything we do.</p>
          </Section>
          <Section>
            <h2>Our Story</h2>
            <p>Founded with a vision to revolutionize the shopping experience, ShopNexa has grown from a small idea to a thriving platform.</p>
          </Section>
          <Section>
            <h2>Our Mission</h2>
            <p>To empower customers by providing seamless, personalized, and reliable shopping solutions.</p>
          </Section>
        </AboutContainer>
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
}

export default About