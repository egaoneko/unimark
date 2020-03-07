import React, { useState } from 'react';
import {
  Alert,
  Col,
  Row,
} from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import {
  graphql,
  useStaticQuery
} from 'gatsby';
import Loadable from 'react-loadable';
import MDSpinner from 'react-md-spinner';
import FullLayoutTemplate from '../layout/FullLayoutTemplate';
import CenterTemplate from '../layout/CenterTemplate';
import { StyledFirebaseAuth } from 'react-firebaseui';
import firebase from '../../../externals/firebase';
import Logo from '../../molecules/layout/Logo';
import { main } from '../../../utils/router';

const Particles = Loadable({
  loader: () => import('react-particles-js'),
  loading: () => <></>,
});

const Container = styled(Row)`
  width: 435px;
  padding: 20px;
  background-color: rgba(0,0,0,.2);
  border: 1px solid rgba(0,0,0,.1);
  box-shadow: 0 0 10px rgba(0,0,0,.1);
`;

const LogoContainer = styled(Col)`
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AuthContainer = styled(Col)`
  position: relative;
`;

const Auth: React.FC<{
  uiConfig: firebaseui.auth.Config,
  loading: boolean,
  error: string | null,
  onClose: () => vioid
}> = ({ uiConfig, loading, error, onClose }) => {
  if (error) {
    return (
      <Alert
        message="Login Error"
        description={error}
        type="error"
        closable
        showIcon
        onClose={onClose}
      />
    );
  }

  return (
    <>
      <SpinnerContainer
        style={{
          display: loading ? 'block' : 'none'
        }}
      >
        <Spinner
          size={70}
          borderSize={10}
          color1="#4285F4"
          color2="#DB4437"
          color3="#F4B400"
          color4="#0F9D58"
        />
      </SpinnerContainer>
      <FirebaseAuthContainer>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}/>
      </FirebaseAuthContainer>
    </>
  );
};

const FirebaseAuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
`;

const SpinnerContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 10px;
  text-align: center;
`;

const Spinner = styled(MDSpinner)`
  margin: 30px;
`;


const CopyrightContainer = styled(Col)`
  text-align: center;
`;

const Copyright = styled.span`
  color: #fff;
  font-size: 10px;
  font-weight: bold;
`;

const Background = styled(Particles)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const GlobalStyles = createGlobalStyle`
  body {
    background: rgba(35, 39, 65, 1);
    background: linear-gradient(
      to bottom,
      rgba(35, 39, 65, 1) 0%,
      rgb(48,52,78) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#6638f0', endColorstr='#32469b', GradientType=0 );
  }
`;


interface PropsType {
  uiConfig: firebaseui.auth.Config;
}

const SignInTemplate: React.FC<PropsType> = ({ uiConfig }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { site } = useStaticQuery(
    graphql`
        query {
            site {
                siteMetadata {
                    copyright
                }
            }
        }
    `,
  );
  const orgSignInFailure = uiConfig.callbacks?.signInFailure;
  const orgUiShown = uiConfig.callbacks?.uiShown;
  uiConfig = {
    ...uiConfig,
    callbacks: {
      ...uiConfig.callbacks,
      signInFailure: async error => {
        setLoading(false);
        setError(error.message);
        return orgSignInFailure && await orgSignInFailure(error);
      },
      uiShown: () => {
        setLoading(false);
        orgUiShown && orgUiShown();
      }
    }
  };

  const onClose = () => {
    setError(null);
  };

  return (
    <FullLayoutTemplate style={{
      backgroundColor: 'transparent',
    }}>
      <GlobalStyles/>
      <Background
        params={{
          particles: {
            number: {
              value: 160,
              density: {
                enable: false
              }
            },
            size: {
              value: 3,
              random: true,
              anim: {
                speed: 4,
                size_min: 0.3
              }
            },
            line_linked: {
              enable: false
            },
            move: {
              random: true,
              speed: 1,
              direction: 'top',
              out_mode: 'out'
            }
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: 'bubble'
              },
              onclick: {
                enable: true,
                mode: 'repulse'
              }
            },
            modes: {
              bubble: {
                distance: 250,
                duration: 2,
                size: 0,
                opacity: 0
              },
              repulse: {
                distance: 400,
                duration: 4
              }
            }
          }
        }}/>
      <CenterTemplate>
        <Container className='animated fadeInDown'>
          <LogoContainer span={24}>
            <LogoWrapper>
              <Logo
                size={76}
                onClick={main}
              />
            </LogoWrapper>
          </LogoContainer>
          <AuthContainer span={24}>
            <Auth
              uiConfig={uiConfig}
              loading={loading}
              error={error}
              onClose={onClose}/>
          </AuthContainer>
          <CopyrightContainer span={24}>
            <CopyrightContainer>
              <Copyright>
                {site.siteMetadata.copyright}
              </Copyright>
            </CopyrightContainer>
          </CopyrightContainer>
        </Container>
      </CenterTemplate>
    </FullLayoutTemplate>
  );
};

export default SignInTemplate;