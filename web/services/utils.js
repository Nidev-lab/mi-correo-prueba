export const isCAOrder = (order) => {
  if (order && order.shipping_lines && order.shipping_lines.length > 0) {
    if (
      order.shipping_lines[0].source.toLowerCase().includes("correo argentino")
    ) {
      return true;
    }
  }
  return false;
};
