import Pusher from "pusher-js";
import { reInitMenu } from "../helpers";
import { PageDataProvider } from "./core";
import { useEffect, useState } from "react";
import { Sidebar } from "./components/sidebar";
import { HeaderWrapper } from "./components/header";
import { ScrollTop } from "./components/scroll-top";
import { Outlet, useLocation } from "react-router-dom";
import ModalLeaderOfDay from "./components/modal-leader-of-day/ModalLeaderOfDay";
import ModalSoldProduct from "./components/modal-sold-product/ModalSoldProduct";

const PUSHER_CONFIG = {
  key: "5f6af777fb861b57a1b6",
  cluster: "ap2",
};

type SoldProductType = {
  data: {
    message: string;
    full_name: string;
  };
  team_id: number;
};

type LeaderOfDayType = {
  team_id: number;
  data: Array<{
    full_name: string;
    progress: number;
    deal_count: number;
    total_price: number;
  }>;
};

const notificationSound = new Audio("/Project 1.mp3");
const notificationSound2 = new Audio("/Project 2.mp3");

const MasterLayout = () => {
  const location = useLocation();
  useEffect(() => {
    reInitMenu();
  }, [location.key]);

  const [showLeaderOfDay, setShowLeadOffDay] = useState<boolean>(false);
  const [showModalSoldProduct, setShowModalSoldProduct] =
    useState<boolean>(false);

  const [soldProduct, setSoldProduct] = useState<SoldProductType | null>(null);
  const [leaderOfDay, setLeaderOfDay] = useState<LeaderOfDayType | null>(null);

  useEffect(() => {
    try {
      const pusher = new Pusher(PUSHER_CONFIG.key, {
        cluster: PUSHER_CONFIG.cluster,
        forceTLS: true,
      });

      const channel = pusher.subscribe("chat");

      channel.bind("PublicEventOnLeaderOfDay", (data: LeaderOfDayType) => {
        if (data?.team_id) {
          setLeaderOfDay(data);
          setShowLeadOffDay(true);
          notificationSound2
            .play()
            .catch((err) =>
              console.error("Ошибка при воспроизведении звука:", err)
            );
        }
      });

      channel.bind("PublicEventOnSoldProduct", (data: SoldProductType) => {
        if (data?.team_id) {
          setSoldProduct(data);
          setShowModalSoldProduct(true);
          notificationSound
            .play()
            .catch((err) =>
              console.error("Ошибка при воспроизведении звука:", err)
            );
        }
      });

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
        pusher.disconnect();
      };
    } catch (error) {
      console.error("❌ Ошибка при подключении к Pusher:", error);
    }
  }, []);

  return (
    <PageDataProvider>
      <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
        <div
          className="app-page flex-column flex-column-fluid"
          id="kt_app_page"
        >
          <HeaderWrapper />
          <div
            className="app-wrapper flex-column flex-row-fluid"
            id="kt_app_wrapper"
          >
            <Sidebar />
            <div
              className="app-main flex-column flex-row-fluid"
              id="kt_app_main"
            >
              <div className="d-flex flex-column flex-column-fluid">
                <Outlet />
              </div>
            </div>
          </div>
        </div>

        <ModalLeaderOfDay
          data={leaderOfDay}
          show={showLeaderOfDay}
          onHide={() => setShowLeadOffDay(false)}
        />

        <ModalSoldProduct
          name={soldProduct?.data?.full_name}
          show={showModalSoldProduct}
          onHide={() => {
            setShowModalSoldProduct(false);
            setSoldProduct(null);
          }}
        />
      </div>
      <ScrollTop />
    </PageDataProvider>
  );
};

export { MasterLayout };
