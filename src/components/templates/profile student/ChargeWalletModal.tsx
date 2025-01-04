import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Modal } from "../../molecules";
import { WalletStudent } from "../Student/WalletStudent";

function ChargeTheWalletModal() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
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
        <WalletStudent setModel={setIsOpen} studentId={studentId} />
      </Modal>
      <button
        className="hover:text-white border-white border p-3 rounded-lg"
        onClick={() => setIsOpen(true)}
      >
        {t("Charge the wallet")}
      </button>
    </div>
  );
}

export default ChargeTheWalletModal;
