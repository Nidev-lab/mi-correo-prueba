export const splitAddress = (address) => {
  try {
    const array = address.split(" ");
    const number = array[array.length - 1];
    const name = array.slice(0, array.length - 1).join(" ");
    return { name, number };
  } catch (e) {
    return { name: " ", number: " " };
  }
};