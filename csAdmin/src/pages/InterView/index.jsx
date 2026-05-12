import { delInterView, getInterViewList } from '@/services/InterviewController';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Button, Popconfirm, message, Modal } from 'antd';
import { useRef, useState, useMemo, useCallback } from 'react';

function InterView(props) {
  const intl = useIntl();
  const tableRef = useRef();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  function handleChangePage(current, pageSize) {
    setPagination({ current, pageSize });
  }

  const deleteInterview = useCallback(
    async (row) => {
      await delInterView(row._id);
      message.success(intl.formatMessage({ id: 'common.successDelete' }));
      tableRef.current.reload();
    },
    [intl],
  );

  const showDetail = useCallback(
    (row) => {
      Modal.info({
        title: intl.formatMessage({ id: 'interview.detailTitle' }),
        width: 640,
        content: (
          <div>
            <p>
              <strong>{row.typeName}</strong>
            </p>
            <p>{row.interviewTitle}</p>
          </div>
        ),
      });
    },
    [intl],
  );

  const showModal = useCallback(() => {
    message.info(intl.formatMessage({ id: 'interview.editTodo' }));
  }, [intl]);

  const columns = useMemo(
    () => [
      {
        title: intl.formatMessage({ id: 'interview.col.index' }),
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
        title: intl.formatMessage({ id: 'interview.col.type' }),
        dataIndex: 'typeName',
        key: 'typeName',
        algin: 'center',
      },
      {
        title: intl.formatMessage({ id: 'interview.col.title' }),
        dataIndex: 'interviewTitle',
        key: 'interviewTitle',
        align: 'center',
      },

      {
        title: intl.formatMessage({ id: 'interview.col.actions' }),
        dataIndex: 'options',
        align: 'center',
        search: false,
        render: (_, row) => {
          return (
            <div key={row._id}>
              <Button
                type="link"
                size="small"
                onClick={() => showDetail(row)}
              >
                {intl.formatMessage({ id: 'common.detail' })}
              </Button>
              <Button type="link" size="small" onClick={() => showModal(row)}>
                {intl.formatMessage({ id: 'common.edit' })}
              </Button>
              <Popconfirm
                title={intl.formatMessage({ id: 'common.deleteConfirm' })}
                description={intl.formatMessage({
                  id: 'common.deleteInterviewDesc',
                })}
                onConfirm={() => {
                  deleteInterview(row);
                }}
                okText={intl.formatMessage({ id: 'common.confirm' })}
                cancelText={intl.formatMessage({ id: 'common.cancel' })}
              >
                <Button type="link" size="small" disabled={false}>
                  {intl.formatMessage({ id: 'common.delete' })}
                </Button>
              </Popconfirm>
            </div>
          );
        },
      },
    ],
    [intl, pagination, showDetail, showModal, deleteInterview],
  );

  return (
    <PageContainer title={intl.formatMessage({ id: 'menu.interview.list' })}>
      <ProTable
        actionRef={tableRef}
        headerTitle={intl.formatMessage({ id: 'interview.listTitle' })}
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
          const result = await getInterViewList(params);
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
