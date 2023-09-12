import { Frame, Toast } from "@shopify/polaris";

const ToastMessage = ({ msg, duration = 2000, active, toggleActive }) => {
  return (
    <Frame>
      {active && (
        <Toast content={msg} onDismiss={toggleActive} duration={duration} />
      )}
    </Frame>
  );
};

export default ToastMessage;
