import { Button, Card, Select, Skeleton, Table } from "antd";
import Search from "antd/lib/input/Search";
const { Option } = Select;
import { ColumnsType } from "antd/lib/table";
import { Gender, RandomUser } from "./types";
import useApp from "./useApp";
import "./App.css";

const columns: ColumnsType<RandomUser> = [
  {
    title: "Username",
    dataIndex: "username",
    sorter: (a, b) => a.username.length - b.username.length,
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => a.email.length - b.email.length,
  },
  {
    title: "Gender",
    dataIndex: "gender",
    sorter: (a, b) => a.gender.length - b.gender.length,
  },
  {
    title: "Registered Date",
    dataIndex: "registered",
    sorter: (a, b) => a.registered.length - b.registered.length,
  },
];

function App() {
  const {
    keyword,
    setKeyword,
    onSearch,
    gender,
    onGenderSelect,
    onResetFilter,
    isLoading,
    data,
    onPaginationAndSortChange,
    DATA_TOTAL,
    PAGE_SIZE,
  } = useApp();

  return (
    <div className="wrapper">
      <Card title="Random User" bordered={false} style={{ width: 1000 }}>
        <div className="action-wrapper">
          <div>
            <label>Search</label>
            <Search
              placeholder="Search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onSearch={onSearch}
              enterButton
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "0 10px",
            }}
          >
            <label>Gender</label>
            <Select
              value={gender}
              style={{ width: 120 }}
              onChange={onGenderSelect}
            >
              <Option value="all">All</Option>
              <Option value={Gender.female}>Female</Option>
              <Option value={Gender.male}>Male</Option>
            </Select>
          </div>
          <Button type="primary" onClick={onResetFilter}>
            Reset Filter
          </Button>
        </div>
        {isLoading && <Skeleton />}
        {!isLoading && (
          <Table
            columns={columns}
            dataSource={data}
            onChange={onPaginationAndSortChange}
            pagination={{ total: DATA_TOTAL, pageSize: PAGE_SIZE }}
          />
        )}
      </Card>
    </div>
  );
}

export default App;
