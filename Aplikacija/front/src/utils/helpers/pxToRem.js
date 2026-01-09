// Converted px value to rem value - for responsive design

const pxToRem = (pxValue) => {
  const baseFontSize = getComputedStyle(document.documentElement).fontSize;
  const baseFontSizePx = parseFloat(baseFontSize);
  console.log({ baseFontSize });
  return `${pxValue / baseFontSizePx}rem`;
};

export default pxToRem;
