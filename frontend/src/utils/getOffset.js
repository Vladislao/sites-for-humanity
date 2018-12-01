const getOffset = (element) => {
  const {top: rectTop, left: rectLeft, width, height} = element.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const top = rectTop + scrollTop
  const left = rectLeft + scrollLeft
  const bottom = top + height
  const right = left + width
  const centerY = top + height/2
  const centerX = left + width/2
  return { top, left, bottom, right, centerX, centerY, height, width }
}

export default getOffset