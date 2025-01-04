import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Modal } from "../../molecules";
import BookSessionForm from "./BookSessionForm";
type IBookSessonModal = {
  teacher_id?: any;
};
function BookSessionModal({ teacher_id }: IBookSessonModal) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const params = useParams();
  const { studentId } = params;
  console.log(teacher_id);
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <BookSessionForm
          studentId={studentId as string}
          closeModal={closeModal}
          teacher_id={teacher_id}
        />
      </Modal>

      <button
        className="hover:text-white border-white border p-3 rounded-lg"
        onClick={() => setIsOpen(true)}
      >
        {t("Book a class")}
      </button>
    </div>
  );
}

export default BookSessionModal;
