export function handleAsideSettings(e: MouseEvent) {
  const button = e.target as HTMLElement;
  if (button.classList.contains("btn")) {
    console.log(button.dataset.sourceName);
  } else console.dir(e.target);
}
