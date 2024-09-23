import React from 'react'
import PageHeader from '../components/PageHeader'
import styles from '../css/Issue.module.css'
import { useEffect, useState } from 'react'
import { getIssues } from '../api/issues'
function Issues (props) {
  useEffect(() => {
    console.log(props)
    getIssues().then(res => {
      console.log(res)
    })
  }, [])
  return (
    <div className={styles.container}>
      <PageHeader title="问答列表" />
      <div className={styles.issuesContainer}>
        <div className={styles.leftSide}></div>
        <div className={styles.rightSide }></div>
      </div>
    </div>
  )
}

export default Issues
