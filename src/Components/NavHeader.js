import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../Redux/auhSlice";
import { useNavigate } from "react-router-dom";
import logoImage from "../Images/sanovod-high-resolution-logo-white-on-transparent-background.png";
import IM from "../IM";

const pages = ["FilmPlateforme", "FilmClassement"];
const settings = [];

function NavHeader() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { roleConnected } = IM();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(Logout());
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "#0b41a4" }}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Utilisez l'image de votre logo */}
          {/* Utilisez une balise Link pour envelopper l'image */}
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <img
              src={logoImage}
              alt="Logo"
              style={{ marginRight: "8px", maxHeight: "25px" }}
            />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={`/${page.toLowerCase()}`}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.replace("Film", "")}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {userInfo ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={userInfo.name}
                    src={userInfo.image}
                    sx={{ width: 40, height: 40, borderRadius: "1cm" }}
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  sx={{ my: 2, color: "white" }}
                >
                  Se connecter{" "}
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  sx={{ my: 2, color: "white" }}
                >
                  S'inscrire
                </Button>
              </>
            )}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}

              <Link
                to="/profile"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
              </Link>
              <Link
                to={
                  roleConnected === "Admin"
                    ? "/tdbadmin"
                    : roleConnected === "Modérateur"
                    ? "/tdbmoderateur"
                    : roleConnected === "Abonné"
                    ? "/tdbabonne"
                    : "/"
                }
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">TDB</Typography>
                </MenuItem>
              </Link>

              {userInfo && (
                <MenuItem onClick={logoutHandler}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavHeader;
