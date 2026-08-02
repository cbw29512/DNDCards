const replacements = { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" };

export const escapeHtml = value => {
  try {
    return String(value ?? "").replace(/[&<>"']/g, character => replacements[character]);
  } catch (error) {
    console.error("[Dungeon Cards] Text could not be escaped.", error);
    return "";
  }
};

export const escapeAttribute = escapeHtml;
