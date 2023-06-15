import buttonTypes from 'utils/constants/buttonTypes';

const { default: styled } = require('styled-components');

const CustomButton = ({ children, type, className, onClick }) => {
  <Wrapper
    onClick={onClick}
    className={`
        ${type}
        ${className}
      `}
  >
    {children}
  </Wrapper>;
};

const Wrapper = styled.button`
  // Button types:
  // Standard type
  &.${buttonTypes.standard} {
    box-shadow: 0px 1px 6px rgba(14, 18, 62, 0.15);

    color: ${(props) => props.theme.colors.buttons.standard.color};
    background-color: ${(props) =>
      props.theme.colors.buttons.standard.background};
  }

  // Outline standard type
  &.${buttonTypes.outlineStandard} {
    box-shadow: 0px 1px 6px rgba(14, 18, 62, 0.15);

    color: ${(props) => props.theme.colors.buttons.standard.color};
    background-color: ${(props) =>
      props.theme.colors.buttons.standard.background};
    border: 1px solid;
    border-color: ${(props) =>
      props.theme.colors.buttons.outlineStandard.borderColor};
  }

  // Primary type
  &.${buttonTypes.primary} {
    box-shadow: 0px 1px 6px rgba(14, 18, 62, 0.15);

    background-color: ${(props) =>
      props.theme.colors.buttons.primary.background};
    color: ${(props) => props.theme.colors.buttons.primary.color};
  }

  // Secondary type
  &.${buttonTypes.secondary} {
    background-color: ${(props) =>
      props.theme.colors.buttons.secondary.background};
    color: ${(props) => props.theme.colors.buttons.secondary.color};

    border: none;
    outline: none;
    box-shadow: none;
  }

  // Outline Secondary type
  &.${buttonTypes.outlineSecondary} {
    color: ${(props) => props.theme.colors.buttons.outlineSecondary.color};
    box-shadow: none;
    border: 1px solid;
    border-color: ${(props) =>
      props.theme.colors.buttons.outlineSecondary.borderColor};
    background: ${(props) =>
      props.theme.colors.buttons.outlineSecondary.background};

    :hover {
      background-color: ${(props) =>
        props.theme.colors.buttons.outlineSecondary.hoveredBg};

      opacity: 1;
    }
  }

  // Warning type
  &.${buttonTypes.warning} {
    box-shadow: 0px 1px 6px rgba(14, 18, 62, 0.15);
    background-color: ${(props) =>
      props.theme.colors.buttons.warning.background};
    color: ${(props) => props.theme.colors.buttons.warning.color};
  }
`;

export default CustomButton;
