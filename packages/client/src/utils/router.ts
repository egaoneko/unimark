import {
  navigate,
} from 'gatsby';

export const redirect: (to: string) => void = (to: string) => {
  navigate(to);
};

export const main: () => void = () => {
  navigate('/');
};

export const signIn: () => void = () => {
  navigate('/sign-in');
};
