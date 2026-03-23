import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LogoutIcon from "@mui/icons-material/Logout";
import * as React from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { removeUserDetails } from "@/redux/Modules/userlogin";
import {
  capitalizeFirstLetter,
  capitalizeFirstTwoWords,
} from "@/lib/helpers/nameFormate";

interface pageProps {
  children: React.ReactNode;
}

const Navbar: React.FC<pageProps> = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const userDetails = useSelector(
    (state: any) => state.auth.user?.data?.user_details
  );

  const logout = () => {
    Cookies.remove("user");
    dispatch(removeUserDetails());
    router.push("/");
  };

  return (
    <>
      <div className="headnav">
        <div className="navContainer">
          <div className="logoBlock">
            <Image
              alt=""
              src="/login/landcare-logo.svg"
              height={50}
              width={150}
            />
          </div>
          <div className="profileGrp">
            <Avatar className="profileAvatar">
              {userDetails?.name?.slice(0, 1).toUpperCase()}
            </Avatar>
            <div className="profileName">
              <h4 className="profile">
                {capitalizeFirstTwoWords(userDetails?.name)}
              </h4>
              <p className="designation">
                {userDetails?.user_type
                  ? capitalizeFirstLetter(userDetails.user_type)
                  : ""}
              </p>
            </div>
            <div className="profileDivider" />
            <Tooltip title="Log Out" placement="bottom" arrow>
              <IconButton
                onClick={logout}
                size="small"
                className="logoutBtn"
              >
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="baseContainer">{children}</div>
    </>
  );
};
export default Navbar;
