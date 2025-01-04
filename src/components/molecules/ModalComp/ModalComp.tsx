import { Button, Text } from "@mantine/core"
import { modals } from "@mantine/modals"
import { ReactNode, useState } from "react"

type ModalCompProps = {
  title: string
  children: ReactNode
  btnText: string
}

function ModalComp({ title, children, btnText , open , setOpen }: ModalCompProps) {
  //const [isModalOpen, setIsModalOpen] = useState(false)

//   const openModal = () => {
//     setIsModalOpen(true)
//   }

  const closeModal = () => {
    setOpen(false)
  }

  const handleConfirm = () => {
    closeModal()
  }

  const handleCancel = () => {
    closeModal()
  }

  return (
    <>
      {/* <Button onClick={open}>{btnText}</Button> */}

      {open && (
        <div>
          {/* Render the modal content */}
          <Text size="sm">هل انت متاكد من استرداد الجلسه" </Text>

          {/* Render buttons or other UI elements for confirmation and cancellation */}
          <Button onClick={handleConfirm}>موافق</Button>
          <Button onClick={handleCancel}>إلغاء</Button>
        </div>
      )}
    </>
  )
}

export default ModalComp
