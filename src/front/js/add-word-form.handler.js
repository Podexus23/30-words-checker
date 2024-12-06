export const handleAddWordForm = async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const dataToSend = JSON.stringify(
    Object.fromEntries(Array.from(data.entries()))
  );
  await fetch("/api/word", { method: "POST", body: dataToSend });
};
