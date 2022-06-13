import React, { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Header from './component/header';


// api
import { getPlayList } from 'api/album'

function Album() {
  const [show, setShow] = useState(true);
  const nav = useNavigate();

  function back() {
    nav(-1)
  }

  return (
    <CSSTransition
      in={show}
      appear={true}
      unmountOnExit
      timeout={200}
      classNames="page-animate"
      onExited={back}
    >
      <Header title='返回' handleClick={() => setShow(false)}></Header>
    </CSSTransition>
  )
}

export default memo(Album)