import SvgIcon from "components/SvgIcon";
import { memo } from "react";

import { HeaderContainer } from '../style'

function Header(props) {
  const { title, handleClick } = props;
  return (
    <HeaderContainer>
      <h1 onClick={handleClick}>{ title }</h1>
    </HeaderContainer>
  )
}

export default memo(Header)