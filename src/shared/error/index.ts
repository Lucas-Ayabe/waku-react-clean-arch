export const ensure = (condition: boolean, message = () => "") => {
  if (!condition) throw new Error(message());
};
