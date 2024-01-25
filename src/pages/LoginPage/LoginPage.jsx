import React, { useState } from "react";
import { Formik } from "formik";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { STUDENT, TEACHER } from "./data/constants";
import { getLoginImage, getStartContentUsername } from "./utils/utils";
import { emptyValues, validationSchema } from "./data/loginForm";
import Logo from "../../components/Logo";
import { useDispatch } from "react-redux";
import { login } from "./authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRole, setSelectedRole] = useState(null);
  const [selected, setSelected] = React.useState(STUDENT);

  return (
    <div className='w-screen h-screen grid grid-cols-2 bg-white dark:bg-neutral-900'>
      <div className='flex flex-col gap-10 justify-center items-center w-full h-full'>
        <a href='/'>
          <Logo color={"#00373d"} height={"40px"} />
        </a>
        <div className='flex flex-col items-center md:w-[440px] w-[90%] bg-[#fff] dark:bg-forestydark-500/80 px-[40px] py-[32px] rounded-[13px] gap-5'>
          <span className='text-[28px] font-lora font-bold text-amber-600 dark:text-foresty-white'>
            {"Tizimga kirish !"}
          </span>
          <Formik
            enableReinitialize
            //   validateOnMount={false}
            //   validateOnChange={false}
            //   validateOnBlur={false}
            initialValues={emptyValues}
            validationSchema={validationSchema}
            onSubmit={(body) =>
              dispatch(
                login({
                  ...body,
                  username: `${getStartContentUsername(selectedRole)}${
                    body?.username
                  }`,
                })
              )
            }
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
                  // dispatch(login(values)).then(() => navigate("/"));
                }}
                className='flex flex-col gap-5 w-full font-madefor mt-8'
              >
                <Input
                  startContent={getStartContentUsername(selectedRole)}
                  size='lg'
                  isInvalid={touched?.username && Boolean(errors?.username)}
                  errorMessage={errors?.username}
                  value={values?.username}
                  type='number'
                  // style={{ color: "black", fontWeight: 500 }}
                  name='username'
                  placeholder='Usernameni kiriting...'
                  label='Username'
                  onChange={handleChange}
                />
                <Input
                  size='lg'
                  isInvalid={touched?.password && Boolean(errors?.password)}
                  errorMessage={errors?.password}
                  value={values?.password}
                  name='password'
                  // style={{ color: "black", fontWeight: 500 }}
                  label='Parol'
                  placeholder='Parolni kiriting...'
                  onChange={handleChange}
                  endContent={
                    <button
                      className='focus:outline-none'
                      type='button'
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashIcon className='w-[20px] text-2xl text-default-400 pointer-events-none' />
                      ) : (
                        <EyeIcon className='w-[20px] text-2xl text-default-400 pointer-events-none' />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                />
                <Button
                  size='lg'
                  type='submit'
                  disabled={!isValid || !dirty}
                  color={!isValid || !dirty ? "default" : "warning"}
                  className={
                    !isValid || !dirty
                      ? "bg-neutral-500 text-white text-[16px]"
                      : "bg-amber-500 text-white text-[16px]"
                  }
                >
                  {"Kirish"}
                </Button>
              </form>
            )}
          </Formik>
        </div>
        <p className='text-[14px] font-lora text-[#00373d] dark:text-forestydark-100'>
          &copy; Barcha huquqlar himoyalangan.
        </p>
      </div>
      <div className='flex justify-center items-center w-full h-full bg-amber-500/20 dark:bg-amber-200 relative'>
        <img src={getLoginImage(selectedRole)} className='h-[70%]' />
      </div>
      <Modal isOpen={!selectedRole} backdrop={"blur"} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                {"Role ni tanlash"}
              </ModalHeader>
              <ModalBody className='flex items-center justify-center'>
                <Tabs
                  size='lg'
                  aria-label='Options'
                  selectedKey={selected}
                  onSelectionChange={setSelected}
                >
                  <Tab key={STUDENT} title="O'quvchi" />
                  <Tab key={TEACHER} title="O'qituvchi" />
                </Tabs>
              </ModalBody>
              <ModalFooter>
                <Button
                  className='bg-amber-500'
                  color='primary'
                  onPress={() => {
                    selected && setSelectedRole(selected);
                  }}
                >
                  Tanlash
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LoginPage;
