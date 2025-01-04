import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ModalTemplate } from "../../molecules/ModalTemplate";
import { InnerFormLayout, Modal } from "../../molecules";
import { WalletStudent } from "../Student/WalletStudent";
import { useParams } from "react-router-dom";
import SubscribeToPackageForm from "./SubscribeToPackageForm";

function SubscirbeToPackagesModal() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const params = useParams();
  const { studentId } = params;

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <SubscribeToPackageForm
          studentId={studentId as string}
          closeModal={closeModal}
        />
      </Modal>
      <button
        className="hover:text-white border-white border p-3 rounded-lg"
        onClick={() => setIsOpen(true)}
      >
        {t("Pick a package")}
      </button>
    </div>
  );
}

export default SubscirbeToPackagesModal;
