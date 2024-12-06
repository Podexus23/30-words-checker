export async function handleSubmitAddWordForm(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const dataToSend = JSON.stringify(
    Object.fromEntries(Array.from(data.entries()))
  );
  e.target.reset();
  await fetch("/api/word", { method: "POST", body: dataToSend });
}
