import { DatePicker, Input, Select, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import Log from "../../types/Log";
import useGetLogs from "../../hooks/api/log/use-get-logs";
import { Tag as Tagg } from "../../utils/Tag";
import "./LogPage.css";
import { socket } from "../../connection/socket";
import { useEffect, useMemo, useState } from "react";
import { queryClient } from "../..";
import useGetServices from "../../hooks/api/service/use-get-services";
import Service from "../../types/Service";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import dayjs from "dayjs";

interface ServiceSelect {
  label: string;
  value: string;
}

const typeSelect = [
  { label: "ERROR", value: "ERROR" },
  { label: "WARNING", value: "WARN" },
  { label: "DEFAULT", value: "default" },
];

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  let color = "default";
  if (value === "ERROR") color = "error";
  if (value === "WARN") color = "warning";
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={color}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

function LogPage() {
  const logs: Log[] = useGetLogs().data;
  const [selectedService, setSelectedService] = useState(0);
  const [description, setDescription] = useState("");
  const [type, setType] = useState(["WARN", "ERROR", "default"]);
  const [date, setDate] = useState("");

  const serviceSelect: ServiceSelect[] = useGetServices().data?.map(
    (service: Service) => ({
      label: service.name,
      value: service.id,
    })
  );

  const logFilters = useMemo(
    () =>
      (logs || []).filter(
        (log) =>
          log.serviceId === selectedService &&
          log.description
            .toLowerCase()
            .includes(description.trim().toLocaleLowerCase()) &&
          type.includes(log.type)
      ),
    [description, logs, selectedService, type]
  );
  useEffect(() => {
    socket.on("update-logs", () => {
      queryClient.invalidateQueries("get-logs");
    });
  });

  /**
   * ICPC semi-finals, quarter-finals (1 place) 2022
   * ISI JUNIOR Silver Medal(Marathon-Tour) 2022, The Best Top 10 Student,
   * Republican Olympiad in Tajikistan in Informatics. (2022 - Gold)(2021 - Gold),(2019-Gold)
   * ILM-Furug 2022 Respiblic - Silver,City - Gold
   * ЕКОШП 2021 Silver Medal, ВКОШП 2021 Third Degree Diploma
   * Participated in Eurasian Olympiad in Informatics, Kazakhstan, Almaty. 2019
   */

  const columns: ColumnsType<Log> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (_, { type }) => (
        <>
          <Tagg type={type} />
        </>
      ),
    },
  ];
  return (
    <>
      <Space wrap>
        <Select
          showSearch
          style={{ minWidth: 120 }}
          options={serviceSelect}
          placeholder="Please select Service"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          onChange={(event) => {
            setSelectedService(event);
          }}
        />
        <Input
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          placeholder="Decription"
        />
        <Select
          mode="multiple"
          showArrow
          defaultValue={["WARN", "ERROR", "default"]}
          style={{ minWidth: 268 }}
          options={typeSelect}
          tagRender={tagRender}
          onChange={(event) => {
            setType(event);
          }}
          placeholder="Please select Type"
        />
        <DatePicker
          defaultValue={dayjs(new Date().toLocaleDateString(), "DD.MM.YYYY")}
          onChange={(event) => {
            setDate(event?.toDate().toLocaleDateString() ?? "");
          }}
          format={"DD.MM.YYYY"}
        />
      </Space>
      <Table
        columns={columns}
        dataSource={logFilters}
        size="small"
        className="table"
      />
    </>
  );
}

export default LogPage;
