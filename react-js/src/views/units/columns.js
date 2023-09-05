import LButton from '@src/@core/components/button'
import { useState } from 'react'
import ModalUnits from './modal'

const RenderCell = (row) => {
  const [isModal, setIsModal] = useState(false)
  const [id, setId] = useState(null)

  const handleEdit = (idRow) => {
    setIsModal(!isModal)
    setId(idRow)
  }

  return (
    <>
      <LButton size='sm' color='danger' className='mx-1' onClick={() => handleEdit(row.id)}>
        Delete
      </LButton>
      <LButton size='sm' color='primary' onClick={() => handleEdit(row.id)}>
        Edit
      </LButton>
      <ModalUnits
        retryFetch={() => {
          getAllUnits(defaultFilter)
          setFilter(defaultFilter)
        }}
        open={isModal}
        toggle={toggle}
      />
    </>
  )
}

export const columns = [
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
