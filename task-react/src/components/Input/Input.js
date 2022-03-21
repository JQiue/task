export default function Input(props) {
  const addHandle = (e) => {
    if (e.code == 'Enter' || e.type == 'blur') {
      if (e.target.value == '') {
        props.toggle();
        return;
      }
      let data = JSON.stringify({ content: e.target.value, type: 'prepare' })
      global.http.post('/api/task/new', data, result => {
        global.http.get('/api/task/list', result => props.setData(result.data));
      });
      e.target.value = '';
      props.toggle();
    }
  }
  return (<input className='input-component' type="input" placeholder='请输点什么...' autoFocus onBlur={addHandle} onKeyDown={addHandle} />)
}
