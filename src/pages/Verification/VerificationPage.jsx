import { Button, Tab, Tabs } from "@nextui-org/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { sendVerificationCode, verify } from "../LoginPage/authSlice";
import VerificationInput from "react-verification-input";

const VerificationPage = () => {
  const { isCodeSend, loading } = useSelector((state) => state.auth);
  const { username } = useParams();
  const [selected, setSelected] = useState("email");
  const dispatch = useDispatch();

  const [code, setCode] = useState("");

  return (
    <div className='flex justify-center items-center w-screen h-screen bg-amber-500/50 dark:bg-neutral-950'>
      <div className='flex flex-col gap-5 bg-white dark:bg-neutral-900 py-10 p-5 rounded-3xl w-[450px] items-center'>
        <span className='text-[22px] text-amber-700 font-bold font-space mb-5'>
          {"Akkountni tasdiqlash"}
        </span>
        {!isCodeSend ? (
          <>
            <Tabs
              // color='primary'
              aria-label='Options'
              selectedKey={selected}
              onSelectionChange={setSelected}
              size='lg'
            >
              <Tab key='email' title='Email'></Tab>
              <Tab key='phone_number' title='Telefon raqam'></Tab>
            </Tabs>
            <Button
              className='bg-amber-500'
              isLoading={loading}
              onPress={() => {
                dispatch(sendVerificationCode({ type: selected, username }));
              }}
              color='primary'
            >
              {"Tasdiqlash kodini yuborish"}
            </Button>
          </>
        ) : (
          <div className='flex flex-col gap-8'>
            <VerificationInput
              value={code}
              onChange={(val) => setCode(val)}
              classNames={{
                container: "container",
                character: "character",
                characterInactive: "character--inactive",
                characterSelected: "character--selected",
              }}
              validChars='0-9'
              inputProps={{ inputMode: "numeric" }}
            />
            <Button
              className='bg-amber-500 text-white'
              disabled={code.length < 6}
              onPress={() => dispatch(verify({ code, username }))}
              color={code.length < 6 ? "default" : "primary"}
            >
              {"Tasdiqlash"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationPage;
