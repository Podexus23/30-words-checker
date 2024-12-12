export function createInput({
  type = "text",
  name = "",
  id = "",
  placeholder = "",
  className,
}) {
  const input = document.createElement("input");
  input.type = type;
  input.name = name;
  input.id = id;
  input.placeholder = placeholder;
  input.className = className || `${name}-input`;
  return input;
}

export function createTag({ tagName, className, textContent }) {
  if (!tagName) {
    console.error(`createTag: no tag name`);
    return;
  }
  const block = document.createElement(tagName);
  if (className) block.className = className;
  if (textContent) block.textContent = textContent;
  return block;
}

export function createLink({ className, href, textContent }) {
  if (!href) {
    console.error(`createLink: no href`);
    return;
  }
  const block = document.createElement("a");
  if (className) block.className = className;
  if (href) block.href = href;
  if (textContent) block.textContent = textContent;
  return block;
}

export function createForm({
  action = "/",
  method = "get",
  autocomplete = "off",
  name,
  className,
}) {
  const form = document.createElement("form");
  form.action = action;
  form.method = method;
  form.autocomplete = autocomplete;
  if (name) form.name = name;
  if (className) form.className = className;
  return form;
}

export function createImage({ className, src, alt = "picture" }) {
  const image = document.createElement("img");
  if (className) image.className = className;
  if (src) image.src = src;
  image.alt = alt;
  return image;
}
