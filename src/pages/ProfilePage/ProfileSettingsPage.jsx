import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAvatar,
  updateUserAvatar,
  updateUserPassword,
  updateUserProfile,
  updateUserProfileAddress,
} from "./profileSlice";
import DeleteModal from "../../components/Modal/DeleteModal";
import { DeleteButtonText } from "../../components/Buttons/CRUDbuttons";
import { getProfileAvatar } from "../../utils/profile";
import ForestyForm from "../../components/Form/ForestyForm";
import {
  updateAddressEmptyValues,
  updateAddressFields,
  updateAddressValidationSchema,
  updateProfileDataEmptyValues,
  updateProfileDataFields,
  updateProfileDataValidationSchema,
  updateProfilePasswordFields,
  updateProfilePasswordValidationSchema,
  updateProfilePasswordValues,
} from "./data/profileForm";
import { getUpdateInitialValuesProfileData } from "./utils/utils";
import { regions } from "./data/regions";
import UploadImageInput from "../../components/Form/UploadImageInput";
import CreateEditModal from "../../components/Modal/CreateEditModal";

const ProfileSettingsPage = ({ user }) => {
  const { uploadLoading } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);

  return (
    <div className='flex flex-row w-full gap-5'>
      <UploadImageInput
        fileId='avatarFileId'
        imageData={user?.profilePhoto}
        imageSrc={getProfileAvatar(user?.profilePhoto)}
        uploadLoading={uploadLoading}
        uploadUrl={"/user/updateAvatar"}
        deleteUrl={"/user/removeAvatar"}
      />

      <div className='flex flex-col flex-grow gap-5'>
        <div className='flex flex-col gap-5 w-full rounded-[30px] bg-white dark:bg-neutral-800/50 p-8'>
          <div className='flex flex-row w-full justify-between'>
            <span className='text-[16px] text-neutral-500 dark:text-neutral-400'>
              {"Foydalanuvchi ma'lumotlari"}
            </span>
            <CreateEditModal
              title={"Parolni o'zgartirish"}
              // loading={loading}
              button={<Button>{"Parolni o'zgartirish"}</Button>}
              fields={updateProfilePasswordFields}
              initialValues={updateProfilePasswordValues}
              validationSchema={updateProfilePasswordValidationSchema}
              submitBtnText={"Saqlash"}
              handleSubmit={(body) => dispatch(updateUserPassword(body))}
            />
          </div>
          <ForestyForm
            enableReinitialize
            // isValidate={false}
            // isLoading={loading}
            colsNum={2}
            initialValues={getUpdateInitialValuesProfileData(user?.user)}
            fields={updateProfileDataFields}
            validationSchema={updateProfileDataValidationSchema}
            handleSubmit={(body) => dispatch(updateUserProfile(body))}
            submitBtnText='Saqlash'
          />
        </div>

        <div className='flex flex-col gap-5 w-full rounded-[30px] bg-white dark:bg-neutral-800/50 p-8'>
          <span className='text-[16px] text-neutral-500 dark:text-neutral-400'>
            {"Manzil"}
          </span>
          <ForestyForm
            enableReinitialize
            // isValidate={false}
            // isLoading={loading}
            colsNum={2}
            initialValues={
              !user?.address ? updateAddressEmptyValues : user?.address
            }
            fields={updateAddressFields.map((el) => {
              if (el.name === "region") {
                el.selectData = regions;
                return el;
              }
              return el;
            })}
            validationSchema={updateAddressValidationSchema}
            handleSubmit={(body) => dispatch(updateUserProfileAddress(body))}
            submitBtnText='Saqlash'
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
