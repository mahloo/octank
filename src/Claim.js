import React, { useState, useEffect } from 'react'
import { css } from '@emotion/css';
import { useParams } from 'react-router-dom';
import { API, Storage } from 'aws-amplify';
import { getClaim } from './graphql/queries';
import { createClaim } from './graphql/mutations';

export default function Claim() {
  const [loading, updateLoading] = useState(true);
  const [claim, updateClaim] = useState(null);
  const { id } = useParams()
  useEffect(() => {
    fetchClaim()
  }, [])
  async function fetchClaim() {
    try {
      //const claimInfo = {name, description, date,  oneCar, driver2, image: formState.image.name, id: claimId };  
      const claimData = await API.graphql({
        query: getClaim, variables: { id }
        //mutation: createClaim,
        //authMode: 'AMAZON_COGNITO_USER_POOLS',
        //variables: {
        //  input: claimInfo
        //}
      });
      const currentClaim = claimData.data.getClaim
      const image = await Storage.get(currentClaim.image);

      currentClaim.image = image;
      updateClaim(currentClaim);
      updateLoading(false);
    } catch (err) {
      console.log('error: ', err)
    }
  }
  if (loading) return <h3>Loading...</h3>
  console.log('claim: ', claim)
  return (
    <>
      <h1 className={titleStyle}>{claim.name}</h1>
      <h3 className={titleStyle}>{claim.date}</h3>
      <h3 className={titleStyle}>{claim.oneCar}</h3>
      <h3 className={titleStyle}>{claim.driver2}</h3>
      <p>{claim.description}</p>
      <img alt="claim" src={claim.image} className={imageStyle} />
    </>
  )
}

const titleStyle = css`
  margin-bottom: 7px;
`

const locationStyle = css`
  color: #0070f3;
  margin: 0;
`
const imageStyle = css`
  max-width: 500px;
  @media (max-width: 500px) {
    width: 100%;
  }
`