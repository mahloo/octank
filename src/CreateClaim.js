import React, { useState } from 'react';
import { css } from '@emotion/css';
import Button from './Button';
import { v4 as uuid } from 'uuid';
import { Storage, API, Auth } from 'aws-amplify';
import { createClaim } from './graphql/mutations';

/* Initial state to hold form input, saving state */
const initialState = {
  name: '',
  description: '',
  date:'',
  image: {},
  file: '',
  oneCar: '',
  driver2: '',
  saving: false
};

export default function CreateClaim({
  updateOverlayVisibility, updateClaims, claims
}) {
  /* 1. Create local state with useState hook */
  const [formState, updateFormState] = useState(initialState)

  /* 2. onChangeText handler updates the form state when a user types into a form field */
  function onChangeText(e) {
    e.persist();
    updateFormState(currentState => ({ ...currentState, [e.target.name]: e.target.value }));
  }

  /* 3. onChangeFile handler will be fired when a user uploads a file  */
  function onChangeFile(e) {
    e.persist();
    if (! e.target.files[0]) return;
    const image = { fileInfo: e.target.files[0], name: `${e.target.files[0].name}_${uuid()}`}
    updateFormState(currentState => ({ ...currentState, file: URL.createObjectURL(e.target.files[0]), image }))
  }

  /* 4. Save the claim  */
  async function save() {
    try {
      const { name, description, date, oneCar, driver2, image } = formState;
      if (!name || !description || !date || !oneCar || !driver2 || !image.name) return;
      updateFormState(currentState => ({ ...currentState, saving: true }));
      const claimId = uuid();
      const claimInfo = { name, description, date, oneCar, driver2, image: formState.image.name, id: claimId };

      await Storage.put(formState.image.name, formState.image.fileInfo);
      await API.graphql({
        query: createClaim,
        variables: { input: claimInfo },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });
      updateClaims([...claims, { ...claimInfo, image: formState.file }]);
      updateFormState(currentState => ({ ...currentState, saving: false }));
      updateOverlayVisibility(false);
    } catch (err) {
      console.log('error: ', err);
    }
  }

  return (
    <div className={containerStyle}>
      <input
        placeholder="Claim name"
        name="name"
        className={inputStyle}
        onChange={onChangeText}
      />
      <input
        placeholder="Date"
        name="date"
        className={inputStyle}
        onChange={onChangeText}
      />
      <input
        placeholder="Description"
        name="description"
        className={inputStyle}
        onChange={onChangeText}
      />
      <input
        placeholder="Driver 2"
        name="driver2"
        className={inputStyle}
        onChange={onChangeText}
      />
      <input
        placeholder="Is this one car accident"
        name="oneCar"
        className={inputStyle}
        onChange={onChangeText}
      />
      <input 
        type="file"
        onChange={onChangeFile}
      />
      { formState.file && <img className={imageStyle} alt="preview" src={formState.file} /> }
      <Button title="Create New Claim" onClick={save} />
      <Button type="cancel" title="Cancel" onClick={() => updateOverlayVisibility(false)} />
      { formState.saving && <p className={savingMessageStyle}>Saving claim...</p> }
    </div>
  )
}

const inputStyle = css`
  margin-bottom: 10px;
  outline: none;
  padding: 7px;
  border: 1px solid #ddd;
  font-size: 16px;
  border-radius: 4px;
`

const imageStyle = css`
  height: 120px;
  margin: 10px 0px;
  object-fit: contain;
`

const containerStyle = css`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 420px;
  position: fixed;
  left: 0;
  border-radius: 4px;
  top: 0;
  margin-left: calc(50vw - 220px);
  margin-top: calc(50vh - 230px);
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.125rem 0.25rem;
  padding: 20px;
`

const savingMessageStyle = css`
  margin-bottom: 0px;
`