import React from "react";

// masterial ui lib
// icons
import DeleteForeverSharpIcon from "@material-ui/icons/AccountBoxSharp";
import AccountBalanceSharpIcon from '@material-ui/icons/AccountBalanceSharp';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import VpnKeySharpIcon from '@material-ui/icons/VpnKeySharp';
// external css
import Styles from "./styles.module.css";

// list
const List = ({
  Icon = (
    <DeleteForeverSharpIcon style={{ fontSize: 15, marginRight: "10px" }} />
  ),
  title = "demo name",
}) => {
  return (
    <div className={`${Styles.list}`}>
      {Icon}
      {title}
    </div>
  );
};

const SideBar = () => {
  return (
    <div className={`${Styles.container}`}>
       <List Icon={<AccountBalanceSharpIcon/>}   title={"Organisation"} />
       <List Icon={<PermIdentityIcon/>} title={"User"} />
      <List Icon={<AssignmentIndOutlinedIcon/>} title={"Group"} />
      <List Icon={<VpnKeySharpIcon/>}title={"Roles"} />
      <List Icon={<ListAltIcon/>} title={"Profile"} />
    </div>
  );
};

export default SideBar;
