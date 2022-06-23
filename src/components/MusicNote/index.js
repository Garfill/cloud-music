import React, { forwardRef, memo, useEffect, useImperativeHandle, useRef } from 'react'
import styled from 'styled-components'
const Container = styled.div`
  .icon-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    display: none;
    font-size: 14px;
    color: var(--theme-color);
    transform: translate3d(0, 0, 0);
    transition: transform 1s cubic-bezier(.74,.34,.64,.88);
  }
`
const NOTE_NUM = 3
const MusicNote = forwardRef((props, ref) => {
  const wrapRef = useRef(null)
  const createNode = () => {
    for (let i = 0; i < NOTE_NUM; i++) {
      let node = document.createElement('div')
      node.className = 'icon-wrapper'
      node.innerHTML = '<div class="icon">+1</div>'
      wrapRef.current.appendChild(node)
    }

    let doms = [...wrapRef.current.children]
    doms.forEach(item => {
      item.running = false;
      item.addEventListener('transitionend', function() {
        this.style['display'] = 'none'
        this.style['transform'] = 'translate3d(0, 0, 0)'
        this.running = false
      })
    })
  }

  useEffect(() => {
    createNode()
  }, [])
  
  useImperativeHandle(
    ref,
    () => {
      return {
        startAnimate({ x, y }) {
          let doms = [...wrapRef.current.children];
          for (let i = 0; i < doms.length; i++) {
            let item = doms[i]
            if (!item.running) {
              item.style.left = x + 'px'
              item.style.top = y + 'px'
              item.style.display = 'inline-block'
              window.requestAnimationFrame(() => {
                item.running = true;
                item.style['transform'] = `translate3d(${-x}px, 750px, 0)`;
              })
              break;
            }
          }
        }
      }
    }
  )

  return (
    <Container ref={wrapRef}>
    </Container>
  )
})


export default memo(MusicNote)
