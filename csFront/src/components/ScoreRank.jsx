import React, { useEffect, useState } from 'react'
import { getPointsrank } from '../api/user'
import { Card } from 'antd'
import RankItem from './RankItem'
function ScoreRank(props) {
  const [users, setUsers] = useState([])
  useEffect(() => {
    async function fetchUser() {
      const { data } = await getPointsrank()
      setUsers(data)
    }
    fetchUser()
  }, [])

  let rankList = []
  users.forEach((item,index) => {
    rankList.push(<RankItem key={item._id} rank={index} rankInfo={item} />)
  })
  return <Card title="积分排行">{rankList}</Card>
}

export default ScoreRank
