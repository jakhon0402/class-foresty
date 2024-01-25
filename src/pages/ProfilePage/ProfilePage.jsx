import { Avatar, Badge, Spinner, Tab, Tabs } from "@nextui-org/react";
import React, { useEffect } from "react";
import { sentenceCase } from "../../utils/data";
import { tabs } from "./data/tabs";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "./profileSlice";
import ProfileMainPage from "./ProfileMainPage";
import ProfileDocumentPage from "./ProfileDocumentPage";
import ProfileSettingsPage from "./ProfileSettingsPage";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState(
    localStorage.getItem("group-menu") ?? "details"
  );

  const { user, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    user && (
      <div className='flex flex-col w-full items-center gap-5'>
        <div className='grid grid-cols-3 w-full'>
          <div className='w-fit'></div>
          <div className='w-full flex justify-center items-center'>
            <Tabs
              selectedKey={selected}
              onSelectionChange={(key) => {
                localStorage.setItem("group-menu", key);
                setSelected(key);
              }}
              size='md'
              radius='full'
              aria-label='Tabs sizes'
            >
              {tabs.map((tab) => (
                <Tab title={tab.title} key={tab.key} />
              ))}
            </Tabs>
          </div>
        </div>
        <div className='bg-white/30 dark:bg-neutral-900 rounded-3xl p-8 w-full'>
          {selected === "profile" ? (
            <ProfileMainPage user={user} />
          ) : selected === "documents" ? (
            <ProfileDocumentPage user={user} />
          ) : selected === "settings" ? (
            <ProfileSettingsPage user={user} />
          ) : null}
        </div>
      </div>
    )
  );
};

export default ProfilePage;
