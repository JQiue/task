import './card.css';
import { useState, useEffect, useRef } from 'react';

import Input from '../Input/Input'

export default function Card(props) {
  let [data, setData] = useState([]);
  let [show, setShow] = useState(false);
  let learningContainer = useRef(null);
  let completeContainer = useRef(null);

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
        if (result.error == 0) global.http.get('/api/task/list', result => setData(result.data));
      }
    );
    learningContainer.current.classList.remove('dragover');
  };

  const completedDropHandler = (e) => {
    const id = e.dataTransfer.getData('text/plain');
    const data = JSON.stringify({ id, type: 'completed' });
    global.http.post('/api/task/update', data, result => {
      global.http.get('/api/task/list', result => setData(result.data));
    });
    completeContainer.current.classList.remove('dragover');
  };

  const deleteItem = (id) => {
    const data = JSON.stringify({ id });
    global.http.post('/api/task/delete', data, result => {
      global.http.get('/api/task/list', result => setData(result.data));
    });
  };

  const learnDragOverHandler = e => {
    e.preventDefault();
    learningContainer.current.classList.add('dragover');
  }
  const learnDragLeaveHandler = e => {
    learningContainer.current.classList.remove('dragover');
  }

  const completeDragOverHandler = e => {
    e.preventDefault();
    completeContainer.current.classList.add('dragover');
  }

  const completeDragLeaveHandler = e => {
    completeContainer.current.classList.remove('dragover');
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
                <button className='delete-btn' onClick={deleteItem.bind(this, item.id)}>x</button>
              </div>
            )
          }
        })
      }
      <div className='draggable-input'>
        {show ? <Input toggle={toggle} setData={setData} /> : null}
      </div>
      <div style={{ textAlign: 'center' }}>
        <button className='add-btn' onClick={() => toggle()}>+</button>
      </div>
    </div>

    <div className="card"
      ref={learningContainer}
      onDragLeave={learnDragLeaveHandler}
      onDragOver={learnDragOverHandler}
      onDrop={learningDropHandler}>
      <h3>学习中</h3>
      {
        data.map((item, index) => {
          if (item.type == 'learning') return (<div className='draggable' draggable="true" style={{backgroundColor: 'green', color: 'white'}} onDragStart={dragStartHandle.bind(this, item.id)} key={item.id}>
            {item.content}
            <button className='delete-btn' onClick={deleteItem.bind(this, item.id)}>x</button>
          </div>)
        })
      }
    </div>

    <div className="card" 
    ref={completeContainer}
    onDragOver={completeDragOverHandler}
    onDrop={completedDropHandler}
    onDragLeave={completeDragLeaveHandler}
    >
      <h3>完成</h3>
      {
        data.map((item, index) => {
          if (item.type == 'completed') return (<div className="draggable" draggable="true" style={{backgroundColor: 'gray', color: 'white'}} onDragStart={dragStartHandle.bind(this, item.id)} key={item.id}>
            {item.content}
            <button className='delete-btn' onClick={deleteItem.bind(this, item.id)}>x</button>
          </div>)
        })
      }
    </div>
  </div>)
}