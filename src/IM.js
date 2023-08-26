const IM = () => {
  const userIdConnected = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))._id
    : null;

  const nomConnected = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).name
    : null;

  const emailConnected = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).email
    : null;

  const roleConnected = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).leRole
    : null;

  console.log("L'ID de l'utilisateur connecté", userIdConnected);
  console.log("Le nom de l'utilisateur connecté", userIdConnected);
  console.log("L'email de l'utilisateur connecté :", emailConnected);
  console.log("Le rôle de l'utilisateur connecté :", roleConnected);

  return {
    userIdConnected,
    nomConnected,
    emailConnected,
    roleConnected,
  };
};

export default IM;
