import { useState, useEffect } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'

import { useGetNewsQuery } from '../services/cryptoNewsApi'
import { useGetCoinsQuery } from '../services/cryptoCoinsApi'

const { Text, Title } = Typography
const { Option } = Select
const demoImage =
  'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg'

const News = ({ simplified }) => {
  const [simpleData, setSimpleData] = useState([])
  const [newsCategory, setNewsCatetory] = useState('Cryptocurrency')
  // if simplified true set simple data only 3 data cause the API can't set limit  data
  const count = simplified ? 3 : 10
  const { data: newsData, isFetching } = useGetNewsQuery(newsCategory)
  const { data } = useGetCoinsQuery(7)

  useEffect(() => {
    setSimpleData(newsData?.value.slice(0, 3))
  }, [newsData])

  if (!newsData?.value) return 'Loading ....'

  // tempNewsData equal simpleData or newsData
  const tempNewsData = count > 3 ? newsData?.value : simpleData

  return (
    <>
      {!simplified && (
        <Col span={12}>
          <Select
            showSearch
            className='select-news'
            placeholder='Select a Crypto'
            optionFilterProp='children'
            defaultValue='Cryptocurrency'
            onChange={(value) => setNewsCatetory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            <Option value='Cryptocurrency'>Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => (
              <Option value={coin.name} key={coin.symbol}>
                {coin.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      <br />
      <Row gutter={[24, 24]}>
        {tempNewsData?.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className='news-card'>
              <a href={news.url} target='_blank' rel='noreferrer'>
                <div className='news-image-container'>
                  <Title className='news-title' level={4}>
                    {news.name}
                  </Title>
                  <img
                    style={{ maxWidh: '200px', maxHeight: '100px' }}
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt='news'
                  />
                </div>
                <p>
                  {news.description > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>
                <div className='provider-container'>
                  <Avatar
                    src={news.provider[0]?.image?.thumbnail?.contentUrl}
                    alt='news'
                  />
                  <Text>
                    {moment(news.datePublished).startOf('ss').fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default News
