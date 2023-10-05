import React from 'react'
import background404 from "../assets/backgrounds/404.png"
import { useNavigate } from 'react-router'


const Page404 = () => {
  const navigate = useNavigate()
  return (
    <div style={{background: `url(${background404}) center / cover no-repeat`, width: "100%", height: "100vh", marginTop: 20, position: "relative", display: "flex", alignItems: "flex-end"}}>
      <div style={{height: "16%", display: "flex", alignItems: "flex-start", justifyContent: "center", width: "100%"}}>
        <button onClick={()=> navigate("/metrics")}>Volver al inicio</button>
      </div>
    </div>
  )
}

export default Page404