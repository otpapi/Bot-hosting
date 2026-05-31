async function isAdmin(ctx) {
  if (ctx.chat.type === "private") return true;

  try {
    const member = await ctx.getChatMember(ctx.from.id);
    return ["creator", "administrator"].includes(member.status);
  } catch {
    return false;
  }
}

function getUserName(user) {
  if (user.username) {
    return "@" + user.username;
  }

  return user.first_name || "User";
}

module.exports = {
  isAdmin,
  getUserName
};
