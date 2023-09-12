import { Modal, VerticalStack } from "@shopify/polaris";
import React from "react";

const ListModal = ({
  active,
  title,
  textAction = "Aceptar",
  acceptAction = null,
  items,
  renderItem,
  handleChange,
}) => {
  return (
    <div>
      <Modal
        instant
        open={active}
        title={title}
        primaryAction={{
          content: textAction,
          onAction: acceptAction ? acceptAction : handleChange,
        }}
        onClose={handleChange}
      >
        <Modal.Section>
          <VerticalStack gap="5">
            {items ? items.map((item, key) => renderItem(item, key)) : ""}
          </VerticalStack>
        </Modal.Section>
      </Modal>
    </div>
  );
};

export default ListModal;
