import styled from 'styled-components';
import CoverImage from 'assets/Cover.jpg';
import pxToRem from 'utils/helpers/pxToRem';

const Home = () => {
  return (
    <Wrapper>
      <Cover src={CoverImage} />
      <Text>Narodno pozorište u Nišu </Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;
const Cover = styled.img`
  width: 100%;
  height: 100%;
  max-height: 67vh;
`;

const Text = styled.div`
  position: absolute;
  top: 80%;
  left: 0%;
  background-color: #3737374f;
  height: 100px;
  width: 100%;
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${pxToRem(30)};
  font-weight: 700;
`;

export default Home;
