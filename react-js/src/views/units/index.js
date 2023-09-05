import TextInputWithLabel from '@src/@core/components/text-input-with-label'
import LButton from '@src/@core/components/button'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import TableWithPagination from '@src/@core/components/table'
import { deleteData, getData } from '@src/utility/fetch'
import { defaultFilter } from './dafault'
import ModalUnits from './modal'

export default function PageUnits() {
  const [filter, setFilter] = useState(defaultFilter)
  const [data, setData] = useState([])
  const [count, setCount] = useState(1)
  const [isFetching, setIsFetching] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [id, setId] = useState(null)

  const onChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value })
  }

  const getAllUnits = async (query) => {
    setIsFetching(true)
    const res = await getData('/v1/cms/units', query)
    setData(res.data.data.contents)
    setCount(res.data.data.totalPages)
    setIsFetching(false)
  }

  useEffect(() => {
    getAllUnits(filter)
  }, [filter.page, filter.size])

  const toggle = (idRow = null) => {
    setIsModal(!isModal)
    setId(idRow)
  }

  const onDelete = async (idRow) => {
    await deleteData(`/v1/cms/units/${idRow}`)
    getAllUnits(filter)
  }

  const RenderCell = (row) => {
    return (
      <>
        <LButton size='sm' color='danger' className='mx-1' onClick={() => onDelete(row.id)}>
          Delete
        </LButton>
        <LButton size='sm' color='primary' onClick={() => toggle(row.id)}>
          Edit
        </LButton>
      </>
    )
  }

  const columns = [
    {
      name: 'Code',
      sortable: false,
      selector: (row) => row.code
    },
    {
      name: 'Name',
      sortable: false,
      selector: (row) => row.name
    },

    {
      name: 'Action',
      cell: (row) => RenderCell(row)
    }
  ]

  return (
    <Card>
      <CardBody>
        <Row className='justify-content-end mb-2'>
          <Col md={4}>
            <TextInputWithLabel
              label='Name'
              value={filter.keyword}
              name='keyword'
              onChange={onChange}
            />
          </Col>
          <Col md={2} className='d-flex align-items-end'>
            <LButton
              onClick={() => {
                getAllUnits(filter)
                setFilter({ ...filter, page: 1 })
              }}
              color='primary'
            >
              Search
            </LButton>
          </Col>
          <Col className='d-flex align-items-end justify-content-end'>
            <LButton onClick={() => toggle()} color='primary'>
              Add
            </LButton>
          </Col>
        </Row>
        <TableWithPagination
          columns={columns}
          dataToRender={data}
          currentPage={filter.page}
          perPage={filter.size}
          handlePagination={(page) => setFilter({ ...filter, page: page.selected + 1 })}
          handlePerPage={(e) => setFilter({ ...filter, size: e.target.value, page: 1 })}
          pageCount={count}
          loading={isFetching}
        />
      </CardBody>
      <ModalUnits
        retryFetch={() => {
          getAllUnits(defaultFilter)
          setFilter(defaultFilter)
        }}
        open={isModal}
        toggle={() => toggle(null)}
        id={id}
      />
    </Card>
  )
}
