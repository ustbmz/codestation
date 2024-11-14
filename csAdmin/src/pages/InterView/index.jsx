import { delInterView, getInterViewList } from '@/services/InterviewController';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Popconfirm, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
function InterView(props) {
  const tableRef = useRef();
  const [interviewlist, setInterviewlist] = useState([]);
  // const { typeList } = useSelector((state) => state.type);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!typeList?.length) {
  //     dispatch({
  //       type: 'type/_initTypeList',
  //     });
  //   }
  //   async function fetchData() {
  //     const { data } = await getInterViewList();
  //     const resultArray = data.flat().filter((item) => item !== undefined);
  //     console.log(
  //       '🦊 > file: index.jsx:22 > fetchData > resultArray:',
  //       resultArray,
  //     );
  //     setInterviewlist(resultArray);
  //   }
  //   fetchData();
  // }, []);

  function handleChangePage(current, pageSize) {
    setPagination({ current, pageSize });
  }

  const deleteInterview = async (row) => {
    const res = await delInterView(row._id);
    message.success('删除成功');
    tableRef.current.reload();
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      search: false,
      render: (_, row, index) => {
        return (
          pagination.current * pagination.pageSize -
          pagination.pageSize +
          index +
          1
        );
      },
    },
    {
      title: '面试题类型',
      dataIndex: 'typeName',
      key: 'typeName',
      algin: 'center',
    },
    {
      title: '面试题题目',
      dataIndex: 'interviewTitle',
      key: 'interviewTitle',
      align: 'center',
    },

    {
      title: '操作',
      dataIndex: 'options',
      align: 'center',
      search: false,
      render: (_, row) => {
        return (
          <div key={row._id}>
            <Button
              type="link"
              size="small"
              onClick={() => {
                showDetail(row);
              }}
            >
              详情
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                showModal(row);
              }}
            >
              编辑
            </Button>
            <Popconfirm
              title="是否确认删除"
              description="Are you sure to delete?"
              onConfirm={() => {
                deleteInterview(row);
              }}
              okText="确认"
              cancelText="取消"
            >
              <Button type="link" size="small" disabled={false}>
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <PageContainer>
      <ProTable
        actionRef={tableRef}
        headerTitle="面试题库列表"
        rowKey={(row) => row._id}
        columns={columns}
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 15, 20],
          ...pagination,
          onChange: handleChangePage,
        }}
        request={async (params) => {
          console.log(params, 'request params');
          const result = await getInterViewList(params);
          console.log('🦊 > file: index.jsx:134 > request={ > result:', result);
          return {
            data: result.data,
            total: result.total,
            success: !result.code,
          };
        }}
      ></ProTable>
    </PageContainer>
  );
}

export default InterView;
