import React, { useEffect } from "react";
import PageContainer from "../../components/Container/PageContainer";
import PageHeader from "../../components/Dashboard/PageHeader";
import PageBoard from "../../components/Container/PageBoard";
import Floor from "../../components/Room/Floor";
import Door from "../../components/Room/Door";
import { useDispatch, useSelector } from "react-redux";
import { getAllRooms } from "./roomsSlice";
import { uniqueId } from "lodash";

const RoomsPage = () => {
  const dispatch = useDispatch();
  const { rooms, floors, loading } = useSelector((state) => state.rooms);

  useEffect(() => {
    dispatch(getAllRooms());
  }, []);

  return (
    <PageContainer>
      <PageHeader title='Xonalar' count={rooms?.length} />
      <PageBoard>
        {rooms && (
          <div className='flex flex-col gap-2 w-full h-fit p-3 border-[1px] border-forestydark-100/50 dark:bg-forestydark-800 rounded-xl'>
            {floors.map((i) => (
              <Floor floor={i} key={uniqueId()}>
                {rooms
                  .filter((el) => el.floor === i)
                  .map((door) => (
                    <Door key={uniqueId()} door={door} />
                  ))}
              </Floor>
            ))}

            {/* <Floor floor={3}>
              {doorsThirdFloor.map((door) => (
                <Door door={door} />
              ))}
            </Floor>
            <Floor floor={2}>
              {doorsSecondFloor.map((door) => (
                <Door door={door} />
              ))}
            </Floor>
            <Floor floor={1}>
              {doorsFirstFloor.map((door) => (
                <Door door={door} />
              ))}
            </Floor> */}
          </div>
        )}
      </PageBoard>
    </PageContainer>
  );
};

export default RoomsPage;
