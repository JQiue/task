import './card.css';
import { useState, useEffect, } from 'react';

function InputComponent(props) {
  const addHandle = (e) => {
    console.log(e.type);
    if (e.code == 'Enter' || e.type == 'blur') {
      let data = JSON.stringify({ content: e.target.value, type: 'prepare' })
      global.http.post('/api/task/new', data, result => {
        global.http.get('/api/task/list', result => props.setData(result.data));
      });
      e.target.value = '';
      props.toggle();
    }
  }
  return (<input className='input-component' type="input" placeholder='请输点什么...' onBlur={addHandle} onKeyDown={addHandle} />)
}

export default function Card(props) {
  let [data, setData] = useState([]);
  let [show, setShow] = useState(false);

  useEffect(() => {
    global.http.get('/api/task/list', result => setData(data => result.data));
  }, []);

  const toggle = () => setShow(!show);

  const dragStartHandle = (id, e) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const learningDropHandler = (e) => {
    const id = e.dataTransfer.getData('text/plain');
    const data = JSON.stringify({ id, type: 'learning' });
    global.http.post('/api/task/update',
      data,
      result => {
        console.log(result);
        if (result.error == 0) global.http.get('/api/task/list', result => setData(result.data));
      }
    );
  };

  const completedDropHandler = (e) => {
    const id = e.dataTransfer.getData('text/plain');
    const data = JSON.stringify({ id, type: 'completed' });
    global.http.post('/api/task/update', data, result => {
      console.log(result);
      global.http.get('/api/task/list', result => setData(result.data));
    });
  };

  const deleteItem = (id) => {
    const data = JSON.stringify({ id });
    global.http.post('/api/task/delete', data, result => {
      global.http.get('/api/task/list', result => setData(result.data));
    });
  }

  return (<div className="wrapper">

    <div className="card">
      <h3>准备学习</h3>
      {
        data.map((item, index) => {
          if (item.type == 'prepare') {
            return (
              <div className='draggable' draggable="true"
                onDragStart={dragStartHandle.bind(this, item.id)} key={item.id}>{item.content}
                <button onClick={deleteItem.bind(this, item.id)}>删除</button>
              </div>
            )
          }
        })
      }
      <div>
        {show ? <InputComponent toggle={toggle} setData={setData} /> : null}
      </div>
      <div style={{ textAlign: 'center' }}>
        <button onClick={() => toggle()}>+</button>
      </div>
    </div>

    <div className="card" onDragOver={(e) => e.preventDefault()} onDrop={learningDropHandler}>
      <h3>学习中</h3>
      {
        data.map((item, index) => {
          if (item.type == 'learning') return (<div className='draggable' draggable="true" onDragStart={dragStartHandle.bind(this, item.id)} key={item.id}>
            {item.content}
            <button onClick={deleteItem.bind(this, item.id)}>删除</button>
          </div>)
        })
      }
    </div>

    <div className="card" onDragOver={(e) => e.preventDefault()} onDrop={completedDropHandler}>
      <h3>完成</h3>
      {
        data.map((item, index) => {
          if (item.type == 'completed') return (<div className="draggable" draggable="true" onDragStart={dragStartHandle.bind(this, item.id)} key={item.id}>
            {item.content}
            <button onClick={deleteItem.bind(this, item.id)}>删除</button>
          </div>)
        })
      }
    </div>
  </div>)
}