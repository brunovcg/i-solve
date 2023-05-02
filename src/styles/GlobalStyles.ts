import { createGlobalStyle } from 'styled-components';
import { configs } from '../configs';

const { maxResolution } = configs.resolutions;

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #2e3879;
    --primary-light-color: #5360a9;
    --primary-dark-color: #2e3879;
    --secondary-color: #ff6b65;
    --valid-color: #179b03;
    --warning-color: #bfb903;
    
    --typeface-dark-color: #111111;
    --typeface-medium-color: #444;
    --typeface-light-color: #888;
    --typeface-disabled-color: #cccccc;
    --typeface-white-color: #fcfcfc;
    --typeface-primary-color: #11A2DD;

    --typeface-sans-serif: Arial, Helvetica, sans-serif;
    --typeface-serif: TImes, serif;

    --placeholder-color: #aaaaaa;


    --container-grey-color: #d6d6d6;
    --container-hover-color: #e0e0e0;
    --container-dark-color: #444444;
    --container-medium-color: #f4f5f7;
    --container-regular-color: #f9f9f9;
    --container-light-color: #fcfcfc;
    --container-white-color: #ffffff;

    --container-light-opacity: rgb(0,0,0, 0.8); 
    --container-im-gradient-color: linear-gradient(90deg, 
      rgba(46,56,121,1) 0%, 
      rgba(64,72,145,1) 23%, 
      rgba(80,80,150,1) 50%, 
      rgba(98,102,150,1) 100%);
    
    --border-color: #dddddd;
    --border-disabled-color: #e8e8e8;
    --border-hover-color:  #888888;
    --border-focus-color: #11A2DD;
    --border-dark-color: #2d2d2d;
    --button-icon-default-color: #000000;
    --button-icon-hover-color: #e8e8e8;
    --button-border-radius: 10px;

    --error-color: #E12F26;
    --disabled-color: #cccccc;
    --disabled-primary-color: #65caf2;

    --table-header-color: #d1d1d1;
    --table-even-color: #ffffff;
    --table-odd-color: #ededed ;
    --table-hover-color:  #fcfcfc;
    --table-hover-background-color: #11A2DD;
    --table-sticky-border-color: #dddddd;
   
    --gradient-label-input:  linear-gradient(
    0deg,
    rgba(255,255,255,1) 0%, 
    rgba(247,247,247,0.8) 30%, 
    rgba(247,247,247,0.9) 40%, 
    rgba(240,240,240,0) 100%);
    --transparent: transparent;

    --container-border-radius: 4px;
    --container-box-shadow: 5px 5px 10px 0px rgba(150, 150, 150, 0.4);
    --circle-box--shadow: 5px 4px 9px -2px rgba(150, 150, 150, 0.8);
    --inset-box-shadow: inset -3px -3px 15px rgba(70, 70, 70, 0.2), inset 0px 0px 15px rgba(70, 70, 70, 0.12);
  }

  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      outline: none;
      vertical-align: baseline;
      font-family: var(--typeface-sans-serif);
    }
    
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1;
    height: 100vh;
    width: 100vw;

    .App{
      display: flex;
      justify-content: center;
      background-color: var(  --container-light-color);
      .im-app{
        outline: 1px solid var(--border-color);
        width: 100%;;
        max-width: ${maxResolution};
        height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: var(--container-white-color);
        box-shadow: var(--container-box-shadow);
        main {
          flex: 1;
          width: 100%;
          overflow: hidden;
        }
        
      }
    } 
  } 

  .im-global-centered{
    display: flex; 
    justify-content: center;
    align-items: center;
  }
      
  .im-global-text-ellipsis{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default GlobalStyles;
