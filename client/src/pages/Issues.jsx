import React from 'react'
import PageHeader from '../components/PageHeader'
import styles from '../css/Issue.module.css'
import { useEffect, useState } from 'react'
import { getIssues } from '../api/issues'
import IssueItem from '../components/IssueItem'
import { Pagination } from 'antd'
function Issues(props) {
  const [issues, setIssues] = useState([])
  // 页码
  const [pageInfo, setPageInfo] = useState({
    currentPage: '1',
    pageSize: 10,
  })
  // 问答总数
  const [total, setTotal] = useState(0)

  useEffect(() => {
    async function fetchData() {
      const { data } = await getIssues({
        page: pageInfo.currentPage,
        pageSize: pageInfo.pageSize,
        issueStatus: true,
      })
      console.log('🐤 ≂ data:', data)
      setIssues(data.data)
      setTotal(data.total)
    }
    fetchData()
  }, [pageInfo.currentPage, pageInfo.pageSize])

  let IssueItemList = []
  issues.forEach((item) => {
    IssueItemList.push(<IssueItem key={item._id} issueInfo={item} />)
  })

  // const onShowSizeChange = (current, pageSize) => {
  //   console.log(current, pageSize)
  //   setPageInfo({
  //     currentPage: current,
  //     pageSize: pageSize,
  //     issueStatus: true,
  //   })
  // }

  const onChange = (current, pageSize) => {
    console.log('~ onChange', current, pageSize)
    if (current !== pageInfo.currentPage || pageSize !== pageInfo.pageSize) {
      // setIssues([])
      setPageInfo({
        currentPage: current,
        pageSize: pageSize,
        issueStatus: true,
      })
    }
  }

  return (
    <div className={styles.container}>
      <PageHeader title="问答列表" />
      <div className={styles.issuesContainer}>
        <div className={styles.leftSide}>
          {IssueItemList}
          <div className="paginationContainer">
            <Pagination
              current={pageInfo.currentPage}
              total={total}
              pageSize={pageInfo.pageSize}
              // onShowSizeChange={onChange}
              onChange={onChange}
              showSizeChanger
            />
          </div>
        </div>
        <div className={styles.rightSide}></div>
      </div>
    </div>
  )
}

export default Issues
