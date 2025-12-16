import { form } from "@heroui/theme";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { editPackage } from "../../services/authService"
import ProcessingModal from "../../Additional/ProcessingModal"

const EditPackage = ({ isOpen, onClose, datas }) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState(datas);
  const [removedIndex, setRemovedIndex] = useState(new Array(3))


  //  console.log(formData.images,"this image  is from edit")
  // console.log(removedIndex);
  // console.log(formData)
  const packageId = formData._id

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    const emptySlots = removedIndex.reduce((acc, value, idx) => {
      if (value === true) acc.push(idx);
      return acc;
    }, []);

    setFormData((prev) => {
      let updatedImages = [...prev.images]

      files.forEach((file) => {
        if (emptySlots.length > 0) {
          const slot = emptySlots.shift()
          updatedImages[slot] = { file, url: URL.createObjectURL(file) };

        } else if (updatedImages.length < 3) {
          updatedImages.push({ file, url: URL.createObjectURL(file) })
        }
      })
      return { ...prev, images: updatedImages }

    })
    // console.log(formData.image,"this is add image button ")
    e.target.value = ""
    //  if(formData.images.length ===3){
    //   e.preventDefault()
    //   toast.error("You can't select more than 3 Photos")
    //   return
    //  }
    //  const index= removedIndex.reduce((acc,value,idx)=>{
    //   if(value === true) acc.push(idx)
    //     return acc
    //  },[])
    //  setRemovedIndex(index)
    //  console.log(removedIndex, "this is the index after removed")
    //  setFormData({...formdata,})

  }
  // console.log(formData, "this is updated form data")
  const handleSubmit = (e) => {
    const index = removedIndex
    e.preventDefault();
    // console.log("Submitted Data:", formData);
    // console.log(formData.id, "this is id ")

  };
  const submission = async () => {

    setIsProcessing(true)
    // console.log(removedIndex);

    const updatedFields = new FormData();

    if (Array.isArray(formData.images)) {
      formData.images.forEach((imgObj) => {
        if (imgObj?.file) {
          updatedFields.append("image", imgObj.file);
        }
      });
    }
    updatedFields.append("packageDescription", formData.packageDescription);
    updatedFields.append("payment", formData.payment);
    updatedFields.append("type", "package")
    updatedFields.append("packageId", packageId)
    removedIndex.forEach((val, idx) => {
      if (val === true) {
        updatedFields.append("removedIndex[]", idx);
      }
    });



    // console.log(updatedFields, "this is updated fields")

    // for (let [key, value] of updatedFields.entries()) {
    //   console.log(key, value, "this is updatedFields");
    // }
    try {



      const packageForEdit = await editPackage(updatedFields)
      const updatedData = packageForEdit.package
      console.log("this is response from editpack", updatedData)
      onClose(updatedData)

      // console.log(packageForEdit,"this is reponse")

    } catch (error) {
      console.log(error)
    } finally {
      setIsProcessing(false)
    }
  }
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-[95vw] max-w-[1200px] max-h-[95vh] overflow-y-auto">

        <h2 className="text-xl font-bold mb-4">Edit Package</h2>
        <input
          className="mb-2"
          type="file"
          accept="image/*"

          multiple
          onChange={handleImages}
          onClick={(e) => {
            if (formData.images.length >= 3) {
              e.preventDefault();
              toast.error("You can't select more than 3 Photos");
            }
          }}
        />


        <div className="flex flex-wrap gap-4 mb-6">
          {formData.images.map((img, index) => (
            <div key={index} className="relative w-full sm:w-[45%] md:w-[30%] h-40">
              <img
                src={img.url}
                alt="photo"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  const updatedImages = formData.images.filter((_, i) => i !== index)
                  setFormData({ ...formData, images: updatedImages })
                  setRemovedIndex((prev) => {
                    const copy = [...prev]
                    copy[index] = true
                    console.log(updatedImages,"inside of the button")
                    return copy;

                  })
                }}
                className="absolute top-2 right-2 bg-black bg-opacity-60 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ))}
        </div>


        <label
          className="text-base font-bold"
          htmlFor="">Package Description</label>
        <textarea
          type="text"
          name="packageDescription"

          value={formData.packageDescription}
          onChange={handleChange}
          className="w-full px-3 py-2 mb-3 border rounded h-40"
          required
        />
        <label
          className="text-base font-bold"
          htmlFor="">Price</label>
        <input
          type="Number"
          name="payment"
          placeholder="price"
          value={formData.payment}
          onChange={handleChange}
          className="w-full px-3 py-2 mb-3 border rounded"
          required
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => onClose(null)}

            className="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={submission}
            type="submit"
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
        {/* </form> */}
        {isProcessing && <ProcessingModal />}
      </div>
    </div>
  );
};

export default EditPackage;
