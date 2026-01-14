
import React, { useState } from 'react'
import MySkeleton from '../shared/MySkeleton';
import { FaAddressBook } from "react-icons/fa";
import AddressinfoModal from './AddressinfoModal';
import AddAddressForm from './AddAddressForm';
import { useDispatch, useSelector } from 'react-redux';
import AddressList from './AddressList';
import { DeleteModal } from './DeleteModal';
import toast from 'react-hot-toast';
import { deleteUserAddress } from '../../store/action';


const AddressInfo = ({ address }) => {

  const noAddressExit = !address || address.length === 0;

  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openDeleteModal,setOpenDeleteModal]=useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  const addnewAddressHandler = () => {
    setOpenAddressModal(true);
    setSelectedAddress("");
  }
  
  const dispatch=useDispatch();

  const deleteAddressHandler=()=>{
      dispatch(deleteUserAddress(
        toast,
        selectedAddress?.addressId,
        setOpenDeleteModal
      ))
  }

  const { isLoading, btnLoader } = useSelector((state) => state.errors)

  return (
    <div>
      {noAddressExit ? (
        <div className='p-6 rounded-lg max-w-md mx-auto flex flex-col items-center justify-center'>
          <FaAddressBook size={50} className='text-gray-500 mb-4' />
          <h1 className='text-slate-900 text-center font-semibold mb-2'>
            No Address Selected
          </h1>
          <h1 className='text-slate-800 text-center mb-6'>
            Please add address to continue your purchase.
          </h1>

          <button onClick={addnewAddressHandler}
            className='px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-red-600 transition-all'>
            Add Address
          </button>


        </div>
      ) : (
        <div className='p-6 relative rounded-lg max-w-md mx-auto'>

          <h1 className='text-slate-800 text-center font-bold'>
            Select Address
          </h1>

          {
            isLoading ? (
              <div className='py-4 px-8'>
                <MySkeleton />
              </div>
            )
              : (
                <>
                  <div className='space-y-4 pt-6'>
                    <AddressList addresses={address} setSelectedAddress={setSelectedAddress} setOpenAddressModal={setOpenAddressModal} setOpenDeleteModal={setOpenDeleteModal} />

                  </div>

                  {address.length > 0 && (
                    <div className="mt-4">
                      <button className="px-4 py-2 border border-teal-600 text-teal-700 rounded-md
                       hover:bg-teal-600 hover:text-white transition"
                        onClick={addnewAddressHandler}>
                        + Add more
                      </button>
                    </div>
                  )}


                </>
              )
          }

        </div>

      )}

      <AddressinfoModal
        open={openAddressModal}
        setOpen={setOpenAddressModal}>
        <AddAddressForm
          address={selectedAddress}
          setOpenAddressModal={setOpenAddressModal} />
      </AddressinfoModal>


      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        title={"Delete Address"}
        onDeleteHandler={deleteAddressHandler}/>


    </div>
  )
}


export default AddressInfo
