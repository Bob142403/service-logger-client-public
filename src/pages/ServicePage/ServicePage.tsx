/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import useGetServices from "../../hooks/api/service/use-get-services";
import EditModal from "../../components/EditModal/EditModal";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import CreateModal from "../../components/CreateModal/CreateModal";
import "./ServicePage.css";

interface ServiceType {
  key: string;
  id: number;
  name: string;
}

function ServicePage() {
  const { data: services } = useGetServices();

  const columns: ColumnsType<ServiceType> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="middle">
            <EditModal name={record.name} id={record.id} />
            <DeleteModal id={record.id} />
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <CreateModal />
      <Table columns={columns} dataSource={services} className="table" />
    </>
  );
}

export default ServicePage;
