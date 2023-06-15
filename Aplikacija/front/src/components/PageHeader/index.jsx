const { default: styled } = require('styled-components');

const PageHeader = ({ children }) => {
  return (
    <Header>
      {/* <hr /> */}
      <span className="content">{children}</span>
      {/* <hr /> */}
    </Header>
  );
};

const Header = styled.h2`
  padding-top: 120px;
  padding-bottom: 120px;
  color: white;
  text-align: center;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);

  background-position: center;
  background: url('http://www.narodnopozoristenis.rs/wp-content/themes/atec/images/page-header.jpg');
  position: relative;

  &:before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #9587711c;
  }

  .content {
    position: relative;
    z-index: 1;
  }
`;

export default PageHeader;
