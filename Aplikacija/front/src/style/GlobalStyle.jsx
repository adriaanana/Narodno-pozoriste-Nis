import { createGlobalStyle } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { baseFontSize, fontSizes } from './fontSizes';
import pxToRem from 'utils/helpers/pxToRem';

const GlobalStyle = createGlobalStyle`
  :root
  {
    font-size: ${baseFontSize};
  }

  .test
  {
    border: 2px solid red;
    background-color: #ff000831;
  }

  button
  {
    user-select: none;
  }


  // Override for scrollbar
  &::-webkit-scrollbar-track {
  }

  /* Scrollbar */
  &::-webkit-scrollbar {
  }

  /* Track */
  &::-webkit-scrollbar-track {
    
  }

  /* Handle */
  &::-webkit-scrollbar-thumb { 
  }



 

  body
  {
    
    margin: 0px;
    padding: 0px;


    @keyframes page-transition {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    /* transform: translateX(0); */
  }
}
    *
    {
     animation: page-transition 0.3s ease-in-out;

      box-sizing: border-box;
      font-family: ${(props) => props.theme.fonts.fontBody};
    }

    a
    {
      text-decoration: none;
    }
  }

  .auth-page
  {
    height: 100%;
    flex: 1;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;

    form
    { 
      width: 100%;
      max-width: 400px;
      display: flex;
      flex-direction: column;
      gap: 15px;
      padding: 10px;

      input
      {
        height: ${pxToRem(35)};
        border-radius: 8px;
        outline: none;
        border: none;
        padding: 10px;
      }

      .actions
      {
        display: flex;
        justify-content: end;
        margin-top: auto;
      }

      button
      {
        width: 100%;
        height: ${pxToRem(40)};
        border-radius: 8px;
        border: none;
        user-select: none;
       
        color: white;

        &.login
        {
           background-color: #8e7154;
        }

        &.registracija
        {
          background-color:#834f3b;
        }

        :hover
        {
          opacity: 0.8;
        }
      }
    }
    .field
    {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
  }


  // Change opacity on hover
  .selectable {
    :hover
    {
      opacity: 0.7;
    }
  }

 

  // Typography
  .text-xs
  {
    font-size: ${fontSizes.xs}; // About 10px
  }

  .text-sm
  {
    font-size: ${fontSizes.sm}; // About 12px
  }


  .text-md
  {
    font-size: ${fontSizes.md}; // About 14px
  }

  .text-lg
  {
    font-size: ${fontSizes.lg}; // About 18px
  }


`;

export default GlobalStyle;
