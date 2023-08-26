// navigationUtils.js
export const AnnulationRetour = (roleConnected, navigate) => {
  if (roleConnected === "Admin") {
    navigate("/tdbadmin");
  } else if (roleConnected === "Modérateur") {
    navigate("/tdbmoderateur");
  } else if (roleConnected === "Abonné") {
    navigate("/tdbabonne");
  } else {
    navigate("/");
  }
};
