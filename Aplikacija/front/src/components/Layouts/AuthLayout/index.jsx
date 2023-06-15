import styled from 'styled-components';

const AuthLayout = ({ children }) => {
  return (
    <Wrapper>
      Auth Layout
      <br />
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* width: 100%; */
  /* min-height: 100vh; */
  /* display: flex; */
`;

export default AuthLayout;
