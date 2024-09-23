import React from 'react'
import PageHeader from '../components/PageHeader'
import styles from '../css/Issue.module.css'
import { useEffect, useState } from 'react'
import { getIssues } from '../api/issues'
import IssueItem from '../components/IssueItem'
function Issues(props) {
  const [issues, setIssues] = useState([])
  const [pageSize, setCurrentPage] = useState({
    currentPage: '1',
    pageSize: 10,
    total: 0,
  })

  useEffect(() => {
    async function fetchData() {
      const { data, currentPage, total } = await getIssues({
        page: pageSize.currentPage,
        pageSize: pageSize.pageSize,
        issueStatus: true,
      })
      setIssues(data.data)
    }
    fetchData()
  }, [pageSize.currentPage])
  
  let IssueItemList = []
  issues.forEach((item) => {
    IssueItemList.push(<IssueItem key={item._id} issueInfo={item} />)
  })

  return (
    <div className={styles.container}>
      <PageHeader title="问答列表" />
      <div className={styles.issuesContainer}>
        <div className={styles.leftSide}>{IssueItemList}</div>
        <div className={styles.rightSide}></div>
      </div>
    </div>
  )
}

export default Issues
