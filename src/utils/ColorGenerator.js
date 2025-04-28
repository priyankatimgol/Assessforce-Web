const ColorGenerator = () => {
  const colorsArray = ['#BA68C8', '#F06292', '#FFB300', '#6EC9E1', '#4DB6AC', '#8BC34A', '#7986CB'];
  const randomColor = colorsArray[Math.floor(Math.random() * colorsArray.length)];
  return randomColor;
};

export default ColorGenerator;
