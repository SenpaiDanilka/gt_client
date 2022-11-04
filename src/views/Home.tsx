import { NetworkStatus } from '@apollo/client';
import {useLoading} from "../contexts/LoadingContext";
import {useEffect} from "react";
import {useGetItemsQuery} from "../generated/apollo-functions";
import {Link} from "react-router-dom";
import BaseAvatar from "../components/BaseComponents/BaseAvatar";
import {useTranslation} from "react-i18next";
import useGetCurrentBreakpoint from "../hooks/useGetCurrentBreakpoint";

const Home = () => {
  const {t} = useTranslation(['common', 'items']);
  const { isMobileBreakpoint } = useGetCurrentBreakpoint();
  const userId = localStorage.getItem("userId");
  const {data: getItemsData, loading: getItemsLoading, networkStatus} = useGetItemsQuery({
    variables: {
      user_id: userId!
    },
    fetchPolicy: 'cache-and-network'
  });
  const { setLoading } = useLoading();

  const items = getItemsData?.getItems || [];

  useEffect(() => {
    setLoading(networkStatus === NetworkStatus.refetch || getItemsLoading)
  }, [networkStatus, getItemsLoading]);

  const columns = ['name', 'category', 'owner', 'status'];

  return (
    <div className="p-4">
      <div className="hidden md:grid grid-cols-4 gap-x-3 mb-2.5">
        {
          columns.map((column) => (
            <span key={column} className="text-mgb dark:text-gb">
              {t(`itemsTable.${column}`, { ns: 'items' })}
            </span>
          ))
        }
      </div>
      {
        items && items.map((item) => (
          <div
            key={item!._id}
            className="relative hover:bg-br-stroke dark:hover:bg-mgb text-base text-dgb dark:text-gb"
          >
            {
              isMobileBreakpoint ? (
                <Link
                  to={`/items/${item!._id}`}
                  key={item!._id}
                  className="flex border-b border-light-bg dark:border-br-dark p-2"
                >
                  <BaseAvatar
                    alt={item!.name}
                    size={100}
                    variant="square"
                    className="mr-5"
                  />
                  <div className="space-y-3">
                    <div>{item!.name}</div>
                    <div>{t(`itemTypes.${item!.type}`, { ns: 'items' })}</div>
                    <div>{item!.owner.name}</div>
                    <div>status</div>
                  </div>
                </Link>
              ) : (
                <Link
                  to={`/items/${item!._id}`}
                  key={item!._id}
                  className="grid grid-cols-4 gap-x-3 items-center border-b border-light-bg dark:border-br-dark py-2"
                >
                  <div className="flex items-center">
                    <BaseAvatar
                      alt={item!.name}
                      size={20}
                      variant="square"
                      className="mr-3 self-start"
                    />
                    <span className="whitespace-normal truncate">{item!.name}</span>
                  </div>
                  <div>{t(`itemTypes.${item!.type}`, { ns: 'items' })}</div>
                  <div>{item!.owner.name}</div>
                  <div>status</div>
                </Link>
              )
            }
          </div>
        ))
      }
    </div>
  );
}

export default Home