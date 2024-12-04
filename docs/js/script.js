document.addEventListener("DOMContentLoaded", async () => {
  const wishlist = document.getElementById("wishlist");

  // Function to convert Markdown-style links into HTML <a> elements
  const parseMarkdownLink = (text) => {
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
    return text.replace(linkRegex, (match, label, url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
    });
  };

  try {
    const response = await fetch("wishlist.txt");
    if (!response.ok) throw new Error("Unable to load wishlist.txt");

    const data = await response.text();
    const wishes = data.split("\n").filter((item) => item.trim() !== "");

    wishes.forEach((wish) => {
      const li = document.createElement("li");
      li.innerHTML = parseMarkdownLink(wish);
      wishlist.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    wishlist.innerHTML =
      "<p>Could not load the wish list. Please try again later.</p>";
  }
});
