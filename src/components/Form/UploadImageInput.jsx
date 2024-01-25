import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteImage, updateImage } from "../../pages/ProfilePage/profileSlice";
import DeleteModal from "../Modal/DeleteModal";
import { DeleteButton, DeleteButtonText } from "../Buttons/CRUDbuttons";

const UploadImageInput = ({
  fileId,
  isCompact = false,
  label,
  widthFull = false,
  imageData,
  imageSrc,
  uploadUrl,
  deleteUrl,
  uploadLoading,
}) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setIsImageSelected(true);
    }
  };
  return (
    <div className='flex flex-col items-center w-fit gap-5 py-3 px-5'>
      {label && (
        <span className='text-[16px] font-semibold font-space mb-[-30px]'>
          {label}
        </span>
      )}
      <input
        onChange={handleFileChange}
        type='file'
        name='avatar'
        id={fileId}
        className={
          widthFull
            ? "w-full invisible h-0 overflow-hidden"
            : "w-[210px] invisible h-0 overflow-hidden"
        }
        accept='image/*'
      />
      <label
        htmlFor={fileId}
        // onMouseEnter={() => setIsImgHover(true)}
        // onMouseLeave={() => setIsImgHover(false)}
        className='group w-fit'
      >
        <div
          className={
            widthFull
              ? "w-full h-[210px] relative rounded-[30px] overflow-hidden"
              : "w-[210px] h-[210px] relative rounded-[30px] overflow-hidden"
          }
        >
          <img
            src={image === null ? imageSrc : URL.createObjectURL(image)}
            className='w-full h-full object-cover bg-contain bg-no-repeat'
          />

          <div
            className={
              // isImgHover
              // ? "flex justify-center items-end pb-5 w-full h-full absolute rounded-[30px] top-0 left-0 bg-forestydark-400/30"
              "flex justify-center items-end pb-5 w-full h-full invisible group-hover:visible absolute rounded-[30px] top-0 left-0 bg-forestydark-400/30"
            }
          >
            <span className='text-foresty-white'>Rasm tanlash</span>
          </div>
        </div>
      </label>
      <div
        className={
          isCompact
            ? "flex flex-row items-center gap-2 w-full"
            : "flex flex-col gap-2 w-full"
        }
      >
        <Button
          className='flex flex-grow'
          isLoading={uploadLoading}
          color={!isImageSelected ? "default" : "primary"}
          onClick={() =>
            dispatch(
              updateImage({
                url: uploadUrl,
                file: image,
                removeSelection: () => {
                  setIsImageSelected(false);
                  setImage(null);
                },
              })
            )
          }
          disabled={!isImageSelected}
        >
          {" Rasmni yuklash"}
        </Button>
        {imageData != null && (
          <DeleteModal
            button={
              isCompact ? (
                <DeleteButton />
              ) : (
                <DeleteButtonText>{"O'chirish"}</DeleteButtonText>
              )
            }
            contextText={`Avatarni `}
            handleSubmit={() => dispatch(deleteImage({ url: deleteUrl }))}
          />
        )}
      </div>
    </div>
  );
};

export default UploadImageInput;
