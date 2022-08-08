import { TableProps } from "antd";
import { useEffect, useState } from "react";
import { fetchRandomUser, FetchRandomUserProps } from "./api";
import { RandomUser } from "./types";

const PAGE_SIZE = 5;
const DATA_TOTAL = 50;

const randomUser = fetchRandomUser({ pageSize: PAGE_SIZE });

const useApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<RandomUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [gender, setGender] = useState("all");
  const [sortBy, setSortBy] = useState();
  const [sortOrder, setSortOrder] = useState();

  const mapRandomUser = (randomUsers: []) => {
    return randomUsers.map((randomUser: any, i) => ({
      key: randomUser.id.name + randomUser.id.value + i,
      name: `${randomUser.name.title} ${randomUser.name.first} ${randomUser.name.last}`,
      email: randomUser.email,
      gender: randomUser.gender,
      username: randomUser.name.first + randomUser.id.name,
      registered: randomUser.registered.date,
    }));
  };

  useEffect(() => {
    randomUser.then(({ data: randomUsers }) => {
      setData(mapRandomUser(randomUsers));
      setIsLoading(false);
    });
  }, []);

  const onPaginationAndSortChange: TableProps<RandomUser>["onChange"] = async (
    pagination,
    filter,
    sorter,
    extra
  ) => {
    let newPrams: FetchRandomUserProps = {
      pageSize: PAGE_SIZE,
      option: { keyword, gender },
    };
    if (pagination.current) {
      newPrams.page = pagination.current;
      setCurrentPage(pagination.current);
    }

    //@ts-ignore
    const { field, order } = sorter;
    if (field && order) {
      newPrams.option = {
        ...newPrams.option,
        sortBy: field,
        sortOrder: order,
      };
      setSortBy(field);
      setSortOrder(order);
    }

    console.log(newPrams);
    const { data: newRandomuser } = await fetchRandomUser(newPrams);
    setData(mapRandomUser(newRandomuser));
  };

  const onSearch = async (keyword: string) => {
    const { data: newRandomuser } = await fetchRandomUser({
      pageSize: PAGE_SIZE,
      page: currentPage,
      option: { keyword, gender, sortBy, sortOrder },
    });
    setData(mapRandomUser(newRandomuser));
    setKeyword(keyword);
  };

  const onGenderSelect = async (gender: string) => {
    const { data: newRandomuser } = await fetchRandomUser({
      pageSize: PAGE_SIZE,
      page: currentPage,
      option: { keyword, gender, sortBy, sortOrder },
    });
    setData(mapRandomUser(newRandomuser));
    setGender(gender);
  };

  const onResetFilter = async () => {
    const { data: newRandomuser } = await fetchRandomUser({
      pageSize: PAGE_SIZE,
      page: currentPage,
    });
    setData(mapRandomUser(newRandomuser));

    setKeyword("");
    setGender("all");
    setSortOrder(undefined);
    setSortBy(undefined);
  };

  return {
    PAGE_SIZE,
    DATA_TOTAL,
    data,
    isLoading,
    gender,
    keyword,
    onResetFilter,
    onGenderSelect,
    onPaginationAndSortChange,
    onSearch,
    setKeyword,
  };
};

export default useApp;
