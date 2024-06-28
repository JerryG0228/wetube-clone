export const join = (req, res) => res.send("join");
export const edit = (req, res) => res.send("Edit user");
export const remove = (req, res) => res.send("Delete user");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => {
  console.log(req.params);
  res.send(`See #${req.params.id} Profile`);
};
