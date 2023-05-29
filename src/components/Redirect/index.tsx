import React, { Fragment, MutableRefObject } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ButtonComponent } from 'components/Button'

interface RedirectProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  cancelButtonRef: MutableRefObject<HTMLButtonElement | null>
  setLogInSuccess: React.Dispatch<React.SetStateAction<boolean>>
}

export const RedirectComponent: React.FC<RedirectProps> = ({
  isOpen,
  setIsOpen,
  cancelButtonRef,
  setLogInSuccess
}) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto bg-gray-900"
        initialFocus={cancelButtonRef}
        open={isOpen}
        onClose={() => {
          return
        }}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left text-white align-middle transition-all transform bg-gray-700 border border-gray-700 shadow-xl rounded-2xl">
              <Dialog.Title as="h1" className="text-xl font-medium leading-6 text-white">
                Logged In!
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm">You are successfully logged in! Redirecting...</p>
              </div>
              <div className="mt-4">
                <ButtonComponent
                  type="submit"
                  onClick={() => {
                    setIsOpen(false)
                    setLogInSuccess(true)
                  }}
                >
                  Proceed Now
                </ButtonComponent>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
