import React, { useState } from 'react';
import { css } from '@emotion/css';
import Button from './Button';
import { v4 as uuid } from 'uuid';
import { Storage, API, Auth } from 'aws-amplify';
import { createClaim } from './graphql/mutations';

// new
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
//import { yupResolver } from 'react-hook-form-resolvers';
import * as Yup from 'yup';

//
/* Initial state to hold form input, saving state */
const initialState = {
  title: '',
  date:'',
  firstname:'',
  lastname:'',
  mobil:'',
  email:'',
  assistance:'',
  image: {},
  file: '',
  saving: false
};

export default function CreateClaim({
  updateOverlayVisibility, updateClaims, claims
}) {
  /* 1. Create local state with useState hook */
  const [formState, updateFormState] = useState(initialState)

  //new--------------------------------------------------------------------------------
// functions to build form returned by useForm() hooks
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is Invalid')
      .required('Email is required')
  });

    // functions to build form returned by useForm() hook
  const { register, handleSubmit, reset, errors, watch } = useForm({
    resolver: yupResolver(validationSchema)
  });

    // watch to enable re-render when ticket number is changed
  const watchNumberOfCars = watch('numberOfCars');

    // return array of ticket indexes for rendering dynamic forms in the template
  function carNumbers() {
    return [...Array(parseInt(watchNumberOfCars || 0)).keys()];
  }

  function onSubmit(data) {
        // display form data on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
  }
  //--------------------------------------------------------------------------------

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

  /* 4. Save the post  */
  async function save() {
    try {
      const { title, date, firstname, lastname, mobil, email, assistance, image } = formState;
      if (!title || !date || !firstname || !lastname || !mobil || !email || !assistance ||!image.name) return;
      updateFormState(currentState => ({ ...currentState, saving: true }));
      const claimId = uuid();
      const claimInfo = { title, date, firstname, lastname, mobil, email, assistance, image: formState.image.name, id: claimId };

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
    <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
    <div className={containerStyle}>
      <h1 id="header_1" className="form-header" data-component="header">
          Claim Details
      </h1>
      <input
        placeholder="Claim title"
        name="title"
        className={inputStyle}
        onChange={onChangeText}
      />
      <input
        type="date"
        name="date"
        className={inputStyle}
        onChange={onChangeText}
      />
      <input
        placeholder="First Name"
        name="firstname"
        className={inputStyle}
        onChange={onChangeText}
      />
      <input
        placeholder="Last Name"
        name="lastname"
        className={inputStyle}
        onChange={onChangeText}
      />
      <input
        type="tel"
        placeholder="Mobil number"
        name="mobil"
        className={inputStyle}
        onChange={onChangeText}
      />      
      <input
        type="email"
        placeholder="Email"
        name="email"
        className={inputStyle}
        onChange={onChangeText}
      />
      <div className="form-check">
        <input name="assistance" type="checkbox" className="form-check-input" id="assistance" onChange={onChangeText} />
        <label className="form-check-label" htmlFor="">Do you need car assistance?</label>
      </div>
      <div className="card-body border-bottom">
        <div className="form-row">
          <div className="form-group"></div>
            <label>How many cars are involve?</label>
            <select name="numberOfCars" ref={register}>
              {[1,2].map(i => 
                <option key={i} value={i-1}>{i}</option>
              )}
            </select>
        </div>
      </div>
      {carNumbers().map(i => (
        <div key={i} className="list-group list-group-flush">
          <div className="list-group-item">
            <h5 className="card-title">Other Driver</h5>
              <div className="form-row">
                  <input placeholder="First Name" name="firstname" className={inputStyle} onChange={onChangeText}/>
                  <input placeholder="Last Name" name="lastname" className={inputStyle} onChange={onChangeText}/>
                  <input type="tel" placeholder="Mobil number" name="mobil" className={inputStyle} onChange={onChangeText}/>      
                  <input type="email" placeholder="Email" name="email" className={inputStyle} onChange={onChangeText}/>                             
                </div>
              </div>
            </div>
      ))}
      <label class="form-label form-label-top form-label-auto" id="label_20" for="input_20"> Attach Photos </label>
      <input 
        type="file"
        onChange={onChangeFile}
      />
      { formState.file && <img className={imageStyle} alt="preview" src={formState.file} /> }
      <Button title="Submit Claim" onClick={save} />
      <Button type="cancel" title="Cancel" onClick={() => updateOverlayVisibility(false)} />
      { formState.saving && <p className={savingMessageStyle}>Saving claim...</p> }
    </div>
    </form>
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
  height: 650px;
  position: fixed;
  left: 0;
  border-radius: 4px;
  top: 0;
  margin-left: calc(50vw - 220px);
  margin-top: calc(50vh - 300px);
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.125rem 0.25rem;
  padding: 20px;
`

const savingMessageStyle = css`
  margin-bottom: 0px;
`