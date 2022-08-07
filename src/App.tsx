import { Button, Card, Select, Table } from "antd";
import Search from "antd/lib/input/Search";
import { ColumnsType, TableProps } from "antd/lib/table";
import "./App.css";
const { Option } = Select;

interface RandomUser {
  key: React.Key;
  username: string;
  name: string;
  email: string;
  gender: string;
  registered: string;
}

enum Gender {
  female = "Female",
  male = "Male",
}

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

const data = [
  {
    key: 1,
    username: "faye.valentine",
    name: "Faye Valentine",
    email: "faye.valentine@bebop.io",
    gender: Gender.female,
    registered: "17-07-2005 21:00",
  },
];

function App() {
  const onChange: TableProps<RandomUser>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const onSearch = (value: string) => console.log(value);

  const onGenderSelect = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onResetFilter = () => {
    console.log("reset");
  };

  return (
    <div className="wrapper">
      <Card title="Random User" bordered={false} style={{ width: 1000 }}>
        <div className="action-wrapper">
          <div>
            <label>Search</label>
            <Search placeholder="Search" onSearch={onSearch} enterButton />
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
              defaultValue="all"
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
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </Card>
    </div>
  );
}

export default App;
