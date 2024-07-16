"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { formatUnits } from "@ethersproject/units";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Button,
  Input,
  message,
  Space,
  Table,
  Avatar,
  Breadcrumb,
  Tag
} from "antd";
import { SyncOutlined, ExportOutlined } from "@ant-design/icons";
import { graphqlClient as client } from "@/app/utils";
import { explorerUrl, supportedTokens } from "@/app/utils/constants";
import { USER_QUERY } from "@/app/utils/graphqlQueries";

dayjs.extend(relativeTime);

const tokenTransferColumns = [
  {
    title: "Transaction ID",
    key: "txHash",
    ellipsis: true,
    width: "5%",
    render: ({ txHash }) => (
      <Space>
        {txHash.slice(0, 15) + "..." + txHash.slice(-5)}
        <a
          href={`${explorerUrl}/tx/${txHash}`}
          target="_blank"
          rel="noreferrer"
        >
          <ExportOutlined
            title="View on Explorer"
            style={{ fontSize: "1rem" }}
          />
        </a>
      </Space>
    )
  },
  {
    title: "Age",
    key: "timestamp",
    width: "4%",
    sorter: (a, b) => a.timestamp - b.timestamp,
    render: ({ timestamp }) => dayjs(timestamp * 1000).fromNow(true)
  },
  {
    title: "From",
    key: "from",
    ellipsis: true,
    width: "7%",
    sorter: (a, b) => a?.from?.id?.localeCompare(b?.from?.id),
    render: ({ from }) => <Link href={`/address/${from.id}`}>{from.id}</Link>
  },
  {
    title: "To",
    key: "to",
    ellipsis: true,
    width: "7%",
    sorter: (a, b) => a?.to?.id?.localeCompare(b?.to?.id),
    render: ({ to }) => <Link href={`/address/${to.id}`}>{to.id}</Link>
  },
  {
    title: "Amount",
    key: "value",
    width: "5%",
    sorter: (a, b) => a.value - b.value,
    render: ({ value, token }) => {
      const tokenData = supportedTokens.find(
        (oneToken) => oneToken.address === token
      ) || {
        icon: "",
        symbol: "Unknown",
        decimals: 18
      };
      return (
        <>
          <Tag color="green" bordered={false}>
            IN
          </Tag>
          <Avatar shape="circle" size="small" src={tokenData.icon} />
          <a
            href={`${explorerUrl}/token/${token}`}
            target="_blank"
            rel="noreferrer"
            style={{ marginLeft: 10 }}
          >
            {formatUnits(value, tokenData.decimals).replace(
              /(\.\d{3}).*/,
              "$1"
            ) +
              " " +
              tokenData.symbol}
          </a>
        </>
      );
    }
  }
];

export default function Address({ params: { id } }) {
  const [dataLoading, setDataLoading] = useState(false);
  const [tokenTransfers, setTokenTransfers] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");

  const getUserTokenTransfers = async () => {
    setDataLoading(true);
    client
      .request(USER_QUERY, {
        id,
        transfersIn_skip: 0,
        transfersIn_first: 10,
        transfersIn_orderBy: "timestamp",
        transfersIn_orderDirection: "desc",
        transfersIn_where: {
          ...(searchQuery && {
            or: [
              { from_contains_nocase: searchQuery },
              { to_contains_nocase: searchQuery },
              { token_contains_nocase: searchQuery },
              { txHash_contains_nocase: searchQuery }
            ]
          })
        }
      })
      .then((data) => {
        setTokenTransfers(data?.user?.transfersIn || []);
        setDataLoading(false);
      })
      .catch((err) => {
        message.error("Something went wrong!");
        console.error("failed to get transfers: ", err);
        setDataLoading(false);
      });
  };

  useEffect(() => {
    getUserTokenTransfers();
  }, []);

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Address</h3>
      <Breadcrumb
        items={[
          {
            title: <Link href="/">Home</Link>
          },
          {
            title: "Address"
          },
          {
            title: <Link href={`/address/${id}`}>{id}</Link>
          }
        ]}
      />
      <Space>
        <Input.Search
          placeholder="Search by address, token or transaction hash"
          value={searchQuery}
          enterButton
          allowClear
          onSearch={getUserTokenTransfers}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "") {
              router.replace(`/address/${id}`);
            } else {
              router.replace(`?q=${encodeURIComponent(e.target.value)}`, {
                scroll: false
              });
            }
          }}
        />
        <Button type="primary" onClick={getUserTokenTransfers}>
          <SyncOutlined spin={dataLoading} />
        </Button>
      </Space>
      <Table
        className="table_grid"
        columns={tokenTransferColumns}
        rowKey="id"
        dataSource={tokenTransfers}
        scroll={{ x: 970 }}
        loading={dataLoading}
        pagination={{
          pageSizeOptions: [10, 25, 50, 100],
          showSizeChanger: true,
          defaultCurrent: 1,
          defaultPageSize: 10,
          size: "small"
        }}
        onChange={() => {}}
      />
    </div>
  );
}
