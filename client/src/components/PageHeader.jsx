import React, { useEffect, useState } from 'react'
import styles from '../css/PageHeader.module.css'
import { useSelector } from 'react-redux'
import { Tag } from 'antd'
import { getTypeList } from '../redux/typeSlice'
import { useDispatch } from 'react-redux'
function PageHeader(props) {
  

  return (
    <div className={styles.row}>
      <div className={styles.pageHeader}>{props.title}</div>
      <div>{props.children}</div>
    </div>
  )
}

export default PageHeader
