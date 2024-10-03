import React, { useState, useEffect } from 'react'
import PageHeader from '../components/PageHeader'
import styles from '../css/Issue.module.css'
import Recommend from '../components/Recommend'
import ScoreRank from '../components/ScoreRank'
import { Pagination, Button } from 'antd'
import IssueItem from '../components/IssueItem'
import { useLocation } from 'react-router-dom'
import { getIssues } from '../api/issues'

function SearchPage(props) {
  const location = useLocation()
  const { partialName } = location.state
  const [pageInfo, setPageInfo] = useState({
    currentPage: '1',
    pageSize: 10,
    total: 10,
  })

  useEffect(() => {
    async function fetchData() {
      const { data } = await getIssues({
        partialName,
      })
      console.log('🐤 ≂ data:', data)
      setIssues(data.data)
    }
    fetchData()
  },[])

  const [issues, setIssues] = useState([])

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

  let IssueItemList = []
  issues.forEach((item) => {
    IssueItemList.push(<IssueItem key={item._id} issueInfo={item} />)
  })

  return (
    <div className={styles.container}>
      <PageHeader title="搜索列表"></PageHeader>
      <div className={styles.issueContainer}>
        <div className={styles.leftSide}>
          {IssueItemList}
          {issues.length === 0 ? (
            <div className={styles.noIssue}>暂无相关问答</div>
          ) : (
            <div className="paginationContainer">
              <Pagination
                current={pageInfo.currentPage}
                total={pageInfo.total}
                pageSize={pageInfo.pageSize}
                // onShowSizeChange={onChange}
                onChange={onChange}
                showSizeChanger
              />
            </div>
          )}
        </div>
        <div className={styles.rightSide}>
          <Recommend />
          <ScoreRank />
        </div>
      </div>
    </div>
  )
}

export default SearchPage
