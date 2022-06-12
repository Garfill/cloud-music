import Scroll from 'components/Scroll'
import styled from 'styled-components'
const Contianer = styled.div`
  padding: 5px 0;
` 
const List = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  width: fit-content;
  height: 30px;
  overflow: hidden;
`
const ListItem = styled.span`
  flex: 0 0 auto;
  padding: 4px 8px;
  border-radius: 10px;
  font-size: var(--font-size-m);
  &.selected {
    color: var(--theme-color);
    border: 1px solid var(--theme-color);
    opacity: 0.8;
  }
`

const ListTitle = styled.span`
  padding: 5px 0;
  margin-right: 5px;
  color: grey;
  font-size: var(--font-size-m);
`

function Horizon(props) {
  const { list, title, active, handleClickItem } = props

  return (
    <Contianer>
      <Scroll direction="horizontal">
        <List>
          <ListTitle>{title}</ListTitle>
          {
            list.map((item) => {
              return (
                <ListItem
                  key={item.key}
                  className={active === item.key ? 'selected' : ''}
                  onClick={() => handleClickItem(item.key)}>{item.name}</ListItem>
              )
            })
          }
        </List>
      </Scroll>
    </Contianer>
  )
}

export default Horizon