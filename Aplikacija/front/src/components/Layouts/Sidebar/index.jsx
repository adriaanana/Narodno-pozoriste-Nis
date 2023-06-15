import MainMenu from 'components/MainMenu';
import styled from 'styled-components';
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import LogoLg from 'assets/svg/LogoLg.svg';

const Sidebar = () => {
  return (
    <Wrapper>
      <SidebarMenu
        className={'sidebar-menu'}
        expand="lg"
      >
        <SidebarMenu.Collapse>
          <SidebarMenu.Header>
            <LogoPlace>
              <img src={LogoLg} />
            </LogoPlace>
          </SidebarMenu.Header>
          <MainMenu />
        </SidebarMenu.Collapse>
      </SidebarMenu>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 22px;

  .sidebar-menu {
    width: 100%;
    padding-left: 10%;
    padding-right: 10%;
  }
`;

const LogoPlace = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 62px;

  img {
    width: 100%;
    height: 100%;
    max-width: 140px;
  }
`;

export default Sidebar;
