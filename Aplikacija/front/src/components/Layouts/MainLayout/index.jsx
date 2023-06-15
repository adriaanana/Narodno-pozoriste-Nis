import Topbar from 'components/Topbar';
import styled from 'styled-components';
import pxToRem from 'utils/helpers/pxToRem';

export const MainLayout = ({ children }) => {
  return (
    <Wrapper>
      <Layout>
        <Side className="filter">{/* <Sidebar /> */}</Side>
        <Main>
          <Top>
            <Topbar />
          </Top>
          <TopHr />
          <Content>{children}</Content>
          <Footer>
            <div>
              <div className="info d-flex justify-content-evenly mt-5 p-3">
                <div>Centrаla +381 (0)18 527 371 </div>
                <div> Uprava +381 (0)18 245 441</div>
                <div> Blagajna +381 (0)18 245 472 </div>
                <div> Marketing +381 (0)18 245 478</div>
              </div>
            </div>
            <hr />
            <div className="text-center text-muted pb-2">
              © Narodno pozorište u Nišu Sinđelićev trg bb, 18000 Niš, Srbija.
              <br />
              Developed by: Adriana & Milan
            </div>
          </Footer>
        </Main>
      </Layout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
`;

const Layout = styled.div``;

const Side = styled.div``;

const Main = styled.div``;

const Top = styled.div``;

const TopHr = styled.div``;

const Content = styled.div`
  min-height: 67vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 25px;
`;

const Footer = styled.div`
  min-height: 20vh;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  border-top: 1px solid gray;

  font-size: ${pxToRem(14)};
  padding-bottom: 20px;

  hr {
    width: 95%;
    margin: auto;
  }

  .info {
    * {
      :hover {
        text-decoration: underline;
        opacity: 0.7;
      }
    }
  }
`;
