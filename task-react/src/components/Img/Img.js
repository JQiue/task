export default function ImgComponet(props) {
  if(props.type == '晴') {
    return <img src='./asserts/qing.png'/>
  } else if (props.type == '阵雨') {
    return <img src='./asserts/yu.png'/>
  } else if (props.type == '多云') {
    return <img src='./asserts/yin.png'/>
  } else {
    return <img src=''/>
  }
}