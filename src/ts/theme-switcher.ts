import React from "react";

function themeButtonSwitch(e: React.MouseEvent) {
  e.preventDefault();
  let scheme = (e.target as any).dataset.themeSwitcher
  if (scheme)
    document.querySelector("html")?.setAttribute("data-theme", scheme)
}

export { themeButtonSwitch };
