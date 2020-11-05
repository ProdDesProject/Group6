import { Heading, NavItem } from './Heading';
import Mainbody from './Mainbody';
import  DropdownMenu from './DropdownMenu';

function Mainpage() {
  return (
    <div>
      <header>
        <Heading>
          <NavItem item={<i class='fas fa-home'></i>}/>;
          <NavItem item="Login"><DropdownMenu/></NavItem>;
        </Heading>
        <Mainbody/>
      </header>
    </div>
  );
}

export default Mainpage;
