import React from 'react'
import "./rowTable.scss"

const RowTable = ({ items }) => {
  
  return (
    <tbody>
    {
      items?.map((el, i)=>{
        return (
          <tr key={i} className="item">
          <td>{el.fecha}</td>
          <td>{el.rating}%</td>
          <td  >
            <p className={parseInt(el.rating) < 40 ? "status-negative" : parseInt(el.rating) >= 40 && parseInt(el.rating) < 70 ? "status-medium" : "status-positive" }>{el.indice}</p>
          </td>
          <td className='center-text'>{el.emotions}</td>
        </tr>
        )
      })
    }
  </tbody>
  )
}

export default RowTable