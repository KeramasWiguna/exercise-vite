import axios from "axios";

enum SortOrder {
  ASC = "ascend",
  DESC = "descend",
}
export interface FetchRandomUserProps {
  pageSize: number;
  page?: number;
  option?: FetchRandomUserOption;
}
interface FetchRandomUserOption {
  gender?: string;
  keyword?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
}

async function fetchRandomUser({
  pageSize = 10,
  page = 1,
  option,
}: FetchRandomUserProps) {
  let optionQuery = "";

  if (option) {
    const { keyword, gender, sortBy, sortOrder } = option;
    if (keyword && keyword != "") optionQuery += "&keyword=" + keyword;
    if (gender && ["female", "male"].includes(gender))
      optionQuery += "&gender=" + gender;
    if (!!sortBy && !!sortOrder)
      optionQuery += `&sortBy=${sortBy}&sortOrder=${sortOrder}`;
  }

  const URL = `https://randomuser.me/api?page=${page}&pageSize=${pageSize}&results=${pageSize}${optionQuery}`;
  const { data } = await axios(URL);
  return { url: URL, data: data.results };
}

export { fetchRandomUser };
