import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { Divider } from '@mui/material';
import { MdDone, MdClose } from "react-icons/md";
import Status from "./Status";

function ProductView({ open, setOpen, product, isAvailable }) {

  const { id, productName, image, description, quantity, price, discount, specialPrice } = product;





  return (
    <>

      <Dialog
        open={open}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => setOpen(false)}
      >
        <DialogBackdrop className="fixed inset-0 bg-blue-900/40 backdrop-blur-md transition-opacity duration-300" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all md:max-w-[620px] md:min-w-[620px] w-full"
            >
              {image && (
                <div className="flex justify-center aspect-[3/2]">
                  <img
                    className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                    src={image}
                    alt={productName}
                  />
                </div>
              )}

              <div className="px-6 pt-2 pb-2">
                <DialogTitle
                  as="h2"
                  className="lg:text-3xl sm:text-2xl text-xl font-semibold leading-6 text-gray-800 mb-4 pt-2"
                >
                  {productName}
                </DialogTitle>

                <div className="space-y-2 text-gray-700 pb-4">

                  <div className="flex justify-between gap-2">
                    {specialPrice ? (
                      <div className="flex flex-col">
                        <span className="text-gray-800 line-through">
                          ${Number(price).toFixed(2)}
                        </span>
                        <span className="text-xl font-bold text-slate-700">
                          ${Number(specialPrice).toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-xl font-bold text-slate-700">
                          ${Number(price).toFixed(2)}
                        </span>
                      </div>
                    )}

                    {isAvailable ? (
                     <Status 
                     text="In Stock"
                     icon={MdDone}
                     bg="bg-teal-200"
                     color="text-teal-900"

                     />
                      
                    ) : (
                      <Status 
                      text="Out Of Stock"
                     icon={MdClose}
                     bg="bg-rose-200"
                     color="text-rose-700"
                     />
                    )}
                  </div>
                  <Divider />

                  <p>{description}</p>

                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setOpen(false)}
                 className="mt-4 px-4 py-2 rounded-lg border border-gray-400 text-gray-700">Cancel</button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>




    </>
  )
}

export default ProductView;