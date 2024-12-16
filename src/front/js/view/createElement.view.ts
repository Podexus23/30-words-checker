import {
  FormTagOptions,
  ImageOptions,
  InputOptions,
  LinkOptions,
  TagOptions,
} from "../interface.front.js";

export function createInput({
  type = "text",
  name = "text-input",
  id = "",
  placeholder = "text-input",
  className,
}: InputOptions = {}): HTMLInputElement {
  const input = document.createElement("input");
  input.type = type;
  input.name = name;
  input.id = id;
  input.placeholder = placeholder;
  input.className = className ?? `${type}-input`;
  return input;
}

export function createTag({
  tagName = "div",
  className,
  textContent,
}: TagOptions = {}): HTMLElement {
  const block = document.createElement(tagName);
  if (className) block.className = className;
  if (textContent) block.textContent = textContent;
  return block;
}

export function createLink({
  className,
  href,
  textContent,
}: LinkOptions): HTMLAnchorElement {
  const anchor = document.createElement("a") as HTMLAnchorElement;
  if (className) anchor.className = className;
  if (href) anchor.href = href;
  if (textContent) anchor.textContent = textContent;
  return anchor;
}

export function createForm({
  action = "/",
  method = "GET",
  autocomplete = "off",
  name = "form",
  className = "from",
}: FormTagOptions): HTMLFormElement {
  const form = document.createElement("form");
  form.action = action;
  form.method = method;
  form.autocomplete = autocomplete;
  if (name) form.name = name;
  if (className) form.className = className;
  return form;
}

export function createImage({
  className,
  src,
  alt = "picture",
}: ImageOptions): HTMLImageElement {
  const image = document.createElement("img");
  if (className) image.className = className;
  if (src) image.src = src;
  image.alt = alt;
  return image;
}
