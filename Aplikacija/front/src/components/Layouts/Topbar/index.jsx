import styled, { useTheme } from 'styled-components';
import UserPlaceholder from 'assets/topBar/UserPlaceholder';
import DownChevron from 'assets/DownChevron';
import { useEffect, useRef, useState } from 'react';
import LogOutIcon from 'assets/topBar/LogOutIcon';
import { useLocation, useNavigate } from 'react-router-dom';
import routes, { findRoute } from 'Routes';
import useOnClickOutside from 'utils/hooks/useOnClickOutside';
import CustomButton from 'components/Common/CustomButton';
import { useAuthStore } from 'store/AuthStore';
import { postLogoutApi } from 'api/calls';
import { breakpoints } from 'style/breakpoints';
import pxToRem from 'utils/helpers/pxToRem';

const Topbar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const theme = useTheme();

  const navigate = useNavigate();

  const resetAuthStore = useAuthStore((state) => state.reset);

  const [isShowDropDown, setIsShowDropdown] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(null);

  const dropDownRef = useRef();
  const toggleSelectionRef = useRef();

  const toggleDropDown = () => {
    setIsShowDropdown(!isShowDropDown);
  };

  const onLogout = async () => {
    try {
      await postLogoutApi();
      resetAuthStore();
      navigate(routes.logIn.path);
    } catch (err) {
      console.log(err);
    }
  };

  useOnClickOutside(
    dropDownRef,
    () => {
      setIsShowDropdown(false);
    },
    [toggleSelectionRef]
  );

  useEffect(() => {
    const route = findRoute(pathname);
    if (route) {
      setCurrentRoute(route);
    }
  }, [pathname]);

  return (
    <Wrapper>
      <PageInfo>
        {currentRoute?.icon({ fill: theme.colors.topBar.icons })}
        {currentRoute?.name}
      </PageInfo>

      <UserInfo>
        <ToggleSection
          ref={toggleSelectionRef}
          onClick={() => {
            toggleDropDown();
          }}
        >
          <UserPicture>
            <UserPlaceholder
              width={'100%'}
              height={'100%'}
              fill={theme.colors.topBar.icons}
            />
          </UserPicture>
          <DownChevron
            width={pxToRem(14)}
            height={pxToRem(12)}
            className="selectable"
            fill={theme.colors.topBar.icons}
          />
        </ToggleSection>

        {isShowDropDown && (
          <DropDown ref={dropDownRef}>
            <DropDownItem>
              <LogOutIcon />
              <CustomButton
                onClick={() => onLogout()}
                backgroundColor="transparent"
              >
                Log Out
              </CustomButton>
            </DropDownItem>
          </DropDown>
        )}
      </UserInfo>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: auto;
  display: flex;
  width: 100%;
  margin-right: 24px;
  justify-content: space-between;
  align-items: center;
`;

const PageInfo = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding-left: 5px;

  svg {
    margin-top: -2px;
  }
`;

const UserInfo = styled.div`
  position: relative;
  cursor: pointer;
`;

const ToggleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const UserPicture = styled.div`
  width: ${pxToRem(36)};
  height: ${pxToRem(36)};
  border-radius: 50%;
  overflow: hidden;
`;

const DropDown = styled.div`
  background: ${(props) => props.theme.colors.topBar.dropDown.background};
  box-shadow: ${(props) =>
    `0px 1px 12px ${props.theme.colors.topBar.boxShadow}`};

  border-radius: 12px;
  width: ${pxToRem(300)};
  height: ${pxToRem(270)};
  position: absolute;
  top: 200%;
  width: min(306px, 59vw);
  right: 0px;
  padding: 18px;
  user-select: none;
  z-index: 5;
`;

const DropDownItem = styled.div`
  height: 42px;
  display: flex;
  align-items: center;
  gap: 28px;
  cursor: pointer;
  padding-left: 12px;

  @media ${breakpoints.sm} {
    background: ${(props) => props.theme.colors.topBar.dropDown.item};
  }

  :hover {
    background: ${(props) => props.theme.colors.topBar.dropDown.item};
    border-radius: 6px;
  }
`;

export default Topbar;
