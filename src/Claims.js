import React from 'react'
import { css } from '@emotion/css';
import { Link } from 'react-router-dom';

export default function Claims({
  claims = []
}) {
  return (
    <>
      <h1>Claims</h1>
      {
        claims.map(claim => (
          <Link to={`/claim/${claim.id}`} className={linkStyle} key={claim.id}>
            <div key={claim.id} className={claimContainer}>
              <h1 className={claimTitleStyle}>{claim.name}</h1>
              <img alt="claim" className={imageStyle} src={claim.image} />
            </div>
          </Link>
        ))
      }
    </>
  )
}

const claimTitleStyle = css`
  margin: 15px 0px;
  color: #0070f3;
`

const linkStyle = css`
  text-decoration: none;
`

const claimContainer = css`
  border-radius: 10px;
  padding: 1px 20px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  :hover {
    border-color: #0070f3;
  }
`

const imageStyle = css`
  width: 100%;
  max-width: 400px;
`