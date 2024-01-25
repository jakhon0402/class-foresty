import {
  Button,
  Chip,
  Input,
  ModalFooter,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { cleanStringForRegex, getPhoneNumberPattern } from "../../utils/regex";
import { getHandleChange, getReqBody } from "./data";
import { uniqueId } from "lodash";
import { v4 as uuidv4 } from "uuid";
import FileInput from "./FileInput";

const ForestyForm = ({
  isLine,
  isSmall = false,
  enableReinitialize = false,
  initialValues,
  validationSchema,
  handleSubmit,
  fields,
  colsNum = 1,
  submitBtnText,
  isLoading,
  modalData,
  isValidate = true,
  extraInput = null,
}) => {
  useEffect(() => {
    console.log("Render");
  }, []);

  return (
    <Formik
      // validateOnBlur={t}
      // validateOnBlur={true}
      // validateOnChange={true}
      enableReinitialize={enableReinitialize}
      initialValues={initialValues}
      validationSchema={isValidate && validationSchema}
      onSubmit={async (values, { props, setSubmitting }) => {
        // console.log(values);
        // console.log(getReqBody(values));
        handleSubmit(getReqBody(values));
        modalData?.onClose();
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
        setFieldValue,
        isValid,
        isSubmitting,
        dirty,
      }) => (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className={
            isLine
              ? "flex flex-row gap-4 w-full items-center"
              : isSmall
              ? "flex flex-col gap-4 w-full"
              : "flex flex-col gap-8 w-full"
          }
        >
          <div
            style={{
              gap: isSmall ? "8px" : "15px",
              gridTemplateColumns: `repeat(${colsNum}, minmax(0, 1fr))`,
            }}
            className={
              modalData
                ? "grid w-full font-madefor px-5"
                : "grid w-full font-madefor"
            }
          >
            {fields?.map((field, key) =>
              field.type === "select" ? (
                <Select
                  size={isSmall ? "sm" : "md"}
                  defaultSelectedKeys={new Set([values[field.name]])}
                  variant='faded'
                  isInvalid={touched[field.name] && Boolean(errors[field.name])}
                  errorMessage={errors[field.name]}
                  isRequired={field?.isRequired}
                  className='text-black dark:text-white w-full'
                  selectionMode={field?.selectionMode}
                  // selectedKeys={values[field?.name]}
                  // name={field?.name}
                  // onSelectionChange={handleChange}
                  selectedKeys={new Set([values[field?.name]])}
                  key={key}
                  label={field.label}
                  placeholder={field.placeholder}
                  onChange={(e) => {
                    setFieldValue(field?.name, e.target.value);
                  }}
                >
                  {field?.selectData &&
                    field?.selectData.map((selData) => (
                      <SelectItem
                        textValue={selData?.name}
                        variant={selData?.hexCode ? "light" : "flat"}
                        style={
                          selData?.hexCode && {
                            backgroundColor: selData?.hexCode,
                            color: "#fff",
                          }
                        }
                        // className='text-black dark:text-white'
                        key={selData?.id}
                        value={selData?.id}
                      >
                        {selData?.name}
                      </SelectItem>
                    ))}
                </Select>
              ) : field?.type == "selectSubjects" ? (
                field?.selectData && (
                  <Select
                    defaultSelectedKeys={new Set(values[field.name])}
                    key={key}
                    selectedKeys={new Set(values[field?.name])}
                    items={field?.selectData}
                    label={field.label}
                    placeholder={field.placeholder}
                    variant='faded'
                    isInvalid={
                      touched[field.name] && Boolean(errors[field.name])
                    }
                    errorMessage={errors[field.name]}
                    isRequired={field?.isRequired}
                    isMultiline={true}
                    selectionMode='multiple'
                    classNames={{
                      base: "w-full",
                    }}
                    onSelectionChange={(keys) => {
                      setFieldValue(field?.name, [...keys]);
                    }}
                    renderValue={(items) => {
                      return (
                        <div className='flex flex-wrap gap-2'>
                          {items?.map((item, index) => (
                            <Chip
                              style={{
                                backgroundColor: item.data.color?.hexCode,
                                color: "#fff",
                              }}
                              key={index}
                            >
                              {item.data.name}
                            </Chip>
                          ))}
                        </div>
                      );
                    }}
                  >
                    {(user) => (
                      <SelectItem textValue={user.name}>
                        <div className='flex gap-2 items-center'>
                          <div className='flex flex-col'>
                            <span className='text-small'>{user.name}</span>
                          </div>
                        </div>
                      </SelectItem>
                    )}
                  </Select>
                )
              ) : field.type == "documentFile" ? (
                <FileInput
                  key={key}
                  label={field.label}
                  // labelPlacement='outside'
                  placeholder={field.placeholder}
                  name={field.name}
                  file={values[field?.name]}
                  setFile={(file) => {
                    setFieldValue(field?.name, file);
                  }}
                />
              ) : field.type == "file" ? (
                <div className='flex flex-col items-center'>
                  {values[field.name] && (
                    <img
                      src={URL.createObjectURL(values[field.name])}
                      alt='Selected File'
                      className='w-full h-[200px] object-contain'
                    />
                  )}
                  <Input
                    type='file'
                    onChange={(e) => {
                      setFieldValue(field?.name, e.target.files[0]);
                    }}
                    accept='image/*' // Optional: Specify the accepted file types (e.g., images)
                  />
                  {/* {values[field.name] && (
                              <p>Selected File: {values[field.name].name}</p>
                            )} */}
                </div>
              ) : field?.type == "textarea" ? (
                <Textarea
                  name={field.name}
                  value={values[field.name]}
                  key={key}
                  type={field.type}
                  onChange={getHandleChange(
                    field?.name,
                    setFieldValue,
                    handleChange
                  )}
                  variant='bordered'
                  label={field.label}
                  // labelPlacement='outside'
                  placeholder={field.placeholder}
                  disableAnimation
                  disableAutosize
                  classNames={{
                    base: "w-full",
                    input: "resize-y min-h-[300px]",
                  }}
                />
              ) : (
                <Input
                  size={isSmall ? "sm" : "md"}
                  variant='faded'
                  // isInvalid={
                  //   !touched[field.name] && !errors[field.name]
                  // }
                  className='text-black dark:text-white'
                  isDisabled={field?.isDisabled}
                  startContent={field?.startContent}
                  endContent={field?.endContent}
                  isInvalid={touched[field.name] && Boolean(errors[field.name])}
                  errorMessage={errors[field.name]}
                  isRequired={field?.isRequired}
                  // style={{ color: "#000", fontWeight: 500 }}
                  label={field.label}
                  // labelPlacement='outside'
                  placeholder={field.placeholder}
                  name={field.name}
                  value={values[field.name]}
                  key={key}
                  type={field.type}
                  onChange={getHandleChange(
                    field?.name,
                    setFieldValue,
                    handleChange
                  )}
                />
              )
            )}
            {extraInput}
          </div>

          {modalData ? (
            <ModalFooter>
              <Button
                color='danger'
                variant='flat'
                onPress={modalData?.onClose}
              >
                {"Bekor qilish"}
              </Button>
              <Button
                isLoading={isLoading}
                disabled={!isValid || !dirty}
                type='submit'
                color={!isValid || !dirty ? "default" : "primary"}
              >
                {submitBtnText}
              </Button>
            </ModalFooter>
          ) : (
            <div className='flex flex-row-reverse'>
              <Button
                radius='full'
                size={isSmall ? "md" : "lg"}
                isLoading={isLoading}
                disabled={!isValid || !dirty}
                type='submit'
                color={!isValid || !dirty ? "default" : "primary"}
                className='w-fit'
              >
                {submitBtnText}
              </Button>
            </div>
          )}
        </form>
      )}
    </Formik>
  );
};

export default ForestyForm;
