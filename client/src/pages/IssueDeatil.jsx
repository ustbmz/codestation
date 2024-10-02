import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getIssueById } from '../api/issues'
import styles from '../css/IssueDetail.module.css'
import PageHeader from '../components/PageHeader'
import Recommend from '../components/Recommend'
import ScoreRank from '../components/ScoreRank'
import Discuss from '../components/Discuss'

import { formatDate } from '../utils/index'

function IssueDeatil(props) {
  const { id } = useParams()
  const [issueInfo, setIssueInfo] = useState({})
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    async function fetchData() {
      const { data } = await getIssueById(id)
      setIssueInfo(data.issueInfo)
      setUserInfo(data.userInfo)
    }
    fetchData()
  }, [id])

  const handleCommentSubmit = (comment) => {
    console.log('Submitted comment:', comment);
    // 这里添加提交评论的逻辑
  };

  return (
    <div className={styles.container}>
      <PageHeader title="问答详情" />
      <div className={styles.detailContainer}>
        <div className={styles.leftSide}>
          <div className={styles.question}>
            <h1>{issueInfo.issueTitle}</h1>
            <div className={styles.questioner}>
              <span className={styles.user}>{userInfo.nickname}</span>
              <span>发布于:{formatDate(issueInfo.issueDate)}</span>
            </div>
            <div className={styles.content}>
              <div dangerouslySetInnerHTML={{ __html: issueInfo.issueContent }}></div>
            </div>
          </div>
          
          <div className={styles.discussSection}>
            <Discuss onSubmit={handleCommentSubmit} />
          </div>
        </div>
        <div className={styles.rightSide}>
          <Recommend />
          <ScoreRank />
        </div>
      </div>
    </div>
  )
}

export default IssueDeatil
