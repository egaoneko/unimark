import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import {
  graphql,
  useStaticQuery
} from 'gatsby';

const Wrapper = styled.div`
  display: inline-block;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Span = styled.span`
  font-family: sans-serif;
  font-weight: bold;
  background: linear-gradient(to left, #8be9fd, #50fa7b, #ffb86c, #ff79c6, #bd93f9, #ff5555, #f1fa8c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: rainbow_animation 6s ease-in-out infinite;
  background-size: 400% 100%;
  
  @keyframes rainbow_animation {
    0%,100% {
        background-position: 0 0;
    }

    50% {
        background-position: 100% 0;
    }
  }
`;

interface PropsType {
  size: number;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void;
}

const Logo: React.FC<PropsType> = props => {
  const { size, style, onClick }: PropsType = props;
  const { site } = useStaticQuery(graphql`
      query {
          site {
              siteMetadata {
                  title
              }
          }
      }
  `);

  return (
    <Wrapper
      role="button"
      tabIndex={0}
      style={{
        cursor: `${onClick ? 'pointer' : 'auto'}`,
        ...style
      }}
      onClick={onClick}>
      <Container>
        <Span style={{
          fontSize: size,
        }}>
          {site.siteMetadata.title}
        </Span>
      </Container>
    </Wrapper>
  );
};

export default Logo;
