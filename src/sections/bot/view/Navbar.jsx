/* eslint-disable react/button-has-type */
import React from 'react'

export const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
      
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <div className="navbar-nav me-auto">

            <button className="btn btn-outline-secondary my-2 my-sm-0" >Create Bot</button>
          </div>
        </div>
      </div>
    </nav>
  )