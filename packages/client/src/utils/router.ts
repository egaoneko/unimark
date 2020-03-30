import {
  navigate,
} from 'gatsby';

export const main: () => void = () => {
  navigate('/');
};

export const signIn: () => void = () => {
  navigate('/sign-in');
};